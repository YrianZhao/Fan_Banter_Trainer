import { buildMemoryDeck, claimSeed, seed } from "./memoryDeckFactory";
import type { MemoryCard, MemorySeed } from "./memoryDeckTypes";

const sourceUrls = {
  basketballReference: "https://www.basketball-reference.com/teams/GSW/",
  warriorsSeasonsWikipedia: "https://en.wikipedia.org/wiki/List_of_Golden_State_Warriors_seasons",
  warriorsWikipedia: "https://en.wikipedia.org/wiki/Golden_State_Warriors",
  latrellSprewell: "https://en.wikipedia.org/wiki/Latrell_Sprewell",
  chrisWebber: "https://en.wikipedia.org/wiki/Chris_Webber",
  stephenCurry: "https://en.wikipedia.org/wiki/Stephen_Curry",
  klayThompson: "https://en.wikipedia.org/wiki/Klay_Thompson",
  draymondGreen: "https://en.wikipedia.org/wiki/Draymond_Green",
  kevinDurant: "https://en.wikipedia.org/wiki/Kevin_Durant",
  jordanPoole: "https://en.wikipedia.org/wiki/Jordan_Poole",
  jamesWiseman: "https://en.wikipedia.org/wiki/James_Wiseman",
  espn: "https://www.espn.com/nba/team/_/name/gs/golden-state-warriors",
  nba: "https://www.nba.com/warriors/",
};

