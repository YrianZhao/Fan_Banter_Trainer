import { buildMemoryDeck, claimSeed, seed } from "./memoryDeckFactory";
import type { MemoryCard, MemorySeed } from "./memoryDeckTypes";

const sourceUrls = {
  basketballReference: "https://www.basketball-reference.com/teams/LAL/",
  lakersSeasonsWikipedia: "https://en.wikipedia.org/wiki/List_of_Los_Angeles_Lakers_seasons",
  lakersWikipedia: "https://en.wikipedia.org/wiki/Los_Angeles_Lakers",
  clutchPointsScandals:
    "https://clutchpoints.com/nba/los-angeles-lakers/biggest-scandals-in-los-angeles-lakers-history",
  bleacherScandals:
    "https://bleacherreport.com/articles/787027-la-lakers-5-biggest-scandals-in-lakers-history",
  magicJohnson: "https://en.wikipedia.org/wiki/Magic_Johnson",
  kermitWashington: "https://en.wikipedia.org/wiki/Kermit_Washington",
  rudyTomjanovich: "https://en.wikipedia.org/wiki/Rudy_Tomjanovich",
  kobeBryant: "https://en.wikipedia.org/wiki/Kobe_Bryant",
  shaq: "https://en.wikipedia.org/wiki/Shaquille_O%27Neal",
  dwightHoward: "https://en.wikipedia.org/wiki/Dwight_Howard",
  steveNash: "https://en.wikipedia.org/wiki/Steve_Nash",
  russellWestbrook: "https://en.wikipedia.org/wiki/Russell_Westbrook",
  lebronJames: "https://en.wikipedia.org/wiki/LeBron_James",
  anthonyDavis: "https://en.wikipedia.org/wiki/Anthony_Davis",
  espn: "https://www.espn.com/nba/team/_/name/lal/los-angeles-lakers",
};

