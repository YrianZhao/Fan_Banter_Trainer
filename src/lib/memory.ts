import type { MemoryCard, MemoryCategory, MemoryFactuality } from "../data/celticsMemoryDeck";

export type MemoryRating = "again" | "hard" | "good";

export interface MemoryCardProgress {
  cardId: string;
  seenCount: number;
  correctCount: number;
  lapseCount: number;
  intervalDays: number;
  nextReviewAt: string;
  lastRating?: MemoryRating;
  updatedAt: string;
}

export interface MemoryProgressState {
  version: 1;
  cards: Record<string, MemoryCardProgress>;
}

export interface MemoryValidationResult {
  errors: string[];
  warnings: string[];
}

export const EMPTY_MEMORY_PROGRESS: MemoryProgressState = {
  version: 1,
  cards: {},
};

const CATEGORY_LABELS: Record<MemoryCategory, string> = {
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
  fan_meme: "球迷梗",
};

const FACTUALITY_LABELS: Record<MemoryFactuality, string> = {
  verified: "可证实",
  widely_debated: "广泛争议",
  opinion: "观点",
  meme: "论坛梗",
  forum_claim: "传闻型话术",
};

export function getMemoryCategoryLabel(category: MemoryCategory): string {
  return CATEGORY_LABELS[category];
}

export function getMemoryFactualityLabel(factuality: MemoryFactuality): string {
  return FACTUALITY_LABELS[factuality];
}

export function normalizeMemoryProgress(value: unknown): MemoryProgressState {
  if (!value || typeof value !== "object" || !("cards" in value)) {
    return EMPTY_MEMORY_PROGRESS;
  }

  const candidate = value as { cards?: unknown };
  if (!candidate.cards || typeof candidate.cards !== "object") {
    return EMPTY_MEMORY_PROGRESS;
  }

  const rawCards = candidate.cards as Record<string, unknown>;

  return {
    version: 1,
    cards: Object.fromEntries(
      Object.entries(rawCards)
        .filter((entry): entry is [string, Record<string, unknown>] => {
          const [cardId, progress] = entry;
          return Boolean(cardId && progress && typeof progress === "object");
        })
        .map(([cardId, cardProgress]) => [
          cardId,
          {
            cardId,
            seenCount: toNonNegativeNumber(cardProgress.seenCount),
            correctCount: toNonNegativeNumber(cardProgress.correctCount),
            lapseCount: toNonNegativeNumber(cardProgress.lapseCount),
            intervalDays: Math.max(0, Number(cardProgress.intervalDays) || 0),
            nextReviewAt:
              typeof cardProgress.nextReviewAt === "string"
                ? cardProgress.nextReviewAt
                : new Date(0).toISOString(),
            lastRating: isMemoryRating(cardProgress.lastRating)
              ? cardProgress.lastRating
              : undefined,
            updatedAt:
              typeof cardProgress.updatedAt === "string"
                ? cardProgress.updatedAt
                : new Date(0).toISOString(),
          },
        ]),
    ),
  };
}

export function selectNextMemoryCard(
  deck: MemoryCard[],
  progress: MemoryProgressState,
  now = new Date(),
  category: MemoryCategory | "all" = "all",
): MemoryCard | undefined {
  const filtered = category === "all" ? deck : deck.filter((card) => card.category === category);
  if (filtered.length === 0) {
    return undefined;
  }

  const nowTime = now.getTime();

  return [...filtered].sort((a, b) => {
    const aProgress = progress.cards[a.id];
    const bProgress = progress.cards[b.id];
    const aDue = getDueTime(aProgress);
    const bDue = getDueTime(bProgress);
    const aIsDue = aDue <= nowTime ? 0 : 1;
    const bIsDue = bDue <= nowTime ? 0 : 1;

    if (aIsDue !== bIsDue) {
      return aIsDue - bIsDue;
    }

    if (!aProgress && bProgress) {
      return -1;
    }
    if (aProgress && !bProgress) {
      return 1;
    }

    if (aDue !== bDue) {
      return aDue - bDue;
    }

    return b.difficulty - a.difficulty || a.id.localeCompare(b.id);
  })[0];
}

