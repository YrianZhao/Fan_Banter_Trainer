import type {
  AnswerLog,
  AnswerResult,
  AttackLine,
  BanterDataset,
  CombatState,
  ControversyTopic,
  Entity,
  ResponseOption,
  RoundScenario,
  TopicCategory,
  ValidationResult,
} from "../types";

export const MAX_ROUNDS = 8;
export const INITIAL_HP = 100;
export const TOPIC_CATEGORIES: TopicCategory[] = [
  "playoff_failure",
  "finals_loss",
  "superteam",
  "trade_drama",
  "injury_what_if",
  "referee_controversy",
  "stat_padding",
  "choking_claim",
  "legacy_debate",
  "teammate_help",
  "management_failure",
  "fan_meme",
];

export function createInitialCombatState(): CombatState {
  return {
    playerHp: INITIAL_HP,
    enemyHp: INITIAL_HP,
    combo: 0,
    roundIndex: 0,
    isFinished: false,
  };
}

export function getEntity(dataset: BanterDataset, id: string): Entity | undefined {
  return dataset.entities.find((entity) => entity.id === id);
}

export function getTopic(dataset: BanterDataset, id: string): ControversyTopic | undefined {
  return dataset.topics.find((topic) => topic.id === id);
}

export function getEntitiesByType(dataset: BanterDataset, type: Entity["type"]): Entity[] {
  return dataset.entities.filter((entity) => entity.type === type);
}

export function buildRoundScenarios(
  dataset: BanterDataset,
  userSide: string,
  enemySide: string,
  maxRounds = MAX_ROUNDS,
): RoundScenario[] {
  const userEntity = getEntity(dataset, userSide);
  const directLines = dataset.attackLines.filter((line) => line.defenderTargetId === userSide);
  const fallbackLines = dataset.attackLines.filter((line) => {
    if (line.defenderTargetId === userSide || !userEntity) {
      return false;
    }

    const defender = getEntity(dataset, line.defenderTargetId);
    return Boolean(
      defender &&
        (defender.type === userEntity.type ||
          defender.tags.some((tag) => userEntity.tags.includes(tag))),
    );
  });

  return [...shuffle(directLines), ...shuffle(fallbackLines)]
    .slice(0, maxRounds)
    .map((line, index) => createScenario(dataset, line, userSide, enemySide, index))
    .filter((scenario): scenario is RoundScenario => Boolean(scenario));
}

export function applyResponse(
  state: CombatState,
  scenario: RoundScenario,
  selectedOptionId: string,
): AnswerResult {
  const option = scenario.responseOptions.find((candidate) => candidate.id === selectedOptionId);

  if (!option) {
    throw new Error(`Unknown response option: ${selectedOptionId}`);
  }

  const isCorrect = option.id === scenario.correctOptionId;
  const combo = isCorrect ? state.combo + 1 : 0;
  const comboBonus = isCorrect ? Math.min(8, Math.max(0, state.combo) * 2) : 0;
  const unsupportedPenalty = !isCorrect && option.responseType === "unsupported_claim" ? 5 : 0;
  const enemyDamage = isCorrect ? option.damage + comboBonus : 0;
  const playerDamage = isCorrect ? 0 : option.selfDamageIfWrong + unsupportedPenalty;
  const enemyHp = clampHp(state.enemyHp - enemyDamage);
  const playerHp = clampHp(state.playerHp - playerDamage);
  const roundIndex = state.roundIndex + 1;

  return {
    option,
    isCorrect,
    playerDamage,
    enemyDamage,
    nextState: {
      playerHp,
      enemyHp,
      combo,
      roundIndex,
      isFinished: playerHp <= 0 || enemyHp <= 0 || roundIndex >= MAX_ROUNDS,
    },
  };
}

export function makeAnswerLog(
  scenario: RoundScenario,
  result: AnswerResult,
): AnswerLog {
  const correctOption = scenario.responseOptions.find(
    (option) => option.id === scenario.correctOptionId,
  );

  return {
    roundId: scenario.id,
    topicTitle: scenario.topic.title,
    attackText: scenario.attackLine.text,
    selectedText: result.option.text,
    correctText: correctOption?.text ?? "",
    explanation: result.option.explanation,
    isCorrect: result.isCorrect,
    responseType: result.option.responseType,
    damageTaken: result.playerDamage,
    damageDealt: result.enemyDamage,
  };
}

