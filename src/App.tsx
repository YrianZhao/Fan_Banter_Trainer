import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Download,
  Eye,
  Plus,
  RotateCcw,
  Settings,
  Shield,
  Swords,
  Trash2,
  Upload,
  XCircle,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { celticsMemoryDeck } from "./data/celticsMemoryDeck";
import type { MemoryCard, MemoryCategory } from "./data/celticsMemoryDeck";
import { defaultDataset } from "./data/defaultDataset";
import {
  applyResponse,
  buildRoundScenarios,
  createInitialCombatState,
  getEntity,
  makeAnswerLog,
  normalizeDataset,
  scoreGame,
  validateDataset,
} from "./lib/game";
import {
  EMPTY_MEMORY_PROGRESS,
  getMemoryCategoryLabel,
  getMemoryFactualityLabel,
  getMemoryStats,
  normalizeMemoryProgress,
  rateMemoryCard,
  selectNextMemoryCard,
  validateMemoryDeck,
} from "./lib/memory";
import type { MemoryProgressState, MemoryRating } from "./lib/memory";
import type {
  AnswerLog,
  AnswerResult,
  AttackLine,
  BanterDataset,
  CombatState,
  ControversyTopic,
  Entity,
  GamePhase,
  ResponseOption,
  ResponseType,
  RoundScenario,
  TopicCategory,
  TopicFactuality,
  TurnStep,
} from "./types";

const STORAGE_KEY = "fan-banter-trainer-dataset";
const MEMORY_STORAGE_KEY = "fan-banter-trainer-celtics-memory";

const categoryLabels: Record<TopicCategory, string> = {
  playoff_failure: "季后赛失败",
  finals_loss: "总决赛失利",
  superteam: "超级球队",
  trade_drama: "交易争议",
  injury_what_if: "伤病如果论",
  referee_controversy: "裁判争议",
  stat_padding: "数据争议",
  choking_claim: "关键战质疑",
  legacy_debate: "历史地位",
  teammate_help: "队友帮助",
  management_failure: "管理层问题",
  fan_meme: "球迷梗",
};

const responseTypeLabels: Record<ResponseType, string> = {
  rebuttal: "反驳",
  counterattack: "反击",
  rebuttal_then_counterattack: "先反驳再反击",
  good_evidence_wrong_counter: "证据对但反击错",
  weak_deflection: "空泛转移",
  wrong_context: "上下文错位",
  unsupported_claim: "无证据狠话",
};

const categories = Object.keys(categoryLabels) as TopicCategory[];
const factualities: TopicFactuality[] = ["verified", "widely_debated", "opinion", "meme"];
const responseTypes = Object.keys(responseTypeLabels) as ResponseType[];