const seeds: MemorySeed[] = [
  seed("1978-missed-playoffs", "playoff_loss", "1970s", "1978 后冠军窗口断档", "1975 冠军后，勇士在 1977-78 赛季无缘季后赛，之后长期远离争冠中心。", "勇士球迷别只从库里时代开讲，祖上也有拿完冠军就长期掉线的黑洞期。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1987-lakers-loss", "playoff_loss", "1980s", "1987 输给湖人", "1987 年勇士在西部半决赛输给湖人。", "Run TMC 前的勇士碰到湖人照样被按住，别把队史讲成一直会打硬仗。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1991-lakers-loss", "playoff_loss", "1990s", "1991 Run TMC 输湖人", "1991 年 Run TMC 勇士在西部半决赛输给湖人。", "Run TMC 好看但不够硬，碰到湖人还是没能冲出西部。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1993-webber-nelson-feud", "management", "1990s", "韦伯与老尼尔森矛盾", "Chris Webber 新秀赛季后与 Don Nelson 和球队关系恶化，随后被交易。", "勇士早年管理层能把状元级天才一年玩散，这队史操作别只让库里遮着。", [sourceUrls.chrisWebber, sourceUrls.warriorsWikipedia], "讨论公开球队关系和交易，不做人身攻击。", 4),
  seed("1995-webber-trade-fallout", "management", "1990s", "韦伯交易后长期低谷", "Webber 离队后勇士长期陷入低谷，直到 2000 年代后期才重新进入季后赛。", "韦伯那次处理完，勇士直接多年沉底，管理层黑料不是一天攒出来的。", [sourceUrls.chrisWebber, sourceUrls.warriorsSeasonsWikipedia], 4),
  seed("1997-sprewell-choke", "player_conduct", "1990s", "斯普雷维尔掐教练事件", "1997 年 Latrell Sprewell 因袭击主教练 P.J. Carlesimo 被长期禁赛。", "勇士队史场外硬黑料，Sprewell 掐教练这事一提就是核弹级别。", [sourceUrls.latrellSprewell, sourceUrls.warriorsWikipedia], "只描述公开纪律事件，不鼓励现实暴力。", 5),
  seed("2008-missed-playoffs-48", "playoff_loss", "2000s", "48 胜无缘季后赛", "2007-08 勇士取得 48 胜但无缘西部季后赛。", "黑八以后第二年 48 胜还进不了季后赛，勇士队史也有西部卷到窒息的笑话。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2013-spurs-loss", "playoff_loss", "2010s", "2013 次轮输马刺", "2013 年库里带队的勇士在西部半决赛输给马刺。", "库里早期也得给马刺交学费，别把勇士王朝倒放成一开始就无敌。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2014-clippers-loss", "playoff_loss", "2010s", "2014 首轮输快船", "2014 年勇士在首轮抢七输给快船。", "勇士崛起前夜还被快船首轮送走，别把那段说得像已经王朝成型。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2015-cavs-injuries-path", "legacy_debate", "2010s", "2015 冠军对手伤病质疑", "2015 年勇士夺冠，但骑士欧文、乐福伤病常被对手球迷拿来讨论。", "2015 冠军是真，但对面伤到只剩詹姆斯硬扛，勇士球迷别装没人提含金量。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2016-finals-3-1", "finals_loss", "2010s", "2016 总决赛 3-1 被翻盘", "2016 年 73 胜勇士在总决赛 3-1 领先骑士后被翻盘。", "73 胜总决赛 3-1 被翻，勇士球迷对喷永远绕不开这把刀。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2016-draymond-suspension", "dirty_play", "2010s", "格林禁赛与踢裆争议", "2016 年季后赛 Draymond Green 多次因动作尺度引发争议，并在总决赛被禁赛。", "勇士讲传切篮球可以，格林踢裆和禁赛这条黑线也别想删。", [sourceUrls.draymondGreen, sourceUrls.warriorsSeasonsWikipedia], "讨论公开球场动作和联盟处罚，不做人身攻击。", 5),
  seed("2016-durant-join", "legacy_debate", "2010s", "杜兰特加盟 73 胜球队", "Kevin Durant 2016 年加盟刚取得 73 胜的勇士，被长期讨论为超级球队争议。", "73 胜还招杜兰特，勇士那两冠再硬也会被喷成最豪华捷径。", [sourceUrls.kevinDurant, sourceUrls.warriorsWikipedia], 5),
  seed("2018-rockets-cp3", "injury_what_if", "2010s", "2018 火箭保罗伤病如果论", "2018 西决火箭 Chris Paul 伤病缺席后两场，成为勇士冠军路径常见争议点。", "2018 勇士赢了，但火箭保罗一伤，含金量争议就永远能被拿出来打。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], "讨论公开伤病影响，不嘲笑伤病。", 4),
  seed("2019-finals-raptors", "finals_loss", "2010s", "2019 总决赛输猛龙", "2019 年勇士在总决赛输给猛龙，Durant、Klay 的伤病影响巨大。", "三连冠梦碎猛龙，伤病是事实，输球结果也是真，别拿如果论直接改判。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.kevinDurant, sourceUrls.klayThompson], "讨论公开伤病影响，不嘲笑伤病。", 4),
  seed("2020-worst-record", "management", "2020s", "2020 联盟垫底低谷", "2019-20 赛季勇士因核心伤病和阵容变化战绩跌至联盟底部。", "库里时代中间也有直接沉底的一年，勇士球迷别把体系神话吹成谁来都行。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2020-wiseman-pick", "management", "2020s", "怀斯曼榜眼选择争议", "勇士 2020 年用榜眼签选择 James Wiseman，后续发展未达预期，被长期讨论为选秀遗憾。", "榜眼签选怀斯曼，勇士管理层别总靠库里光环免喷。", [sourceUrls.jamesWiseman, sourceUrls.warriorsWikipedia], 4),
  seed("2021-play-in-loss", "playoff_loss", "2020s", "2021 附加赛出局", "2021 年勇士在附加赛输给湖人和灰熊，无缘季后赛。", "库里得分王赛季连季后赛都没进去，勇士球迷谈带队别只挑冠军年。", [sourceUrls.stephenCurry, sourceUrls.warriorsSeasonsWikipedia], 4),
  seed("2022-poole-punch", "player_conduct", "2020s", "格林拳击普尔事件", "2022 年训练中 Draymond Green 击打 Jordan Poole 的视频外泄，引发球队文化争议。", "刚夺冠就队内拳击，勇士所谓团队文化被格林一拳打出原形。", [sourceUrls.draymondGreen, sourceUrls.jordanPoole, sourceUrls.espn], "只描述公开视频和公开纪律事件，不鼓励现实暴力。", 5),
  seed("2023-lakers-loss", "playoff_loss", "2020s", "2023 输给湖人", "2023 年勇士在西部半决赛输给湖人。", "卫冕冠军被湖人送走，勇士别把每次失败都甩给哨子。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2024-play-in-kings", "playoff_loss", "2020s", "2024 附加赛输国王", "2024 年勇士附加赛输给国王，无缘季后赛。", "王朝尾声直接附加赛回家，勇士球迷别装核心还在巅峰。", [sourceUrls.warriorsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2024-klay-0-10", "fan_meme", "2020s", "克莱 0 分出局梗", "2024 附加赛对国王，Klay Thompson 投篮低迷未得分，成为球迷长期讨论点。", "克莱勇士最后一场 0 分，这种结尾太适合被对手球迷反复开会。", [sourceUrls.klayThompson, sourceUrls.basketballReference], "讨论公开比赛表现，不做人身攻击。", 4),
  claimSeed("forum-moving-screen-dynasty", "2010s", "移动掩护王朝梗", "论坛常用移动掩护质疑勇士传切体系的尺度红利。", "勇士传切再漂亮，也挡不住对面一句移动长城开喷。", 3),
  claimSeed("forum-lightyears-arrogance", "2020s", "Light years ahead 回旋镖", "勇士管理层曾被球迷用“遥遥领先”式叙事调侃，后续低谷让这句话变成回旋镖。", "别再吹管理层遥遥领先了，怀斯曼和普尔拳击已经把滤镜打碎。", 3),
];

export const warriorsMemoryDeck: MemoryCard[] = buildMemoryDeck(
  "team-warriors",
  "勇士",
  seeds,
);
