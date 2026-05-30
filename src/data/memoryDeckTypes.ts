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

export type MemoryTeamId =
  | "team-hawks"
  | "team-celtics"
  | "team-nets"
  | "team-hornets"
  | "team-bulls"
  | "team-cavaliers"
  | "team-mavericks"
  | "team-nuggets"
  | "team-pistons"
  | "team-warriors"
  | "team-rockets"
  | "team-pacers"
  | "team-clippers"
  | "team-lakers"
  | "team-grizzlies"
  | "team-heat"
  | "team-bucks"
  | "team-timberwolves"
  | "team-pelicans"
  | "team-knicks"
  | "team-thunder"
  | "team-magic"
  | "team-76ers"
  | "team-suns"
  | "team-trail-blazers"
  | "team-kings"
  | "team-spurs"
  | "team-raptors"
  | "team-jazz"
  | "team-wizards";

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