const seeds: MemorySeed[] = [
  seed("1977-kermit-punch", "player_conduct", "1970s", "科米特·华盛顿拳击事件", "1977 年湖人球员 Kermit Washington 在比赛中重击 Rudy Tomjanovich，成为 NBA 历史上最严重的球场暴力事件之一。", "湖人谈豪门体面前，Kermit Washington 那拳就是队史最硬的黑页。", [sourceUrls.kermitWashington, sourceUrls.rudyTomjanovich, sourceUrls.bleacherScandals], "只描述公开球场暴力事件，不使用血腥细节做低级刺激。", 5),
  seed("1981-rockets-upset", "playoff_loss", "1980s", "1981 首轮被火箭爆冷", "1981 年湖人在季后赛首轮被 40 胜火箭淘汰。", "Showtime 前夜湖人也有被低胜场火箭首轮送走的账，别只会讲华丽王朝。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1984-finals-celtics", "finals_loss", "1980s", "1984 总决赛输凯尔特人", "1984 年湖人在总决赛输给凯尔特人，湖凯互喷里常被绿军球迷拿来清算。", "湖人球迷吹宿敌压制时，1984 被绿军拿下就是绕不开的老账。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1989-finals-sweep", "finals_loss", "1980s", "1989 总决赛被活塞横扫", "1989 年湖人在总决赛被活塞横扫。", "Showtime 到末期也会被活塞直接扫回家，王朝不是永远有滤镜。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1991-finals-bulls", "finals_loss", "1990s", "1991 总决赛输公牛", "1991 年湖人在总决赛输给乔丹公牛，象征联盟权力交接。", "乔丹时代一开，湖人就成了交接背景板，这点别装没发生。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1992-magic-hiv-controversy", "player_conduct", "1990s", "魔术师 HIV 退役与复出争议", "Magic Johnson 1991 年宣布感染 HIV 并退役，1992 年全明星和复出话题曾引发球员安全争议。", "湖人队史也有 Magic 复出争议这种大舆论场，不是每段传奇都只有掌声。", [sourceUrls.magicJohnson, sourceUrls.clutchPointsScandals], "讨论公开健康与联盟安全争议，避免污名化疾病。", 4),
  seed("1998-jazz-sweep", "playoff_loss", "1990s", "1998 西决被爵士横扫", "1998 年湖人在西决被爵士横扫。", "OK 组合早期不是一上来就统治，西决被爵士横扫够湖蜜闭嘴一轮。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2003-spurs-loss", "playoff_loss", "2000s", "2003 王朝被马刺终结", "湖人三连冠后在 2003 年西部半决赛输给马刺。", "三连冠很硬，但 2003 被马刺终结也说明王朝不是湖人想续就续。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2004-finals-pistons", "finals_loss", "2000s", "2004 豪阵输活塞", "2004 年拥有 Kobe、Shaq、Karl Malone、Gary Payton 的湖人在总决赛输给活塞。", "F4 豪阵被平民活塞拆成这样，湖人球迷嘲别人抱团前先接这拳。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2004-shaq-kobe-breakup", "teammate_help", "2000s", "OK 组合内讧拆队", "Shaq 与 Kobe 的矛盾和球队选择最终导致 OK 组合解体。", "OK 组合不是输给别人，是先把自己更衣室打散了，湖人豪门宫斗味太冲。", [sourceUrls.kobeBryant, sourceUrls.shaq, sourceUrls.clutchPointsScandals], "讨论公开队友关系和球队分裂，不做人身侮辱。", 5),
  seed("2006-suns-3-1", "playoff_loss", "2000s", "2006 对太阳 3-1 被翻盘", "2006 年湖人首轮 3-1 领先太阳后被翻盘。", "科比 3-1 领先太阳都没收住，湖人球迷谈关键战前先把这段背熟。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2008-finals-celtics", "finals_loss", "2000s", "2008 总决赛输凯尔特人", "2008 年湖人在总决赛输给凯尔特人，其中 Game 6 大比分失利被反复提起。", "湖凯互喷湖人别急着数冠军，2008 被绿军打到没悬念这页很刺眼。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2011-mavericks-sweep", "playoff_loss", "2010s", "2011 被独行侠横扫", "2011 年卫冕冠军湖人在西部半决赛被独行侠横扫。", "卫冕冠军被小牛横扫，湖人那年不是输，是被直接拆台。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2012-thunder-loss", "playoff_loss", "2010s", "2012 输给雷霆", "2012 年湖人在西部半决赛 1-4 输给雷霆。", "老湖人遇到雷霆青春风暴直接换代，别把那段包装成差口气。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2013-dwight-nash-collapse", "management", "2010s", "2013 纳什霍华德豪阵崩盘", "2012-13 湖人拥有 Kobe、Dwight Howard、Steve Nash、Pau Gasol，但伤病和磨合问题导致首轮被马刺横扫。", "纸面 F4 打到首轮被马刺横扫，湖人最会证明豪阵不等于化学反应。", [sourceUrls.dwightHoward, sourceUrls.steveNash, sourceUrls.lakersSeasonsWikipedia], 5),
  seed("2014-lottery-era", "management", "2010s", "科比后期乐透低谷", "2013-14 后湖人长期陷入乐透和重建低谷。", "豪门也会烂到连续乐透，湖人球迷别把紫金招牌当自动竞争力。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2016-kobe-farewell-tank", "legacy_debate", "2010s", "科比巡演与战绩低谷", "Kobe 最后一季湖人战绩低迷，但退役巡演获得巨大关注。", "60 分谢幕很传奇，但那年湖人战绩烂也是真，情怀不能直接抵战绩。", [sourceUrls.kobeBryant, sourceUrls.lakersSeasonsWikipedia], 3),
  seed("2021-suns-first-round", "playoff_loss", "2020s", "2021 卫冕首轮输太阳", "2021 年湖人卫冕赛季首轮输给太阳。", "刚拿冠军第二年首轮回家，湖人球迷说王朝前先看看卫冕路断多快。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2022-westbrook-fit", "management", "2020s", "威少交易适配灾难", "湖人交易得到 Russell Westbrook 后，阵容空间、球权和防守适配长期被批评。", "威少那笔交易就是湖人管理层大型公开课：名气堆满，篮球逻辑掉线。", [sourceUrls.russellWestbrook, sourceUrls.espn], 5),
  seed("2022-missed-playoffs", "playoff_loss", "2020s", "2022 无缘季后赛", "拥有 LeBron、Anthony Davis、Westbrook 的湖人 2021-22 赛季无缘季后赛。", "三巨头连附加赛都没守住，湖人球迷嘲别人失败时先别跳过 2022。", [sourceUrls.lebronJames, sourceUrls.anthonyDavis, sourceUrls.lakersSeasonsWikipedia], 5),
  seed("2023-nuggets-sweep", "playoff_loss", "2020s", "2023 西决被掘金横扫", "2023 年湖人在西决被掘金横扫。", "西决被约基奇横扫，湖人那年再多流量也没换来一场胜利。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2024-nuggets-loss", "playoff_loss", "2020s", "2024 再输掘金", "2024 年湖人首轮再次输给掘金。", "连续被掘金拿捏，湖人别把每次输都讲成只差一点。", [sourceUrls.lakersSeasonsWikipedia, sourceUrls.basketballReference], 4),
  claimSeed("forum-lakers-whistle", "通用", "湖人罚球队梗", "论坛常把湖人称为罚球队，核心是质疑判罚尺度和流量队待遇。", "湖人球迷别一被说罚球队就破防，这梗就是豪门流量的副作用。", 3),
  claimSeed("forum-disney-ring", "2020s", "园区冠军打折梗", "部分球迷把 2020 湖人冠军称为园区冠军，用来质疑冠军环境特殊。", "2020 是冠军，但园区冠军被打折这梗湖人球迷躲不掉。", 4),
];

export const lakersMemoryDeck: MemoryCard[] = buildMemoryDeck("team-lakers", "湖人", seeds);