export function scoreGame(logs: AnswerLog[]): {
  factAccuracy: number;
  contextMatch: number;
  counterPunch: number;
  emotionalControl: number;
  total: number;
  level: string;
  advice: string[];
} {
  if (logs.length === 0) {
    return {
      factAccuracy: 0,
      contextMatch: 0,
      counterPunch: 0,
      emotionalControl: 0,
      total: 0,
      level: "还没开喷",
      advice: ["先完成一局，系统才能判断你的辩论节奏。"],
    };
  }

  const correctCount = logs.filter((log) => log.isCorrect).length;
  const wrongContextCount = logs.filter((log) => log.responseType === "wrong_context").length;
  const unsupportedCount = logs.filter((log) => log.responseType === "unsupported_claim").length;
  const weakCount = logs.filter((log) => log.responseType === "weak_deflection").length;
  const correctRatio = correctCount / logs.length;
  const factAccuracy = Math.round(correctRatio * 100 - unsupportedCount * 8);
  const contextMatch = Math.round(correctRatio * 92 - wrongContextCount * 10 + 8);
  const counterPunch = Math.round(
    (logs.reduce((sum, log) => sum + log.damageDealt, 0) / Math.max(1, logs.length * 25)) * 100,
  );
  const emotionalControl = Math.round(100 - unsupportedCount * 14 - weakCount * 10);
  const normalized = [factAccuracy, contextMatch, counterPunch, emotionalControl].map((score) =>
    clampScore(score),
  );
  const total = Math.round(
    normalized.reduce((sum, score) => sum + score, 0) / normalized.length,
  );

  return {
    factAccuracy: normalized[0],
    contextMatch: normalized[1],
    counterPunch: normalized[2],
    emotionalControl: normalized[3],
    total,
    level: getLevel(total),
    advice: buildAdvice(logs, normalized),
  };
}

export function validateDataset(dataset: BanterDataset): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const entityIds = new Set(dataset.entities.map((entity) => entity.id));
  const topicIds = new Set(dataset.topics.map((topic) => topic.id));
  const attackLineIds = new Set(dataset.attackLines.map((line) => line.id));

  pushDuplicateErrors(errors, "entity", dataset.entities.map((entity) => entity.id));
  pushDuplicateErrors(errors, "topic", dataset.topics.map((topic) => topic.id));
  pushDuplicateErrors(errors, "attackLine", dataset.attackLines.map((line) => line.id));
  pushDuplicateErrors(errors, "responseOption", dataset.responseOptions.map((option) => option.id));

  if (!dataset.version.trim()) {
    errors.push("缺少 version。");
  }

  dataset.entities.forEach((entity) => {
    if (!entity.id.trim() || !entity.nameZh.trim() || !entity.shortLabel.trim()) {
      errors.push(`实体 ${entity.id || "(无 id)"} 缺少 id、nameZh 或 shortLabel。`);
    }
    if (entity.type !== "team" && entity.type !== "player") {
      errors.push(`实体 ${entity.id} type 必须是 team 或 player。`);
    }
  });

  dataset.topics.forEach((topic) => {
    if (!topic.targetId || !entityIds.has(topic.targetId)) {
      errors.push(`topic ${topic.id} 缺少有效 target。`);
    }
    if (!TOPIC_CATEGORIES.includes(topic.category)) {
      errors.push(`topic ${topic.id} 缺少有效 category。`);
    }
    if ((topic.factuality === "verified" || topic.factuality === "widely_debated") && topic.sourceUrls.length === 0) {
      errors.push(`topic ${topic.id} 是 ${topic.factuality}，必须提供 sourceUrls。`);
    }
    if (topic.sourceUrls.length === 0) {
      warnings.push(`topic ${topic.id} 暂无 sourceUrls，后续应补充来源。`);
    }
  });

  dataset.attackLines.forEach((line) => {
    if (!topicIds.has(line.controversyTopicId)) {
      errors.push(`attackLine ${line.id} 引用了不存在的 topic。`);
    }
    if (!entityIds.has(line.defenderTargetId)) {
      errors.push(`attackLine ${line.id} 缺少有效 defenderTargetId。`);
    }

    const options = dataset.responseOptions.filter((option) => option.attackLineId === line.id);
    const correctCount = options.filter((option) => option.isCorrect).length;

    if (options.length < 4) {
      errors.push(`attackLine ${line.id} 至少需要 4 个 response options。`);
    }
    if (correctCount !== 1) {
      errors.push(`attackLine ${line.id} 必须且只能有 1 个正确选项。`);
    }
  });

  dataset.responseOptions.forEach((option) => {
    if (!attackLineIds.has(option.attackLineId)) {
      errors.push(`responseOption ${option.id} 引用了不存在的 attackLine。`);
    }
    if (!option.text.trim() || !option.explanation.trim()) {
      errors.push(`responseOption ${option.id} 缺少文本或解释。`);
    }
  });

  return { errors, warnings };
}

