export type MemoryCategory =
  | "playoff_loss"
  | "finals_loss"
  | "rivalry"
  | "management"
  | "injury_what_if"
  | "player_conduct"
  | "dirty_play"
  | "fan_controversy"
  | "legacy_debate"
  | "teammate_help"
  | "fan_meme";

export type MemoryFactuality =
  | "verified"
  | "widely_debated"
  | "opinion"
  | "meme"
  | "forum_claim";

export type MemoryTeamId = "team-celtics" | "team-lakers" | "team-warriors";

export interface MemoryCard {
  id: string;
  teamId: MemoryTeamId;
  category: MemoryCategory;
  era: string;
  title: string;
  question: string;
  answer: string;
  attackLine: string;
  sourceUrls: string[];
  safetyNote: string;
  factuality: MemoryFactuality;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface MemorySeed {
  id: string;
  category: MemoryCategory;
  era: string;
  title: string;
  fact: string;
  attackAngle: string;
  sourceUrls: string[];
  safetyNote?: string;
  factuality?: MemoryFactuality;
  difficulty: 1 | 2 | 3 | 4 | 5;
}
