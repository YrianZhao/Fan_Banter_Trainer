import type {
  MemoryCard,
  MemoryCategory,
  MemoryFactuality,
  MemorySeed,
  MemoryTeamId,
} from "./memoryDeckTypes";

export const promptStyles = [
  {
    question: (teamName: string, seed: MemorySeed) => `${seed.title} 的核心黑料是什么？`,
    answer: (_teamName: string, seed: MemorySeed) => seed.fact,
    attack: (_teamName: string, seed: MemorySeed) => seed.attackAngle,
  },
  {
    question: (teamName: string, seed: MemorySeed) =>
      `如果对方吹${teamName}“底蕴无敌”，可以用 ${seed.title} 怎么反击？`,
    answer: (_teamName: string, seed: MemorySeed) =>
      `${seed.fact} 对喷时要抓住的点是：${seed.attackAngle}`,
    attack: (teamName: string, seed: MemorySeed) =>
      `别一提${teamName}就只数光鲜履历，${seed.attackAngle}`,
  },
  {
    question: (_teamName: string, seed: MemorySeed) =>
      `${seed.title} 属于哪类争议，为什么能当攻击点？`,
    answer: (_teamName: string, seed: MemorySeed) =>
      `类别是 ${categoryLabel(seed.category)}。${seed.fact}`,
    attack: (_teamName: string, seed: MemorySeed) =>
      `${seed.attackAngle} 这不是硬编，是队史账本里能查到或论坛长期争的素材。`,
  },
  {
    question: (teamName: string, seed: MemorySeed) =>
      `看到${teamName}球迷吹“硬仗稳定”，${seed.title} 怎么用？`,
    answer: (_teamName: string, seed: MemorySeed) =>
      `先说事实：${seed.fact} 再把话题拉回硬仗兑现。`,
    attack: (_teamName: string, seed: MemorySeed) =>
      `硬仗稳定别只挑赢的讲，${seed.attackAngle}`,
  },
  {
    question: (_teamName: string, seed: MemorySeed) =>
      `${seed.title} 最容易被对方如何洗白？你怎么拆？`,
    answer: (_teamName: string, seed: MemorySeed) =>
      `对方可能会说这是时代背景或偶然事件；拆法是回到结果：${seed.fact}`,
    attack: (_teamName: string, seed: MemorySeed) => `别一句时代背景就洗完，${seed.attackAngle}`,
  },
  {
    question: (_teamName: string, seed: MemorySeed) => `用一句话记住 ${seed.title}。`,
    answer: (_teamName: string, seed: MemorySeed) => seed.attackAngle,
    attack: (_teamName: string, seed: MemorySeed) => seed.attackAngle,
  },
  {
    question: (teamName: string, seed: MemorySeed) =>
      `${seed.era} ${teamName}的 ${seed.title} 能打哪个球迷痛点？`,
    answer: (_teamName: string, seed: MemorySeed) =>
      `${seed.fact} 痛点是 ${categoryLabel(seed.category)}。`,
    attack: (_teamName: string, seed: MemorySeed) =>
      `别把 ${seed.era} 讲成只有荣光，${seed.attackAngle}`,
  },
];

export function buildMemoryDeck(
  teamId: MemoryTeamId,
  teamName: string,
  seeds: MemorySeed[],
): MemoryCard[] {
  return seeds.flatMap((seedItem) =>
    promptStyles.map((style, index) => ({
      id: `${teamId}-${seedItem.id}-card-${index + 1}`,
      teamId,
      category: seedItem.category,
      era: seedItem.era,
      title: seedItem.title,
      question: style.question(teamName, seedItem),
      answer: style.answer(teamName, seedItem),
      attackLine: style.attack(teamName, seedItem),
      sourceUrls: seedItem.sourceUrls,
      safetyNote:
        seedItem.safetyNote ??
        "使用公开比赛、管理或历史争议素材；避免仇恨、威胁、人肉和无来源严重指控。",
      factuality: seedItem.factuality ?? defaultFactuality(seedItem.category),
      difficulty: seedItem.difficulty,
    })),
  );
}

export function seed(
  id: string,
  category: MemoryCategory,
  era: string,
  title: string,
  fact: string,
  attackAngle: string,
  sourceUrlsInput: string[],
  safetyNoteOrDifficulty?: string | 1 | 2 | 3 | 4 | 5,
  maybeDifficulty?: 1 | 2 | 3 | 4 | 5,
): MemorySeed {
  return {
    id,
    category,
    era,
    title,
    fact,
    attackAngle,
    sourceUrls: sourceUrlsInput,
    safetyNote: typeof safetyNoteOrDifficulty === "string" ? safetyNoteOrDifficulty : undefined,
    difficulty:
      typeof safetyNoteOrDifficulty === "number"
        ? safetyNoteOrDifficulty
        : maybeDifficulty ?? 3,
  };
}

export function claimSeed(
  id: string,
  era: string,
  title: string,
  fact: string,
  attackAngle: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
): MemorySeed {
  return {
    id,
    category: "fan_meme",
    era,
    title,
    fact,
    attackAngle,
    sourceUrls: [],
    safetyNote:
      "这是论坛梗/传闻型话术训练素材，只能作为对喷语境或识别陷阱使用，不能包装成已证实事实。",
    factuality: "forum_claim",
    difficulty,
  };
}

function categoryLabel(category: MemoryCategory): string {
  const labels: Record<MemoryCategory, string> = {
    playoff_loss: "季后赛失利",
    finals_loss: "总决赛失利",
    rivalry: "宿敌互喷",
    management: "管理层争议",
    injury_what_if: "伤病如果论",
    player_conduct: "球员公开争议",
    dirty_play: "强硬/脏动作争议",
    fan_controversy: "球迷文化争议",
    legacy_debate: "历史地位争议",
    teammate_help: "队友关系争议",
    fan_meme: "球迷梗/论坛梗",
  };

  return labels[category];
}

function defaultFactuality(category: MemoryCategory): MemoryFactuality {
  if (category === "fan_meme") {
    return "meme";
  }

  if (
    category === "legacy_debate" ||
    category === "teammate_help" ||
    category === "fan_controversy" ||
    category === "dirty_play"
  ) {
    return "widely_debated";
  }

  return "verified";
}