export function normalizeDataset(dataset: BanterDataset): BanterDataset {
  return {
    ...dataset,
    updatedAt: new Date().toISOString().slice(0, 10),
    entities: dataset.entities.map((entity) => ({
      ...entity,
      aliases: entity.aliases.filter(Boolean),
      tags: entity.tags.filter(Boolean),
    })),
    topics: dataset.topics.map((topic) => ({
      ...topic,
      sourceUrls: topic.sourceUrls.filter(Boolean),
      relatedTargets: topic.relatedTargets.filter(Boolean),
    })),
  };
}

function createScenario(
  dataset: BanterDataset,
  sourceLine: AttackLine,
  userSide: string,
  enemySide: string,
  index: number,
): RoundScenario | null {
  const topic = getTopic(dataset, sourceLine.controversyTopicId);
  const target = getEntity(dataset, sourceLine.defenderTargetId);
  const enemy = getEntity(dataset, enemySide);

  if (!topic || !target || !enemy) {
    return null;
  }

  const attackLine = personalizeAttackLine(sourceLine, target, enemy);
  const responseOptions = shuffle(
    dataset.responseOptions
      .filter((option) => option.attackLineId === sourceLine.id)
      .map((option) => personalizeResponseOption(option, target, enemy)),
  );
  const correct = responseOptions.find((option) => option.isCorrect);

  if (!correct) {
    return null;
  }

  return {
    id: `${sourceLine.id}-round-${index}`,
    userSide,
    enemySide,
    attackLine,
    responseOptions,
    correctOptionId: correct.id,
    difficulty: topic.severity,
    topic,
  };
}

function personalizeAttackLine(line: AttackLine, target: Entity, enemy: Entity): AttackLine {
  return {
    ...line,
    attackerTargetId: enemy.id,
    text: replaceTokens(line.text, target, enemy),
  };
}

function personalizeResponseOption(
  option: ResponseOption,
  target: Entity,
  enemy: Entity,
): ResponseOption {
  return {
    ...option,
    text: replaceTokens(option.text, target, enemy),
    explanation: replaceTokens(option.explanation, target, enemy),
  };
}

function replaceTokens(text: string, target: Entity, enemy: Entity): string {
  return text
    .replaceAll("{target}", target.shortLabel)
    .replaceAll("{targetFull}", target.nameZh)
    .replaceAll("{enemy}", enemy.shortLabel)
    .replaceAll("{enemyFull}", enemy.nameZh);
}

function pushDuplicateErrors(errors: string[], label: string, ids: string[]): void {
  const seen = new Set<string>();
  ids.forEach((id) => {
    if (seen.has(id)) {
      errors.push(`${label} id 重复：${id}`);
    }
    seen.add(id);
  });
}

function clampHp(value: number): number {
  return Math.max(0, Math.min(INITIAL_HP, value));
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function getLevel(score: number): string {
  if (score >= 90) {
    return "季后赛控场大师";
  }
  if (score >= 78) {
    return "论坛主力轮换";
  }
  if (score >= 65) {
    return "能打硬仗的球迷";
  }
  if (score >= 45) {
    return "还在看集锦补课";
  }
  return "容易被带节奏";
}

function buildAdvice(logs: AnswerLog[], scores: number[]): string[] {
  const advice: string[] = [];
  const [factAccuracy, contextMatch, , emotionalControl] = scores;

  if (factAccuracy < 70) {
    advice.push("优先补事实：年份、系列赛、转会背景要说准。");
  }
  if (contextMatch < 70) {
    advice.push("先回应对方刚打的点，再考虑反击，不要跳到无关素材。");
  }
  if (emotionalControl < 75) {
    advice.push("少用没论据的狠话，强语气但没事实会让自己掉血。");
  }
  if (logs.some((log) => log.responseType === "wrong_context")) {
    advice.push("本局有错位回答，复盘时重点看“敌方攻击”和“正确选项”的对应关系。");
  }
  if (advice.length === 0) {
    advice.push("节奏不错，可以尝试更高难度或补充更多真实来源素材。");
  }

  return advice;
}

function shuffle<T>(items: T[]): T[] {
  const output = [...items];

  for (let index = output.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [output[index], output[randomIndex]] = [output[randomIndex], output[index]];
  }

  return output;
}