function App() {
  const [dataset, setDataset] = useState<BanterDataset>(() => loadDataset());
  const [view, setView] = useState<"game" | "memory" | "admin">("game");
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [userSide, setUserSide] = useState(dataset.entities[0]?.id ?? "");
  const [enemySide, setEnemySide] = useState(dataset.entities[1]?.id ?? "");
  const [rounds, setRounds] = useState<RoundScenario[]>([]);
  const [combat, setCombat] = useState<CombatState>(() => createInitialCombatState());
  const [turnStep, setTurnStep] = useState<TurnStep>("defense");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);
  const [answerLogs, setAnswerLogs] = useState<AnswerLog[]>([]);
  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dataset));
  }, [dataset]);

  useEffect(() => {
    if (!dataset.entities.some((entity) => entity.id === userSide)) {
      setUserSide(dataset.entities[0]?.id ?? "");
    }
    if (!dataset.entities.some((entity) => entity.id === enemySide)) {
      setEnemySide(dataset.entities[1]?.id ?? dataset.entities[0]?.id ?? "");
    }
  }, [dataset.entities, enemySide, userSide]);

  const validation = useMemo(() => validateDataset(dataset), [dataset]);
  const userEntity = getEntity(dataset, userSide);
  const enemyEntity = getEntity(dataset, enemySide);
  const currentScenario = rounds[combat.roundIndex];
  const displayedCombat = lastResult?.nextState ?? combat;
  const canStart = userSide && enemySide && userSide !== enemySide && validation.errors.length === 0;

  useEffect(() => {
    if (!lastResult) {
      return;
    }

    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }

    advanceTimerRef.current = window.setTimeout(() => {
      advanceBattle(lastResult);
    }, lastResult.nextState.isFinished ? 1600 : lastResult.step === "defense" ? 1800 : 2200);

    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
    };
  }, [lastResult]);

  function startGame() {
    const nextRounds = buildRoundScenarios(dataset, userSide, enemySide);

    setRounds(nextRounds);
    setCombat(createInitialCombatState());
    setTurnStep("defense");
    setSelectedOptionId(null);
    setLastResult(null);
    setAnswerLogs([]);
    setPhase(nextRounds.length > 0 ? "battle" : "setup");
  }

  function chooseOption(optionId: string) {
    if (!currentScenario || selectedOptionId) {
      return;
    }

    const result = applyResponse(combat, currentScenario, turnStep, optionId);
    setSelectedOptionId(optionId);
    setLastResult(result);
    setAnswerLogs((logs) => [...logs, makeAnswerLog(currentScenario, result)]);
  }

  function advanceBattle(result: AnswerResult) {
    const nextState = result.nextState;
    setCombat(nextState);
    setSelectedOptionId(null);
    setLastResult(null);

    if (nextState.isFinished || !rounds[nextState.roundIndex]) {
      setPhase("result");
      return;
    }

    if (result.step === "defense") {
      setTurnStep("offense");
      return;
    }

    setTurnStep("defense");
  }

  function resetGame() {
    setPhase("setup");
    setRounds([]);
    setCombat(createInitialCombatState());
    setTurnStep("defense");
    setSelectedOptionId(null);
    setLastResult(null);
    setAnswerLogs([]);
  }

  return (
    <div className="appShell">
      <header className="topBar">
        <div>
          <p className="eyebrow">NBA 论坛辩论训练器</p>
          <h1>Fan Banter Trainer</h1>
        </div>
        <nav className="viewSwitch" aria-label="页面切换">
          <button className={view === "game" ? "active" : ""} onClick={() => setView("game")}>
            <Swords size={18} />
            游戏
          </button>
          <button className={view === "memory" ? "active" : ""} onClick={() => setView("memory")}>
            <Brain size={18} />
            记忆训练
          </button>
          <button className={view === "admin" ? "active" : ""} onClick={() => setView("admin")}>
            <Settings size={18} />
            Admin
          </button>
        </nav>
      </header>

      {view === "game" ? (
        <main>
          {phase === "setup" && (
            <SetupScreen
              dataset={dataset}
              userSide={userSide}
              enemySide={enemySide}
              setUserSide={setUserSide}
              setEnemySide={setEnemySide}
              canStart={Boolean(canStart)}
              onStart={startGame}
              validationErrors={validation.errors}
            />
          )}

          {phase === "battle" && currentScenario && userEntity && enemyEntity && (
            <BattleScreen
              userEntity={userEntity}
              enemyEntity={enemyEntity}
              scenario={currentScenario}
              turnStep={turnStep}
              combat={displayedCombat}
              roundNumber={combat.roundIndex + 1}
              selectedOptionId={selectedOptionId}
              result={lastResult}
              onChoose={chooseOption}
            />
          )}

          {phase === "result" && userEntity && enemyEntity && (
            <ResultScreen
              userEntity={userEntity}
              enemyEntity={enemyEntity}
              combat={combat}
              logs={answerLogs}
              onReset={resetGame}
            />
          )}
        </main>
      ) : view === "memory" ? (
        <MemoryTrainingScreen />
      ) : (
        <AdminScreen dataset={dataset} setDataset={setDataset} validation={validation} />
      )}
    </div>
  );
}

interface SetupScreenProps {
  dataset: BanterDataset;
  userSide: string;
  enemySide: string;
  setUserSide: (value: string) => void;
  setEnemySide: (value: string) => void;
  canStart: boolean;
  onStart: () => void;
  validationErrors: string[];
}

function SetupScreen({
  dataset,
  userSide,
  enemySide,
  setUserSide,
  setEnemySide,
  canStart,
  onStart,
  validationErrors,
}: SetupScreenProps) {
  return (
    <section className="setupGrid">
      <div className="setupPanel courtPanel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">第一步</p>
            <h2>选择你的阵营</h2>
          </div>
          <Shield size={22} />
        </div>
        <EntityPicker
          entities={dataset.entities}
          selectedId={userSide}
          onSelect={setUserSide}
          blockedId={enemySide}
        />
      </div>

      <div className="setupPanel courtPanel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">第二步</p>
            <h2>选择敌方球迷</h2>
          </div>
          <Swords size={22} />
        </div>
        <EntityPicker
          entities={dataset.entities}
          selectedId={enemySide}
          onSelect={setEnemySide}
          blockedId={userSide}
        />
      </div>

      <div className="startPanel">
        <div>
          <p className="eyebrow">训练题库</p>
          <h2>{dataset.topics.length} 个争议 topic</h2>
          <p>
            {dataset.attackLines.length} 条攻击线，{dataset.responseOptions.length} 个回复选项。
            每回合先防守反驳，再主动选择攻击话术。
          </p>
        </div>
        {validationErrors.length > 0 && (
          <div className="notice errorNotice">
            <AlertTriangle size={18} />
            Admin 数据有错误，修复后才能开始游戏。
          </div>
        )}
        {userSide === enemySide && (
          <div className="notice">
            <AlertTriangle size={18} />
            我方和敌方不能选择同一阵营。
          </div>
        )}
        <button className="primaryAction" disabled={!canStart} onClick={onStart}>
          <Swords size={20} />
          开始对喷训练
        </button>
        <div className="roomPanel">
          <div>
            <strong>房间对战</strong>
            <span>GitHub Pages 静态版暂未接入实时同步。</span>
          </div>
          <label>
            房间号
            <input disabled placeholder="接入实时后端后可输入" />
          </label>
          <button className="secondaryAction" disabled title="需要 Supabase/Firebase 等实时后端">
            <Users size={16} />
            加入 1v1
          </button>
        </div>
      </div>
    </section>
  );
}

