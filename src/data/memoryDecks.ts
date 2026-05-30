import { celticsMemoryDeck } from "./celticsMemoryDeck";
import { generatedMemoryTeams } from "./generatedTeamMemoryDecks";
import { lakersMemoryDeck } from "./lakersMemoryDeck";
import type { MemoryCard, MemoryTeamId } from "./memoryDeckTypes";
import { warriorsMemoryDeck } from "./warriorsMemoryDeck";

export interface MemoryTeam {
  id: MemoryTeamId;
  nameZh: string;
  shortLabel: string;
  color: string;
  deck: MemoryCard[];
  status: "deep" | "starter";
  sourceNotes: string[];
}

const manualTeams: MemoryTeam[] = [
  {
    id: "team-celtics",
    nameZh: "凯尔特人",
    shortLabel: "绿军",
    color: "#007a3d",
    deck: celticsMemoryDeck,
    status: "deep",
    sourceNotes: [
      "ClutchPoints 有凯尔特人队史 scandal/heartbreak 汇总，可作为选题清单参考。",
      "具体事实优先落到 Basketball Reference、NBA.com、ESPN、CBS、DOJ、Wikipedia 等来源。",
    ],
  },
  {
    id: "team-lakers",
    nameZh: "湖人",
    shortLabel: "湖人",
    color: "#552583",
    deck: lakersMemoryDeck,
    status: "deep",
    sourceNotes: [
      "湖人手工包以公开季后赛失利、OK 内讧、豪阵失败和论坛常见冠军含金量梗为主。",
      "已与生成深度包合并，用于补足每队 300+ 卡片目标。",
    ],
  },
  {
    id: "team-warriors",
    nameZh: "勇士",
    shortLabel: "勇士",
    color: "#1d428a",
    deck: warriorsMemoryDeck,
    status: "deep",
    sourceNotes: [
      "勇士手工包以 3-1、杜兰特加盟、格林争议、普尔拳击、低谷选秀和论坛体系梗为主。",
      "已与生成深度包合并，用于补足每队 300+ 卡片目标。",
    ],
  },
] satisfies MemoryTeam[];

const manualTeamsById = new Map(manualTeams.map((team) => [team.id, team]));

const mergedGeneratedTeams: MemoryTeam[] = generatedMemoryTeams.map((generatedTeam) => {
    const manualTeam = manualTeamsById.get(generatedTeam.id);

    if (!manualTeam) {
      return generatedTeam;
    }

    return {
      ...generatedTeam,
      shortLabel: manualTeam.shortLabel,
      color: manualTeam.color,
      deck: [...manualTeam.deck, ...generatedTeam.deck],
      sourceNotes: [...manualTeam.sourceNotes, ...generatedTeam.sourceNotes],
    };
  });

export const memoryTeams: MemoryTeam[] = [
  ...mergedGeneratedTeams,
  ...manualTeams.filter((team) => !generatedMemoryTeams.some((item) => item.id === team.id)),
];

memoryTeams.sort((a, b) => a.nameZh.localeCompare(b.nameZh, "zh-Hans-CN"));

export const allMemoryDecks = memoryTeams.flatMap((team) => team.deck);
