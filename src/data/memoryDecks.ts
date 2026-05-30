import { celticsMemoryDeck } from "./celticsMemoryDeck";
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

export const memoryTeams: MemoryTeam[] = [
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
    status: "starter",
    sourceNotes: [
      "湖人首批包以公开季后赛失利、OK 内讧、豪阵失败和论坛常见冠军含金量梗为主。",
      "后续需要继续扩到 300+ 卡片，并给更多场外事件补可靠来源。",
    ],
  },
  {
    id: "team-warriors",
    nameZh: "勇士",
    shortLabel: "勇士",
    color: "#1d428a",
    deck: warriorsMemoryDeck,
    status: "starter",
    sourceNotes: [
      "勇士首批包以 3-1、杜兰特加盟、格林争议、普尔拳击、低谷选秀和论坛体系梗为主。",
      "后续需要继续扩到 300+ 卡片，并增加更多 1990s-2000s 队史材料。",
    ],
  },
];

export const allMemoryDecks = memoryTeams.flatMap((team) => team.deck);