export function rateMemoryCard(
  progress: MemoryProgressState,
  cardId: string,
  rating: MemoryRating,
  now = new Date(),
): MemoryProgressState {
  const previous = progress.cards[cardId];
  const nextInterval = getNextIntervalDays(previous?.intervalDays ?? 0, rating);
  const correctIncrement = rating === "good" ? 1 : 0;
  const lapseIncrement = rating === "again" ? 1 : 0;
  const nextReviewAt = getNextReviewDate(now, nextInterval, rating);

  return {
    version: 1,
    cards: {
      ...progress.cards,
      [cardId]: {
        cardId,
        seenCount: (previous?.seenCount ?? 0) + 1,
        correctCount: (previous?.correctCount ?? 0) + correctIncrement,
        lapseCount: (previous?.lapseCount ?? 0) + lapseIncrement,
        intervalDays: nextInterval,
        nextReviewAt: nextReviewAt.toISOString(),
        lastRating: rating,
        updatedAt: now.toISOString(),
      },
    },
  };
}

export function getMemoryStats(
  deck: MemoryCard[],
  progress: MemoryProgressState,
  now = new Date(),
) {
  const nowTime = now.getTime();
  const studied = deck.filter((card) => progress.cards[card.id]?.seenCount > 0);
  const due = deck.filter((card) => getDueTime(progress.cards[card.id]) <= nowTime);
  const mastered = deck.filter((card) => {
    const cardProgress = progress.cards[card.id];
    return Boolean(
      cardProgress && cardProgress.correctCount >= 3 && cardProgress.intervalDays >= 7,
    );
  });
  const lapses = Object.values(progress.cards).reduce(
    (sum, cardProgress) => sum + cardProgress.lapseCount,
    0,
  );

  return {
    total: deck.length,
    studied: studied.length,
    due: due.length,
    mastered: mastered.length,
    lapses,
  };
}

export function validateMemoryDeck(deck: MemoryCard[]): MemoryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();

  for (const card of deck) {
    if (ids.has(card.id)) {
      errors.push(`memory card id 重复：${card.id}`);
    }
    ids.add(card.id);

    if (!card.question.trim() || !card.answer.trim() || !card.attackLine.trim()) {
      errors.push(`memory card ${card.id} 缺少 question、answer 或 attackLine。`);
    }
    if (!card.title.trim() || !card.category || !card.era.trim()) {
      errors.push(`memory card ${card.id} 缺少 title、category 或 era。`);
    }
    if (
      (card.factuality === "verified" || card.factuality === "widely_debated") &&
      card.sourceUrls.length === 0
    ) {
      errors.push(`memory card ${card.id} 是 ${card.factuality}，必须提供 sourceUrls。`);
    }
    if (card.factuality === "forum_claim" && !card.safetyNote.includes("不能包装成已证实事实")) {
      errors.push(`memory card ${card.id} 是传闻型话术，必须提示不能包装成事实。`);
    }
    if (card.sourceUrls.length === 0 && card.factuality !== "forum_claim") {
      warnings.push(`memory card ${card.id} 暂无 sourceUrls。`);
    }
  }

  return { errors, warnings };
}

function getNextIntervalDays(previousInterval: number, rating: MemoryRating): number {
  if (rating === "again") {
    return 0;
  }

  if (rating === "hard") {
    return previousInterval === 0 ? 1 : Math.max(1, Math.ceil(previousInterval * 1.4));
  }

  if (previousInterval === 0) {
    return 3;
  }

  return Math.min(60, Math.ceil(previousInterval * 2.2));
}

function getNextReviewDate(now: Date, intervalDays: number, rating: MemoryRating): Date {
  const next = new Date(now);

  if (rating === "again") {
    next.setMinutes(next.getMinutes() + 5);
    return next;
  }

  next.setDate(next.getDate() + intervalDays);
  return next;
}

function getDueTime(progress: MemoryCardProgress | undefined): number {
  if (!progress) {
    return 0;
  }

  const time = Date.parse(progress.nextReviewAt);
  return Number.isFinite(time) ? time : 0;
}

function toNonNegativeNumber(value: unknown): number {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? Math.max(0, Math.floor(numberValue)) : 0;
}

function isMemoryRating(value: unknown): value is MemoryRating {
  return value === "again" || value === "hard" || value === "good";
}
