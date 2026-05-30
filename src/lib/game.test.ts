import { describe, expect, it } from "vitest";
import { defaultDataset } from "../data/defaultDataset";
import {
  applyResponse,
  buildRoundScenarios,
  createInitialCombatState,
  normalizeDataset,
  validateDataset,
} from "./game";
import type { BanterDataset } from "../types";

describe("dataset integrity", () => {
  it("keeps exactly one correct option per attack line", () => {
    for (const attackLine of defaultDataset.attackLines) {
      const correctCount = defaultDataset.responseOptions.filter(
        (option) => option.attackLineId === attackLine.id && option.isCorrect,
      ).length;

      expect(correctCount).toBe(1);
    }
  });

  it("requires every topic to have a target and category", () => {
    for (const topic of defaultDataset.topics) {
      expect(topic.targetId).toBeTruthy();
      expect(topic.targetType === "player" || topic.targetType === "team").toBe(true);
      expect(topic.category).toBeTruthy();
    }
  });

  it("requires verified and widely debated topics to include source urls", () => {
    for (const topic of defaultDataset.topics) {
      if (topic.factuality === "verified" || topic.factuality === "widely_debated") {
        expect(topic.sourceUrls.length).toBeGreaterThan(0);
      }
    }
  });

  it("ships a valid MVP dataset", () => {
    const result = validateDataset(defaultDataset);
    const players = defaultDataset.entities.filter((entity) => entity.type === "player");
    const teams = defaultDataset.entities.filter((entity) => entity.type === "team");

    expect(result.errors).toEqual([]);
    expect(players.length).toBeGreaterThanOrEqual(10);
    expect(teams.length).toBeGreaterThanOrEqual(8);

    for (const entity of defaultDataset.entities) {
      const topicCount = defaultDataset.topics.filter((topic) => topic.targetId === entity.id).length;
      expect(topicCount).toBeGreaterThanOrEqual(3);
    }
  });

  it("includes half-right wrong-counter options as deliberate traps", () => {
    for (const attackLine of defaultDataset.attackLines) {
      const hasHalfRightTrap = defaultDataset.responseOptions.some(
        (option) =>
          option.attackLineId === attackLine.id &&
          option.responseType === "good_evidence_wrong_counter" &&
          !option.isCorrect,
      );

      expect(hasHalfRightTrap).toBe(true);
    }
  });
});

describe("combat rules", () => {
  it("keeps the same round after a correct rebuttal and applies only pressure damage", () => {
    const [scenario] = buildRoundScenarios(defaultDataset, "player-lebron", "player-curry", 1);
    const state = createInitialCombatState();
    const result = applyResponse(state, scenario, "defense", scenario.defense.correctOptionId);

    expect(result.isCorrect).toBe(true);
    expect(result.enemyDamage).toBeGreaterThan(0);
    expect(result.enemyDamage).toBeLessThan(12);
    expect(result.nextState.roundIndex).toBe(state.roundIndex);
    expect(result.nextState.enemyHp).toBeLessThan(state.enemyHp);
    expect(result.nextState.playerHp).toBe(state.playerHp);
  });

  it("damages the enemy and advances the round when the selected attack is correct", () => {
    const [scenario] = buildRoundScenarios(defaultDataset, "player-lebron", "player-curry", 1);
    const state = createInitialCombatState();
    const result = applyResponse(state, scenario, "offense", scenario.offense.correctOptionId);

    expect(result.isCorrect).toBe(true);
    expect(result.enemyDamage).toBeGreaterThan(10);
    expect(result.nextState.roundIndex).toBe(state.roundIndex + 1);
    expect(result.nextState.enemyHp).toBeLessThan(state.enemyHp);
    expect(result.nextState.playerHp).toBe(state.playerHp);
  });

  it("damages the player when the selected attack is wrong or mismatched", () => {
    const [scenario] = buildRoundScenarios(defaultDataset, "player-lebron", "player-curry", 1);
    const wrongOption = scenario.offense.responseOptions.find((option) => !option.isCorrect);
    const state = createInitialCombatState();

    expect(wrongOption).toBeDefined();

    const result = applyResponse(state, scenario, "offense", wrongOption!.id);

    expect(result.isCorrect).toBe(false);
    expect(result.playerDamage).toBeGreaterThan(0);
    expect(result.nextState.roundIndex).toBe(state.roundIndex + 1);
    expect(result.nextState.playerHp).toBeLessThan(state.playerHp);
    expect(result.nextState.enemyHp).toBe(state.enemyHp);
  });

  it("can finish a game through round limit or HP depletion", () => {
    const rounds = buildRoundScenarios(defaultDataset, "team-rockets", "team-lakers");
    let state = createInitialCombatState();

    for (const scenario of rounds) {
      const defenseResult = applyResponse(state, scenario, "defense", scenario.defense.correctOptionId);
      state = defenseResult.nextState;

      if (state.isFinished) {
        break;
      }

      const offenseResult = applyResponse(state, scenario, "offense", scenario.offense.correctOptionId);
      state = offenseResult.nextState;

      if (state.isFinished) {
        break;
      }
    }

    expect(state.isFinished).toBe(true);
  });
});

describe("admin data utilities", () => {
  it("preserves data shape after JSON export and import", () => {
    const exported = JSON.stringify(normalizeDataset(defaultDataset));
    const imported = JSON.parse(exported) as BanterDataset;

    expect(imported.entities.length).toBe(defaultDataset.entities.length);
    expect(imported.topics.length).toBe(defaultDataset.topics.length);
    expect(imported.attackLines.length).toBe(defaultDataset.attackLines.length);
    expect(imported.responseOptions.length).toBe(defaultDataset.responseOptions.length);
  });

  it("finds missing correct answers, missing sources, and duplicate ids", () => {
    const broken: BanterDataset = {
      ...defaultDataset,
      topics: [
        {
          ...defaultDataset.topics[0],
          id: "duplicate-topic",
          factuality: "verified",
          sourceUrls: [],
        },
        {
          ...defaultDataset.topics[1],
          id: "duplicate-topic",
        },
      ],
      attackLines: [
        {
          ...defaultDataset.attackLines[0],
          id: "broken-attack",
          controversyTopicId: "duplicate-topic",
        },
      ],
      responseOptions: defaultDataset.responseOptions
        .filter((option) => option.attackLineId === defaultDataset.attackLines[0].id)
        .map((option) => ({
          ...option,
          id: `broken-${option.id}`,
          attackLineId: "broken-attack",
          isCorrect: false,
        })),
    };

    const result = validateDataset(broken);

    expect(result.errors.some((error) => error.includes("topic id 重复"))).toBe(true);
    expect(result.errors.some((error) => error.includes("sourceUrls"))).toBe(true);
    expect(result.errors.some((error) => error.includes("必须且只能有 1 个正确选项"))).toBe(true);
  });
});
