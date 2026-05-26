export type EntityType = "team" | "player";

export type TopicCategory =
  | "playoff_failure"
  | "finals_loss"
  | "superteam"
  | "trade_drama"
  | "injury_what_if"
  | "referee_controversy"
  | "stat_padding"
  | "choking_claim"
  | "legacy_debate"
  | "teammate_help"
  | "management_failure"
  | "fan_meme";

export type TopicFactuality = "verified" | "widely_debated" | "opinion" | "meme";

export type AttackTone = "mild" | "sharp" | "toxic_but_allowed";

export type ResponseType =
  | "rebuttal"
  | "counterattack"
  | "rebuttal_then_counterattack"
  | "weak_deflection"
  | "wrong_context"
  | "unsupported_claim";

export interface Entity {
  id: string;
  type: EntityType;
  nameZh: string;
  nameEn: string;
  aliases: string[];
  tags: string[];
  shortLabel: string;
  color: string;
}

export interface ControversyTopic {
  id: string;
  targetType: EntityType;
  targetId: string;
  targetName: string;
  category: TopicCategory;
  title: string;
  summary: string;
  severity: 1 | 2 | 3 | 4 | 5;
  factuality: TopicFactuality;
  sourceUrls: string[];
  safePhrasingNotes: string;
  relatedTargets: string[];
}

export interface AttackLine {
  id: string;
  attackerTargetId: string;
  defenderTargetId: string;
  controversyTopicId: string;
  text: string;
  tone: AttackTone;
  tags: string[];
}

export interface ResponseOption {
  id: string;
  attackLineId: string;
  text: string;
  isCorrect: boolean;
  responseType: ResponseType;
  explanation: string;
  damage: number;
  selfDamageIfWrong: number;
  requiredKnowledgeTags: string[];
}

export interface RoundScenario {
  id: string;
  userSide: string;
  enemySide: string;
  attackLine: AttackLine;
  responseOptions: ResponseOption[];
  correctOptionId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  topic: ControversyTopic;
}

export interface BanterDataset {
  version: string;
  updatedAt: string;
  entities: Entity[];
  topics: ControversyTopic[];
  attackLines: AttackLine[];
  responseOptions: ResponseOption[];
}

export type GamePhase = "setup" | "battle" | "result";

export interface CombatState {
  playerHp: number;
  enemyHp: number;
  combo: number;
  roundIndex: number;
  isFinished: boolean;
}

export interface AnswerResult {
  option: ResponseOption;
  isCorrect: boolean;
  playerDamage: number;
  enemyDamage: number;
  nextState: CombatState;
}

export interface AnswerLog {
  roundId: string;
  topicTitle: string;
  attackText: string;
  selectedText: string;
  correctText: string;
  explanation: string;
  isCorrect: boolean;
  responseType: ResponseType;
  damageTaken: number;
  damageDealt: number;
}

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export interface GameScore {
  factAccuracy: number;
  contextMatch: number;
  counterPunch: number;
  emotionalControl: number;
  total: number;
  level: string;
  advice: string[];
}