interface EntityPickerProps {
  entities: Entity[];
  selectedId: string;
  blockedId: string;
  onSelect: (id: string) => void;
}

function EntityPicker({ entities, selectedId, blockedId, onSelect }: EntityPickerProps) {
  return (
    <div className="entityGroups">
      {(["player", "team"] as const).map((type) => (
        <div key={type}>
          <h3>{type === "player" ? "球星" : "球队"}</h3>
          <div className="entityGrid">
            {entities
              .filter((entity) => entity.type === type)
              .map((entity) => {
                const isSelected = selectedId === entity.id;
                const isBlocked = blockedId === entity.id;

                return (
                  <button
                    key={entity.id}
                    className={`entityButton ${isSelected ? "selected" : ""}`}
                    style={{ "--entity-color": entity.color } as CSSProperties}
                    disabled={isBlocked}
                    onClick={() => onSelect(entity.id)}
                  >
                    <span>{entity.shortLabel}</span>
                    <small>{entity.nameEn}</small>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

interface BattleScreenProps {
  userEntity: Entity;
  enemyEntity: Entity;
  scenario: RoundScenario;
  turnStep: TurnStep;
  combat: CombatState;
  roundNumber: number;
  selectedOptionId: string | null;
  result: AnswerResult | null;
  onChoose: (optionId: string) => void;
}

function BattleScreen({
  userEntity,
  enemyEntity,
  scenario,
  turnStep,
  combat,
  roundNumber,
  selectedOptionId,
  result,
  onChoose,
}: BattleScreenProps) {
  const prompt = turnStep === "defense" ? scenario.defense : scenario.offense;
  const correctOption = prompt.responseOptions.find((option) => option.id === prompt.correctOptionId);
  const activeEntity = turnStep === "defense" ? enemyEntity : userEntity;
  const phaseTitle = turnStep === "defense" ? "先反驳对方攻击" : "轮到你主动攻击";
  const phaseHelp =
    turnStep === "defense"
      ? "选一句最贴合对方攻击的反驳，挡住节奏。"
      : "选一句真正打到对方阵营痛点的攻击；错位攻击会扣自己血。";

  return (
    <section className="battleLayout">
      <div className="scoreboard">
        <HpCard
          label="我方"
          entity={userEntity}
          hp={combat.playerHp}
          damage={result?.playerDamage ?? 0}
        />
        <div className="roundBadge">
          <span>Round</span>
          <strong>{roundNumber}/8</strong>
          <small>{turnStep === "defense" ? "防守" : "进攻"} · Combo x{combat.combo}</small>
        </div>
        <HpCard
          label="敌方"
          entity={enemyEntity}
          hp={combat.enemyHp}
          damage={result?.enemyDamage ?? 0}
        />
      </div>

      <div className="battlePanel courtPanel">
        <div className="topicRow">
          <span>{turnStep === "defense" ? "阶段 1/2" : "阶段 2/2"}</span>
          <span>{categoryLabels[prompt.topic.category]}</span>
          <span>难度 {prompt.topic.severity}</span>
          <span>{prompt.topic.factuality}</span>
        </div>
        <div className="attackBubble">
          <div className="avatar" style={{ backgroundColor: activeEntity.color }}>
            {activeEntity.shortLabel.slice(0, 2)}
          </div>
          <div>
            <p className="eyebrow">{phaseTitle}</p>
            <h2>{prompt.topic.title}</h2>
            <p>{prompt.attackLine.text}</p>
            <small>{phaseHelp}</small>
          </div>
        </div>

        <div className="optionsGrid">
          {prompt.responseOptions.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const showCorrect = selectedOptionId && option.id === prompt.correctOptionId;
            const showWrong = isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                className={`optionButton ${showCorrect ? "correct" : ""} ${
                  showWrong ? "wrong" : ""
                }`}
                disabled={Boolean(selectedOptionId)}
                onClick={() => onChoose(option.id)}
              >
                <span>{option.text}</span>
                {selectedOptionId && (
                  <small>
                    {responseTypeLabels[option.responseType]} ·{" "}
                    {option.isCorrect
                      ? turnStep === "defense"
                        ? `压制 ${result?.enemyDamage ?? 0}`
                        : `伤害 ${result?.enemyDamage ?? option.damage}`
                      : "无效"}
                  </small>
                )}
              </button>
            );
          })}
        </div>

        {result && correctOption && (
          <div className={`feedbackBox ${result.isCorrect ? "success" : "failure"}`}>
            <div className="feedbackTitle">
              {result.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <strong>
                {result.isCorrect
                  ? turnStep === "defense"
                    ? "反驳成立"
                    : "攻击命中"
                  : turnStep === "defense"
                    ? "反驳失位"
                    : "攻击错位"}
              </strong>
            </div>
            <p>{result.option.explanation}</p>
            {turnStep === "offense" && result.isCorrect && (
              <p>
                <strong>机器人回应：</strong>
                回应成立，但这波已经被你打到痛点，只能进入下一轮。
              </p>
            )}
            {!result.isCorrect && (
              <p>
                最佳思路：<strong>{correctOption.text}</strong>
              </p>
            )}
            <div className="damageRow">
              <span>敌方扣血：{result.enemyDamage}</span>
              <span>我方扣血：{result.playerDamage}</span>
            </div>
            <div className="autoAdvanceNote" aria-live="polite">
              {result.nextState.isFinished
                ? "进入结算中..."
                : turnStep === "defense"
                  ? "轮到你攻击..."
                  : "自动推进中..."}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HpCard({
  label,
  entity,
  hp,
  damage,
}: {
  label: string;
  entity: Entity;
  hp: number;
  damage: number;
}) {
  return (
    <div className={`hpCard ${damage > 0 ? "takingDamage" : ""}`}>
      <div>
        <span>{label}</span>
        <strong>{entity.shortLabel}</strong>
      </div>
      <div className="hpBar" aria-label={`${entity.shortLabel} HP ${hp}`}>
        <span style={{ width: `${hp}%`, backgroundColor: entity.color }} />
      </div>
      <b>{hp} HP</b>
      {damage > 0 && <em className="damageFloat">-{damage}</em>}
    </div>
  );
}

function ResultScreen({
  userEntity,
  enemyEntity,
  combat,
  logs,
  onReset,
}: {
  userEntity: Entity;
  enemyEntity: Entity;
  combat: CombatState;
  logs: AnswerLog[];
  onReset: () => void;
}) {
  const score = scoreGame(logs);
  const won = combat.enemyHp <= 0 || combat.playerHp > combat.enemyHp;
  const wrongLogs = logs.filter((log) => !log.isCorrect);

  return (
    <section className="resultLayout courtPanel">
      <div className="resultHero">
        <p className="eyebrow">{userEntity.shortLabel} vs {enemyEntity.shortLabel}</p>
        <h2>{won ? "训练局拿下" : "这局被带节奏了"}</h2>
        <strong>{score.level}</strong>
      </div>

      <div className="scoreGrid">
        <ScoreMeter label="事实准确度" value={score.factAccuracy} />
        <ScoreMeter label="上下文匹配度" value={score.contextMatch} />
        <ScoreMeter label="反击力度" value={score.counterPunch} />
        <ScoreMeter label="情绪控制" value={score.emotionalControl} />
      </div>

      <div className="summaryGrid">
        <div>
          <h3>训练建议</h3>
          <ul className="cleanList">
            {score.advice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>答错复盘</h3>
          {wrongLogs.length === 0 ? (
            <p className="muted">本局没有答错，继续加难度。</p>
          ) : (
            <ul className="cleanList">
              {wrongLogs.map((log) => (
                <li key={log.roundId}>
                  <strong>{log.topicTitle}</strong>
                  <span>{log.explanation}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="primaryAction compact" onClick={onReset}>
        <RotateCcw size={18} />
        再来一局
      </button>
    </section>
  );
}

function ScoreMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="scoreMeter">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="hpBar">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MemoryTrainingScreen() {
  const [progress, setProgress] = useState<MemoryProgressState>(() => loadMemoryProgress());
  const [categoryFilter, setCategoryFilter] = useState<MemoryCategory | "all">("all");
  const [currentCard, setCurrentCard] = useState<MemoryCard | undefined>(() =>
    selectNextMemoryCard(celticsMemoryDeck, loadMemoryProgress()),
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<MemoryRating[]>([]);
  const validation = useMemo(() => validateMemoryDeck(celticsMemoryDeck), []);
  const stats = useMemo(() => getMemoryStats(celticsMemoryDeck, progress), [progress]);
  const categories = useMemo(
    () =>
      Array.from(new Set(celticsMemoryDeck.map((card) => card.category))).sort((a, b) =>
        getMemoryCategoryLabel(a).localeCompare(getMemoryCategoryLabel(b), "zh-Hans-CN"),
      ),
    [],
  );
  const filteredCount =
    categoryFilter === "all"
      ? celticsMemoryDeck.length
      : celticsMemoryDeck.filter((card) => card.category === categoryFilter).length;
  const cardProgress = currentCard ? progress.cards[currentCard.id] : undefined;
  const accuracy =
    stats.studied === 0
      ? 0
      : Math.round(
          (Object.values(progress.cards).reduce((sum, item) => sum + item.correctCount, 0) /
            Math.max(1, Object.values(progress.cards).reduce((sum, item) => sum + item.seenCount, 0))) *
            100,
        );

  useEffect(() => {
    window.localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    setCurrentCard(selectNextMemoryCard(celticsMemoryDeck, progress, new Date(), categoryFilter));
    setIsRevealed(false);
  }, [categoryFilter, progress]);

  function revealCard() {
    setIsRevealed(true);
  }

  function rateCard(rating: MemoryRating) {
    if (!currentCard) {
      return;
    }

    const nextProgress = rateMemoryCard(progress, currentCard.id, rating);
    setProgress(nextProgress);
    setSessionRatings((ratings) => [...ratings, rating]);
  }

  function resetMemoryProgress() {
    setProgress(EMPTY_MEMORY_PROGRESS);
    setSessionRatings([]);
    window.localStorage.removeItem(MEMORY_STORAGE_KEY);
  }

  return (
    <main className="memoryLayout">
      <section className="memoryIntro courtPanel">
        <div>
          <p className="eyebrow">凯尔特人专项黑料记忆</p>
          <h2>像背单词一样背对喷材料</h2>
          <p>
            先看问题，想出事实点和回怼角度，再揭晓答案。论坛梗和传闻型话术会被明确标记，
            训练重点是会用、会拆、不会把无来源严重指控说成事实。
          </p>
        </div>
        <div className="memoryStats">
          <StatPill label="卡片" value={stats.total} />
          <StatPill label="已练" value={stats.studied} />
          <StatPill label="待复习" value={stats.due} />
          <StatPill label="掌握" value={stats.mastered} />
        </div>
      </section>

      <section className="memoryGrid">
        <aside className="memorySidebar courtPanel">
          <div className="panelHeader">
            <h2>训练范围</h2>
            <Brain size={20} />
          </div>
          <div className="filterList">
            <button
              className={categoryFilter === "all" ? "filterChip active" : "filterChip"}
              onClick={() => setCategoryFilter("all")}
            >
              全部
              <span>{celticsMemoryDeck.length}</span>
            </button>
            {categories.map((category) => {
              const count = celticsMemoryDeck.filter((card) => card.category === category).length;
              return (
                <button
                  key={category}
                  className={categoryFilter === category ? "filterChip active" : "filterChip"}
                  onClick={() => setCategoryFilter(category)}
                >
                  {getMemoryCategoryLabel(category)}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="memoryMiniStats">
            <p>
              当前范围 <strong>{filteredCount}</strong> 张卡。
            </p>
            <p>
              本轮已评 <strong>{sessionRatings.length}</strong> 张，准确度约{" "}
              <strong>{accuracy}%</strong>。
            </p>
            <p>
              遗忘次数 <strong>{stats.lapses}</strong> 次。点“忘了”会 5 分钟后再出现。
            </p>
          </div>
          <button className="secondaryAction fullWidth" onClick={resetMemoryProgress}>
            <RotateCcw size={16} />
            清空记忆进度
          </button>
        </aside>

        <section className="memoryCard courtPanel">
          {currentCard ? (
            <>
              <div className="topicRow">
                <span>{getMemoryCategoryLabel(currentCard.category)}</span>
                <span>{currentCard.era}</span>
                <span>难度 {currentCard.difficulty}</span>
                <span>{getMemoryFactualityLabel(currentCard.factuality)}</span>
              </div>

              <div className="memoryQuestion">
                <p className="eyebrow">当前卡片</p>
                <h2>{currentCard.question}</h2>
                <small>
                  {cardProgress
                    ? `已见 ${cardProgress.seenCount} 次，上次评级：${ratingLabel(cardProgress.lastRating)}`
                    : "新卡。先自己想一遍再揭晓。"}
                </small>
              </div>

              {!isRevealed ? (
                <button className="primaryAction revealAction" onClick={revealCard}>
                  <Eye size={18} />
                  显示答案
                </button>
              ) : (
                <>
                  <div className="memoryAnswer">
                    <div>
                      <span>事实答案</span>
                      <p>{currentCard.answer}</p>
                    </div>
                    <div>
                      <span>可直接背的攻击句</span>
                      <p>{currentCard.attackLine}</p>
                    </div>
                    <div>
                      <span>使用边界</span>
                      <p>{currentCard.safetyNote}</p>
                    </div>
                  </div>

                  <div className="ratingGrid" aria-label="记忆评级">
                    <button className="ratingButton again" onClick={() => rateCard("again")}>
                      <strong>忘了</strong>
                      <span>5 分钟后再来，别硬装会</span>
                    </button>
                    <button className="ratingButton hard" onClick={() => rateCard("hard")}>
                      <strong>模糊</strong>
                      <span>明天复习，先把事实点记住</span>
                    </button>
                    <button className="ratingButton good" onClick={() => rateCard("good")}>
                      <strong>记住了</strong>
                      <span>间隔拉长，进入复习队列</span>
                    </button>
                  </div>

                  <div className="sourcePanel">
                    <strong>来源 / 标记</strong>
                    {currentCard.sourceUrls.length > 0 ? (
                      <ul>
                        {currentCard.sourceUrls.map((url) => (
                          <li key={url}>
                            <a href={url} target="_blank" rel="noreferrer">
                              {formatSourceUrl(url)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        该卡是论坛梗/传闻型话术训练，无来源链接。用于识别和拆解话术，不作为事实背诵。
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="emptyMemory">
              <h2>这个分类暂时没有卡片</h2>
              <p>切换到“全部”或其他分类继续训练。</p>
            </div>
          )}
        </section>

        <aside className="memoryValidation courtPanel">
          <h2>数据检查</h2>
          <div className={validation.errors.length > 0 ? "validationBlock bad" : "validationBlock good"}>
            <strong>{validation.errors.length > 0 ? "记忆题库有错误" : "记忆题库可用"}</strong>
            {validation.errors.length > 0 ? (
              <ul>
                {validation.errors.slice(0, 8).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : (
              <p>300+ 卡片、可证实/广泛争议卡片来源校验通过。</p>
            )}
          </div>
          <div className="memoryPolicy">
            <strong>口径</strong>
            <p>
              场外案件只写公开报道或司法进展；论坛传闻只作为“话术类型”训练，不改写成确定事实。
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="statPill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function loadMemoryProgress(): MemoryProgressState {
  const raw = window.localStorage.getItem(MEMORY_STORAGE_KEY);

  if (!raw) {
    return EMPTY_MEMORY_PROGRESS;
  }

  try {
    return normalizeMemoryProgress(JSON.parse(raw));
  } catch {
    return EMPTY_MEMORY_PROGRESS;
  }
}

function ratingLabel(rating: MemoryRating | undefined): string {
  if (rating === "again") {
    return "忘了";
  }
  if (rating === "hard") {
    return "模糊";
  }
  if (rating === "good") {
    return "记住了";
  }
  return "无";
}

function formatSourceUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "") + parsed.pathname.slice(0, 36);
  } catch {
    return url;
  }
}

interface AdminScreenProps {
  dataset: BanterDataset;
  setDataset: Dispatch<SetStateAction<BanterDataset>>;
  validation: ReturnType<typeof validateDataset>;
}

function AdminScreen({ dataset, setDataset, validation }: AdminScreenProps) {
  const [selectedTopicId, setSelectedTopicId] = useState(dataset.topics[0]?.id ?? "");
  const [selectedAttackLineId, setSelectedAttackLineId] = useState("");
  const [importText, setImportText] = useState("");
  const [importMessage, setImportMessage] = useState("");

  const selectedTopic = dataset.topics.find((topic) => topic.id === selectedTopicId);
  const topicAttackLines = dataset.attackLines.filter(
    (line) => line.controversyTopicId === selectedTopicId,
  );
  const selectedAttackLine =
    dataset.attackLines.find((line) => line.id === selectedAttackLineId) ?? topicAttackLines[0];
  const selectedOptions = selectedAttackLine
    ? dataset.responseOptions.filter((option) => option.attackLineId === selectedAttackLine.id)
    : [];

  useEffect(() => {
    if (!dataset.topics.some((topic) => topic.id === selectedTopicId)) {
      setSelectedTopicId(dataset.topics[0]?.id ?? "");
    }
  }, [dataset.topics, selectedTopicId]);

  useEffect(() => {
    if (!topicAttackLines.some((line) => line.id === selectedAttackLineId)) {
      setSelectedAttackLineId(topicAttackLines[0]?.id ?? "");
    }
  }, [selectedAttackLineId, topicAttackLines]);

  function updateTopic(patch: Partial<ControversyTopic>) {
    if (!selectedTopic) {
      return;
    }
    setDataset((current) => ({
      ...current,
      topics: current.topics.map((topic) =>
        topic.id === selectedTopic.id ? { ...topic, ...patch } : topic,
      ),
    }));
  }

  function updateAttackLine(lineId: string, patch: Partial<AttackLine>) {
    setDataset((current) => ({
      ...current,
      attackLines: current.attackLines.map((line) =>
        line.id === lineId ? { ...line, ...patch } : line,
      ),
    }));
  }

  function updateOption(optionId: string, patch: Partial<ResponseOption>) {
    setDataset((current) => ({
      ...current,
      responseOptions: current.responseOptions.map((option) => {
        if (option.id !== optionId) {
          if (patch.isCorrect && option.attackLineId === selectedAttackLine?.id) {
            return { ...option, isCorrect: false };
          }
          return option;
        }
        return { ...option, ...patch };
      }),
    }));
  }

  function addTopic() {
    const target = dataset.entities[0];
    if (!target) {
      return;
    }

    const id = `custom-topic-${Date.now()}`;
    const topic: ControversyTopic = {
      id,
      targetType: target.type,
      targetId: target.id,
      targetName: target.nameZh,
      category: "fan_meme",
      title: "新争议 topic",
      summary: "填写公开争议摘要。",
      severity: 2,
      factuality: "opinion",
      sourceUrls: [],
      safePhrasingNotes: "避免无来源严重指控，优先使用公开比赛事实。",
      relatedTargets: [],
    };

    setDataset((current) => ({
      ...current,
      topics: [...current.topics, topic],
    }));
    setSelectedTopicId(id);
  }

  function deleteTopic(topicId: string) {
    const attackIds = new Set(
      dataset.attackLines
        .filter((line) => line.controversyTopicId === topicId)
        .map((line) => line.id),
    );

    setDataset((current) => ({
      ...current,
      topics: current.topics.filter((topic) => topic.id !== topicId),
      attackLines: current.attackLines.filter((line) => line.controversyTopicId !== topicId),
      responseOptions: current.responseOptions.filter((option) => !attackIds.has(option.attackLineId)),
    }));
  }

  function addAttackLine() {
    if (!selectedTopic) {
      return;
    }

    const id = `${selectedTopic.id}-custom-attack-${Date.now()}`;
    const line: AttackLine = {
      id,
      attackerTargetId: "enemy-generic",
      defenderTargetId: selectedTopic.targetId,
      controversyTopicId: selectedTopic.id,
      text: "填写敌方先手攻击话术。",
      tone: "mild",
      tags: [selectedTopic.category],
    };
    const options = createBlankOptions(id);

    setDataset((current) => ({
      ...current,
      attackLines: [...current.attackLines, line],
      responseOptions: [...current.responseOptions, ...options],
    }));
    setSelectedAttackLineId(id);
  }

  function deleteAttackLine(lineId: string) {
    setDataset((current) => ({
      ...current,
      attackLines: current.attackLines.filter((line) => line.id !== lineId),
      responseOptions: current.responseOptions.filter((option) => option.attackLineId !== lineId),
    }));
  }

  function exportJson() {
    const normalized = normalizeDataset(dataset);
    const blob = new Blob([JSON.stringify(normalized, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fan-banter-dataset.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson() {
    try {
      const parsed = JSON.parse(importText) as BanterDataset;
      assertDatasetShape(parsed);
      setDataset(normalizeDataset(parsed));
      setImportMessage("导入成功，数据已暂存在 localStorage。");
    } catch (error) {
      setImportMessage(error instanceof Error ? error.message : "JSON 导入失败。");
    }
  }

  function resetDataset() {
    setDataset(defaultDataset);
    setImportMessage("已恢复内置 MVP 数据。");
  }

  return (
    <main className="adminLayout">
      <section className="adminIntro courtPanel">
        <div>
          <p className="eyebrow">Admin Data Editor</p>
          <h2>本地题库编辑器</h2>
          <p>
            数据会暂存在浏览器 localStorage。GitHub Pages 静态网站不能直接写回仓库，
            导出的 JSON 需要开发者手动提交，或后续接 Supabase/Firebase。
          </p>
        </div>
        <div className="adminStats">
          <span>{dataset.topics.length} topics</span>
          <span>{dataset.attackLines.length} attacks</span>
          <span>{dataset.responseOptions.length} options</span>
        </div>
      </section>

      <section className="adminGrid">
        <aside className="topicList courtPanel">
          <div className="panelHeader">
            <h2>Topics</h2>
            <button className="iconButton" onClick={addTopic} aria-label="新增 topic">
              <Plus size={18} />
            </button>
          </div>
          <div className="scrollList">
            {dataset.topics.map((topic) => (
              <button
                key={topic.id}
                className={topic.id === selectedTopicId ? "topicItem active" : "topicItem"}
                onClick={() => setSelectedTopicId(topic.id)}
              >
                <strong>{topic.title}</strong>
                <span>{topic.targetName} · {categoryLabels[topic.category]}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="editorPanel courtPanel">
          {selectedTopic ? (
            <>
              <div className="panelHeader">
                <h2>编辑 Topic</h2>
                <button className="dangerButton" onClick={() => deleteTopic(selectedTopic.id)}>
                  <Trash2 size={16} />
                  删除
                </button>
              </div>
              <div className="formGrid">
                <label>
                  标题
                  <input
                    value={selectedTopic.title}
                    onChange={(event) => updateTopic({ title: event.target.value })}
                  />
                </label>
                <label>
                  目标
                  <select
                    value={selectedTopic.targetId}
                    onChange={(event) => {
                      const entity = getEntity(dataset, event.target.value);
                      if (entity) {
                        updateTopic({
                          targetId: entity.id,
                          targetType: entity.type,
                          targetName: entity.nameZh,
                        });
                      }
                    }}
                  >
                    {dataset.entities.map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.shortLabel}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  分类
                  <select
                    value={selectedTopic.category}
                    onChange={(event) =>
                      updateTopic({ category: event.target.value as TopicCategory })
                    }
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {categoryLabels[category]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  事实等级
                  <select
                    value={selectedTopic.factuality}
                    onChange={(event) =>
                      updateTopic({ factuality: event.target.value as TopicFactuality })
                    }
                  >
                    {factualities.map((factuality) => (
                      <option key={factuality} value={factuality}>
                        {factuality}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  严重度
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selectedTopic.severity}
                    onChange={(event) =>
                      updateTopic({ severity: Number(event.target.value) as 1 | 2 | 3 | 4 | 5 })
                    }
                  />
                </label>
              </div>
              <label className="wideField">
                摘要
                <textarea
                  value={selectedTopic.summary}
                  onChange={(event) => updateTopic({ summary: event.target.value })}
                />
              </label>
              <label className="wideField">
                安全措辞备注
                <textarea
                  value={selectedTopic.safePhrasingNotes}
                  onChange={(event) => updateTopic({ safePhrasingNotes: event.target.value })}
                />
              </label>
              <label className="wideField">
                sourceUrls，每行一个
                <textarea
                  value={selectedTopic.sourceUrls.join("\n")}
                  onChange={(event) =>
                    updateTopic({
                      sourceUrls: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>

              <div className="panelHeader subHeader">
                <h2>Attack Lines</h2>
                <button className="secondaryAction" onClick={addAttackLine}>
                  <Plus size={16} />
                  新增攻击线
                </button>
              </div>
              <div className="attackList">
                {topicAttackLines.map((line) => (
                  <button
                    key={line.id}
                    className={selectedAttackLine?.id === line.id ? "attackItem active" : "attackItem"}
                    onClick={() => setSelectedAttackLineId(line.id)}
                  >
                    {line.text}
                  </button>
                ))}
              </div>

              {selectedAttackLine && (
                <div className="nestedEditor">
                  <div className="panelHeader">
                    <h3>攻击线与回复选项</h3>
                    <button
                      className="dangerButton"
                      onClick={() => deleteAttackLine(selectedAttackLine.id)}
                    >
                      <Trash2 size={16} />
                      删除攻击线
                    </button>
                  </div>
                  <label className="wideField">
                    敌方攻击文本
                    <textarea
                      value={selectedAttackLine.text}
                      onChange={(event) =>
                        updateAttackLine(selectedAttackLine.id, { text: event.target.value })
                      }
                    />
                  </label>

                  <div className="optionEditorList">
                    {selectedOptions.map((option) => (
                      <div className="optionEditor" key={option.id}>
                        <label className="checkLine">
                          <input
                            type="radio"
                            name={`correct-${selectedAttackLine.id}`}
                            checked={option.isCorrect}
                            onChange={() => updateOption(option.id, { isCorrect: true })}
                          />
                          正确选项
                        </label>
                        <label>
                          类型
                          <select
                            value={option.responseType}
                            onChange={(event) =>
                              updateOption(option.id, {
                                responseType: event.target.value as ResponseType,
                              })
                            }
                          >
                            {responseTypes.map((type) => (
                              <option key={type} value={type}>
                                {responseTypeLabels[type]}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="wideField">
                          回复文本
                          <textarea
                            value={option.text}
                            onChange={(event) => updateOption(option.id, { text: event.target.value })}
                          />
                        </label>
                        <label className="wideField">
                          解释
                          <textarea
                            value={option.explanation}
                            onChange={(event) =>
                              updateOption(option.id, { explanation: event.target.value })
                            }
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>暂无 topic。</p>
          )}
        </section>

        <aside className="validationPanel courtPanel">
          <h2>校验与导入导出</h2>
          <div className={validation.errors.length > 0 ? "validationBlock bad" : "validationBlock good"}>
            <strong>{validation.errors.length > 0 ? "存在错误" : "错误校验通过"}</strong>
            {validation.errors.length > 0 ? (
              <ul>
                {validation.errors.slice(0, 12).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : (
              <p>每条攻击线都有且只有一个正确选项，topic 结构可用。</p>
            )}
          </div>
          {validation.warnings.length > 0 && (
            <div className="validationBlock warn">
              <strong>提醒</strong>
              <ul>
                {validation.warnings.slice(0, 8).map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="secondaryAction fullWidth" onClick={exportJson}>
            <Download size={16} />
            导出完整 JSON
          </button>
          <button className="secondaryAction fullWidth" onClick={resetDataset}>
            <RotateCcw size={16} />
            恢复内置数据
          </button>
          <label className="wideField">
            粘贴 JSON 导入
            <textarea
              className="jsonInput"
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
            />
          </label>
          <button className="primaryAction compact fullWidth" onClick={importJson}>
            <Upload size={16} />
            从文本导入
          </button>
          {importMessage && <p className="muted">{importMessage}</p>}
        </aside>
      </section>
    </main>
  );
}

function createBlankOptions(attackLineId: string): ResponseOption[] {
  return [
    {
      id: `${attackLineId}-option-correct`,
      attackLineId,
      text: "填写最贴合上下文的最佳反驳。",
      isCorrect: true,
      responseType: "rebuttal_then_counterattack",
      explanation: "说明为什么它贴合攻击内容、事实准确、反击角度有效。",
      damage: 18,
      selfDamageIfWrong: 0,
      requiredKnowledgeTags: [],
    },
    ...[1, 2, 3, 4, 5].map((index) => ({
      id: `${attackLineId}-option-wrong-${index}`,
      attackLineId,
      text: "填写一个错误或较弱的选项。",
      isCorrect: false,
      responseType: "wrong_context" as const,
      explanation: "说明为什么这个选项无效。",
      damage: 0,
      selfDamageIfWrong: 12,
      requiredKnowledgeTags: [],
    })),
  ];
}

function loadDataset(): BanterDataset {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return defaultDataset;
  }

  try {
    const parsed = JSON.parse(raw) as BanterDataset;
    assertDatasetShape(parsed);
    if (parsed.version !== defaultDataset.version) {
      return defaultDataset;
    }
    return parsed;
  } catch {
    return defaultDataset;
  }
}

function assertDatasetShape(value: BanterDataset) {
  if (
    !value ||
    !Array.isArray(value.entities) ||
    !Array.isArray(value.topics) ||
    !Array.isArray(value.attackLines) ||
    !Array.isArray(value.responseOptions)
  ) {
    throw new Error("JSON 结构不完整，需要包含 entities、topics、attackLines、responseOptions。");
  }
}

export default App;
