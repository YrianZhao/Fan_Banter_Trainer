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

export interface MemoryCard {
  id: string;
  teamId: "team-celtics";
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

interface CelticsSeed {
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

const sourceUrls = {
  basketballReference: "https://www.basketball-reference.com/teams/BOS/",
  celticsWikipedia: "https://en.wikipedia.org/wiki/Boston_Celtics",
  celticsSeasonsWikipedia: "https://en.wikipedia.org/wiki/List_of_Boston_Celtics_seasons",
  russellWikipedia: "https://en.wikipedia.org/wiki/Bill_Russell",
  billRussell: "https://www.nba.com/celtics/history/legends/bill-russell",
  lenBias: "https://en.wikipedia.org/wiki/Len_Bias",
  reggieLewis: "https://en.wikipedia.org/wiki/Reggie_Lewis",
  malicePalace: "https://en.wikipedia.org/wiki/Malice_at_the_Palace",
  paulPierce: "https://en.wikipedia.org/wiki/Paul_Pierce",
  antoineWalker: "https://en.wikipedia.org/wiki/Antoine_Walker",
  docRivers: "https://en.wikipedia.org/wiki/Doc_Rivers",
  rayAllen: "https://en.wikipedia.org/wiki/Ray_Allen",
  rajonRondo: "https://en.wikipedia.org/wiki/Rajon_Rondo",
  kevinGarnett: "https://en.wikipedia.org/wiki/Kevin_Garnett",
  perkins: "https://en.wikipedia.org/wiki/Kendrick_Perkins",
  isaiahThomas: "https://en.wikipedia.org/wiki/Isaiah_Thomas_(basketball)",
  kyrieIrving: "https://en.wikipedia.org/wiki/Kyrie_Irving",
  gordonHayward: "https://en.wikipedia.org/wiki/Gordon_Hayward",
  kembaWalker: "https://en.wikipedia.org/wiki/Kemba_Walker",
  imeUdoka: "https://en.wikipedia.org/wiki/Ime_Udoka",
  mazzulla: "https://en.wikipedia.org/wiki/Joe_Mazzulla",
  jaysonTatum: "https://en.wikipedia.org/wiki/Jayson_Tatum",
  jaylenBrown: "https://en.wikipedia.org/wiki/Jaylen_Brown",
  marcusSmart: "https://en.wikipedia.org/wiki/Marcus_Smart",
  kellyOlynyk: "https://en.wikipedia.org/wiki/Kelly_Olynyk",
  kevinLoveInjury: "https://en.wikipedia.org/wiki/Kevin_Love",
  glenDavis: "https://en.wikipedia.org/wiki/Glen_Davis_(basketball)",
  delonteWest: "https://en.wikipedia.org/wiki/Delonte_West",
  espn: "https://www.espn.com/nba/",
  nba: "https://www.nba.com/celtics/",
  theAthletic: "https://www.nytimes.com/athletic/nba/team/celtics/",
  tatumAchillesNba: "https://www.nba.com/news/celtics-jayson-tatum-surgery-ruptured-right-achilles",
  knicksCeltics2025Bbr:
    "https://www.basketball-reference.com/playoffs/2025-nba-eastern-conference-semifinals-knicks-vs-celtics.html",
  sixersCeltics2026Nba: "https://www.nba.com/playoffs/2026/east-first-round-2",
  sixersCeltics2026Bbr:
    "https://www.basketball-reference.com/playoffs/2026-nba-eastern-conference-first-round-76ers-vs-celtics.html",
  sixersCeltics2026Game7:
    "https://www.basketball-reference.com/boxscores/202605020BOS.html",
  sixersCeltics2026Ap:
    "https://apnews.com/article/75b918079f2c498d1a98f68f85754fd8",
  jabariBirdCbs:
    "https://www.cbsnews.com/boston/news/former-celtics-player-jabari-bird-admitted-assaulting-choking-woman/",
  sullingerEspnCharged:
    "https://www.espn.com/boston/nba/story/_/id/9629508/jared-sullinger-boston-celtics-arrested-charged-domestic-situation",
  sullingerEspnDismissed:
    "https://www.espn.com/boston/nba/story/_/id/9892824/domestic-violence-charges-dismissed-jared-sullinger-boston-celtics",
  terrenceWilliamsJustice:
    "https://www.justice.gov/usao-sdny/pr/former-nba-player-terrence-williams-sentenced-10-years-prison-defrauding-nba-players",
  glenDavisEspn:
    "https://www.espn.com/nba/story/_/id/40113791/glen-big-baby-davis-sentenced-40-months-prison-scheme",
};

const seeds: CelticsSeed[] = [
  seed("1969-russell-exit", "legacy_debate", "1960s", "拉塞尔退役后的断档", "1969 年比尔·拉塞尔退役后，凯尔特人王朝进入重组期。", "老冠军多是真，但很多是远古王朝红利；一离开拉塞尔，统治力立刻要重新证明。", [sourceUrls.russellWikipedia, sourceUrls.celticsSeasonsWikipedia], 3),
  seed("1973-havlicek-injury", "playoff_loss", "1970s", "1973 东决哈弗利切克肩伤", "1973 年凯尔特人 68 胜，却在东决输给尼克斯，哈弗利切克肩伤常被提及。", "68 胜都没进总决赛，绿军球迷别只会拿常规赛气势压人。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1975-bullets-loss", "playoff_loss", "1970s", "1975 东决输给子弹", "卫冕冠军凯尔特人在 1975 年东决输给华盛顿子弹。", "卫冕队东决出局，别把绿军历史讲成每个时代都稳得像机器。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1977-sixers-loss", "playoff_loss", "1970s", "1977 次轮输给 76 人", "1977 年凯尔特人季后赛次轮输给 76 人。", "老牌豪门也不是年年硬，70 年代后段照样被东部对手压回家。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1978-missed-playoffs", "playoff_loss", "1970s", "1978 无缘季后赛", "1977-78 赛季凯尔特人战绩下滑并无缘季后赛。", "绿军球迷谈底蕴前，别忘了豪门也有直接掉出季后赛的时候。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1979-missed-playoffs", "playoff_loss", "1970s", "1979 再次无缘季后赛", "1978-79 赛季凯尔特人继续无缘季后赛，直到伯德到来前仍在低谷。", "没有伯德之前那段低谷，别被冠军旗帜盖得一点都不剩。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1982-sixers-ecf", "playoff_loss", "1980s", "1982 东决被 76 人淘汰", "1982 年凯尔特人在东决输给 76 人。", "伯德时代也不是无敌剧本，东决被 76 人送走这账能不能认？", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1983-bucks-sweep", "playoff_loss", "1980s", "1983 被雄鹿横扫", "1983 年凯尔特人在东部半决赛被雄鹿横扫。", "伯德绿军被雄鹿横扫，别一讲 80 年代就只剩神话滤镜。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1985-finals-lakers", "finals_loss", "1980s", "1985 总决赛输给湖人", "1985 年凯尔特人在总决赛输给湖人，湖人打破在总决赛无法击败凯尔特人的历史包袱。", "绿军球迷拿湖凯历史压人时，1985 被湖人翻过心理关这事别装没发生。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1987-finals-lakers", "finals_loss", "1980s", "1987 总决赛再输湖人", "1987 年凯尔特人再次在总决赛输给湖人。", "80 年代后期湖人连续压绿军，总决赛硬仗不是只有绿军能写历史。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1988-pistons-ecf", "playoff_loss", "1980s", "1988 东决输给活塞", "1988 年凯尔特人在东决输给活塞，王朝竞争力明显下滑。", "活塞时代一来，绿军老王朝就被顶下去，别只讲过去旗帜不讲被时代换代。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1989-first-round-pistons", "playoff_loss", "1980s", "1989 首轮被活塞淘汰", "1989 年凯尔特人首轮输给活塞。", "曾经的东部霸主被活塞首轮送走，豪门也有被时代碾过去的时候。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1991-pistons-second-round", "playoff_loss", "1990s", "1991 次轮输给活塞", "1991 年凯尔特人在东部半决赛输给活塞。", "老三巨头余晖打不动活塞，别把绿军历史讲成只有冠军没有衰退。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1992-cavs-second-round", "playoff_loss", "1990s", "1992 次轮输给骑士", "1992 年凯尔特人在东部半决赛输给骑士。", "90 年代初绿军被骑士挡住，别把豪门滤镜开到看不见失败。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1993-hornets-first-round", "playoff_loss", "1990s", "1993 首轮输给黄蜂", "1993 年凯尔特人在首轮输给夏洛特黄蜂。", "绿军首轮被黄蜂送走，这种历史低谷别一谈底蕴就自动静音。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1994-missed-playoffs", "playoff_loss", "1990s", "1994 无缘季后赛", "1993-94 赛季凯尔特人无缘季后赛。", "90 年代绿军不是豪门叙事，是实打实长期掉线。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("1995-magic-first-round", "playoff_loss", "1990s", "1995 首轮输给魔术", "1995 年凯尔特人在首轮输给奥兰多魔术。", "最后一季老花园也没救回季后赛，绿军情怀不能当硬实力。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1996-missed-playoffs", "playoff_loss", "1990s", "1996 无缘季后赛", "1995-96 赛季凯尔特人无缘季后赛。", "绿军 90 年代中期连续掉队，豪门不等于自动有竞争力。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1997-worst-season", "management", "1990s", "1996-97 队史低谷", "1996-97 赛季凯尔特人战绩跌到队史低谷区间。", "祖上阔不代表当下强，1997 那种烂赛季够绿军球迷低头一整楼。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1997-duncan-lottery", "management", "1990s", "邓肯乐透错失", "1997 年凯尔特人经历低谷并参与选秀乐透，但最终未能得到蒂姆·邓肯。", "摆到低谷也没拿到邓肯，这种建队运气和操作遗憾就是绿军黑料库固定章节。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("1998-missed-playoffs", "playoff_loss", "1990s", "1998 无缘季后赛", "1997-98 赛季凯尔特人无缘季后赛。", "皮尔斯来之前那几年绿军就是东部背景板，别只拿 17 面旗遮羞。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("1999-missed-playoffs", "playoff_loss", "1990s", "1999 无缘季后赛", "1998-99 缩水赛季凯尔特人无缘季后赛。", "缩水赛季都没打出名堂，90 年代绿军低谷不是一两年能洗掉的。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2000-missed-playoffs", "playoff_loss", "2000s", "2000 无缘季后赛", "1999-00 赛季凯尔特人无缘季后赛。", "新世纪开局还在乐透区附近转，绿军球迷别把豪门底蕴当当前战斗力。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2001-missed-playoffs", "playoff_loss", "2000s", "2001 无缘季后赛", "2000-01 赛季凯尔特人仍无缘季后赛。", "皮尔斯早期绿军多年摸不到季后赛硬成绩，这段低谷不能从历史里剪掉。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2002-nets-ecf", "playoff_loss", "2000s", "2002 东决输给篮网", "2002 年凯尔特人在东决输给新泽西篮网。", "好不容易进东决又被篮网挡住，皮尔斯时代早期也没完成冲冠闭环。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2003-nets-sweep", "playoff_loss", "2000s", "2003 被篮网横扫", "2003 年凯尔特人在东部半决赛被篮网横扫。", "连续被篮网教育，第二年还直接横扫，别把那段说成差一点就争冠。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2004-pacers-sweep", "playoff_loss", "2000s", "2004 被步行者横扫", "2004 年凯尔特人在首轮被步行者横扫。", "首轮被步行者横扫，这种季后赛材料够对手球迷直接开火。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2005-pacers-game7", "playoff_loss", "2000s", "2005 抢七输步行者", "2005 年凯尔特人首轮抢七输给步行者。", "抢七主场没守住，绿军球迷谈硬仗前先把这类账接住。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2006-missed-playoffs", "playoff_loss", "2000s", "2006 无缘季后赛", "2005-06 赛季凯尔特人无缘季后赛。", "三巨头前那几年绿军就是不上不下，别把 2008 直接覆盖整段历史。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2007-24-wins", "management", "2000s", "2006-07 低谷赛季", "2006-07 赛季凯尔特人战绩低迷，之后通过交易组建三巨头。", "24 胜低谷再靠大交易翻身，绿军别装每次复兴都是自己慢慢练出来的。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2009-garnett-injury", "injury_what_if", "2000s", "2009 加内特伤病影响", "2009 年凯尔特人卫冕路受到凯文·加内特伤病影响。", "2009 只能讲如果，不能把没发生的卫冕当成荣誉写进账本。", [sourceUrls.kevinGarnett, sourceUrls.celticsSeasonsWikipedia], 3),
  seed("2009-magic-loss", "playoff_loss", "2000s", "2009 次轮输魔术", "2009 年凯尔特人在东部半决赛输给魔术。", "卫冕冠军次轮出局，伤病是背景，但结果还是被魔术送回家。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2010-finals-lakers", "finals_loss", "2010s", "2010 总决赛抢七输湖人", "2010 年凯尔特人在总决赛抢七输给湖人。", "抢七输湖人是绿军球迷最难嘴硬的材料之一，湖凯互喷这张牌杀伤力太足。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2011-heat-loss", "playoff_loss", "2010s", "2011 输给热火三巨头", "2011 年凯尔特人在东部半决赛输给热火。", "老三巨头遇到热火新三巨头就被时代接管，绿军别只嘲别人抱团。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2012-heat-game7", "playoff_loss", "2010s", "2012 东决抢七输热火", "2012 年凯尔特人在东决抢七输给热火。", "2-3 领先没关门，抢七被热火送走，别说绿军关键战永远稳。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2013-knicks-loss", "playoff_loss", "2010s", "2013 首轮输尼克斯", "2013 年凯尔特人在首轮输给尼克斯。", "老三巨头尾声首轮出局，情怀救不了竞技衰退。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2014-missed-playoffs", "management", "2010s", "2014 重建无缘季后赛", "2013-14 赛季凯尔特人重建并无缘季后赛。", "把老核心拆了之后立刻重建摆烂，绿军也别装从不低头。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2015-cavs-sweep", "playoff_loss", "2010s", "2015 首轮被骑士横扫", "2015 年凯尔特人首轮被骑士横扫。", "重建刚进季后赛就被骑士横扫，这种经历别只包装成青春风暴。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2015-olynyk-love", "dirty_play", "2010s", "奥利尼克拉拽乐福争议", "2015 年季后赛，凯利·奥利尼克与凯文·乐福的手臂纠缠导致乐福肩伤，事件引发争议。", "绿军谈强硬别忘了奥利尼克那下，强硬和脏之间就隔着对手受伤。", [sourceUrls.kellyOlynyk, sourceUrls.kevinLoveInjury], "只描述公开比赛争议和伤病结果，不进行恶意人身攻击。", 5),
  seed("2016-hawks-loss", "playoff_loss", "2010s", "2016 首轮输老鹰", "2016 年凯尔特人首轮输给老鹰。", "史蒂文斯早期季后赛也没少交学费，别把绿军少帅滤镜吹成自动赢球。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2017-cavs-ecf", "playoff_loss", "2010s", "2017 东决被骑士压制", "2017 年凯尔特人在东决输给骑士。", "东部第一打到东决被骑士压着走，绿军那年上限别吹过头。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2017-isaiah-trade", "management", "2010s", "小托马斯交易争议", "以赛亚·托马斯带伤为凯尔特人出战后被交易，长期引发关于球队冷血操作的讨论。", "小托马斯拼到带伤还被交易，绿军谈人情味时这事就是回旋镖。", [sourceUrls.isaiahThomas, sourceUrls.celticsWikipedia], "讨论公开交易与伤病背景，不延伸到私人攻击。", 5),
  seed("2018-cavs-game7", "playoff_loss", "2010s", "2018 东决抢七输骑士", "2018 年凯尔特人在东决抢七输给骑士。", "年轻绿军抢七主场没拿下骑士，别把那年讲成只差一个健康欧文。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2019-bucks-collapse", "playoff_loss", "2010s", "2019 次轮被雄鹿 4-1", "2019 年凯尔特人在次轮输给雄鹿，欧文时期球队化学反应备受质疑。", "纸面豪华打成 4-1 出局，绿军那年更衣室和领袖问题都够开会。", [sourceUrls.kyrieIrving, sourceUrls.celticsSeasonsWikipedia], 4),
  seed("2019-kyrie-promise", "player_conduct", "2010s", "欧文续约表态后离队", "凯里·欧文曾公开表达留队意愿，之后离开凯尔特人加盟篮网，引发球迷不满。", "欧文那段给绿军留下的不是冠军，是承诺落空和更衣室鸡飞狗跳。", [sourceUrls.kyrieIrving, sourceUrls.celticsWikipedia], "只讨论公开表态、转会和球队影响。", 4),
  seed("2020-heat-ecf", "playoff_loss", "2020s", "2020 东决输热火", "2020 年园区季后赛，凯尔特人在东决输给热火。", "园区东决被热火纪律性打掉，绿军天赋厚也没能兑现。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 3),
  seed("2021-nets-first-round", "playoff_loss", "2020s", "2021 首轮输篮网", "2021 年凯尔特人在首轮输给篮网。", "首轮被篮网送走，双探花时代也不是从一开始就稳进深轮次。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 2),
  seed("2022-finals-warriors", "finals_loss", "2020s", "2022 总决赛输勇士", "2022 年凯尔特人在总决赛输给勇士，失误和关键时刻进攻波动被反复讨论。", "2022 总决赛失误爆炸、进攻断电，绿军球迷别只说年轻交学费。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.jaysonTatum], 5),
  seed("2022-tatum-finals", "player_conduct", "2020s", "塔图姆总决赛表现争议", "塔图姆 2022 年总决赛效率和终结稳定性受到质疑。", "门面球星总决赛打成争议样本，绿军吹未来第一锋线时先接住这锅。", [sourceUrls.jaysonTatum, sourceUrls.basketballReference], "讨论公开比赛表现，不做人身攻击。", 4),
  seed("2022-ime-udoka", "player_conduct", "2020s", "乌度卡停职事件", "2022 年凯尔特人主教练 Ime Udoka 因违反球队政策被停职，随后离队。", "刚进总决赛转头教练出纪律风波，绿军谈职业管理时这事很难绕开。", [sourceUrls.imeUdoka, sourceUrls.celticsWikipedia], "只写公开报道和球队处分，不扩展隐私细节。", 5),
  seed("2023-heat-0-3", "playoff_loss", "2020s", "2023 东决 0-3 落后热火", "2023 年凯尔特人在东决对热火 0-3 落后，最终抢七主场失利。", "0-3 挖坑再抢七主场崩，绿军那年就是论坛开会素材天花板。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2023-game7-heat", "playoff_loss", "2020s", "2023 东决抢七输热火", "2023 年凯尔特人在东决抢七输给热火，无缘总决赛。", "抢七主场输八号种子热火，绿军球迷再硬也得先挨这一拳。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 5),
  seed("2023-mazzulla-criticism", "management", "2020s", "马祖拉临场争议", "Joe Mazzulla 早期执教凯尔特人时，临场调整和暂停使用受到外界讨论。", "绿军阵容这么厚还要球迷天天喷教练暂停，说明纸面强不等于会打硬仗。", [sourceUrls.mazzulla, sourceUrls.celticsWikipedia], 3),
  seed("2024-easy-path", "legacy_debate", "2020s", "2024 冠军路径质疑", "2024 年凯尔特人夺冠，但对手伤病与东部路径强度被部分球迷拿来讨论。", "2024 冠军是真冠军，但路径被质疑也是真的，绿军别装没人提对手伤病。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.basketballReference], 4),
  seed("2024-porzingis-health", "injury_what_if", "2020s", "波尔津吉斯健康变量", "2024 年季后赛期间，波尔津吉斯伤病和复出状态是凯尔特人的重要变量。", "绿军阵容厚到能扛伤病，这既是实力，也会被对手说成路径红利。", [sourceUrls.celticsSeasonsWikipedia, sourceUrls.nba], 2),
  seed("2025-knicks-loss", "playoff_loss", "2020s", "2025 季后赛输尼克斯", "2025 年凯尔特人在季后赛被尼克斯淘汰，卫冕失败。", "刚夺冠一年就被尼克斯挡住，绿军王朝梦别吹太早。", [sourceUrls.knicksCeltics2025Bbr, sourceUrls.celticsSeasonsWikipedia], 5),
  seed("2025-tatum-achilles", "injury_what_if", "2020s", "2025 塔图姆伤病变量", "2025 年季后赛中塔图姆遭遇右跟腱断裂并手术，影响凯尔特人争冠前景。", "伤病当然遗憾，但卫冕失败写在结果里，不能全靠如果论改判。", [sourceUrls.tatumAchillesNba, sourceUrls.knicksCeltics2025Bbr], "讨论公开伤病和球队影响，不嘲笑伤病。", 4),
  seed("2026-sixers-3-1-collapse", "playoff_loss", "2020s", "2026 对 76 人 3-1 被翻盘", "2026 年首轮凯尔特人在对 76 人系列赛曾 3-1 领先，最终抢七主场失利出局。", "3-1 领先被 76 人翻，绿军球迷再讲祖传硬仗也得先把这拳吃了。", [sourceUrls.sixersCeltics2026Nba, sourceUrls.sixersCeltics2026Ap, sourceUrls.sixersCeltics2026Bbr], 5),
  seed("2026-sixers-game7-home", "playoff_loss", "2020s", "2026 抢七主场输 76 人", "2026 年东部首轮抢七，凯尔特人在主场 100-109 输给 76 人。", "抢七在 TD Garden 被 76 人关门，这不是小黑点，是一整页开会材料。", [sourceUrls.sixersCeltics2026Game7, sourceUrls.sixersCeltics2026Nba], 5),
  seed("2026-sixers-rivalry-broken", "rivalry", "2020s", "76 人打破对绿军季后赛心魔", "2026 年 76 人淘汰凯尔特人，结束多年季后赛对绿军不利的叙事。", "以前绿军能拿 76 人当提款机，2026 直接被对手拿来反向清算。", [sourceUrls.sixersCeltics2026Ap, sourceUrls.sixersCeltics2026Bbr], 4),
  seed("bill-russell-racism", "fan_controversy", "1960s", "拉塞尔遭遇波士顿种族歧视", "比尔·拉塞尔曾公开谈到自己在波士顿遭遇种族歧视和不尊重。", "绿军谈传统和城市文化时，拉塞尔那段遭遇就是最难看的历史阴影。", [sourceUrls.russellWikipedia, sourceUrls.billRussell], "讨论公开历史和种族歧视问题时保持严肃，不使用歧视性语言。", 5),
  seed("fans-racism-smart", "fan_controversy", "2020s", "马库斯·斯马特谈球迷种族歧视", "马库斯·斯马特曾公开谈到在波士顿遭遇种族歧视言论。", "连自家球员都公开谈过球迷种族问题，绿军别把主场文化吹得太干净。", [sourceUrls.marcusSmart, sourceUrls.espn], "只讨论公开报道和球迷文化争议，不复述歧视性原话。", 5),
  seed("kyrie-racism-comments", "fan_controversy", "2020s", "欧文谈波士顿球迷环境", "凯里·欧文曾谈到回到波士顿比赛时与球迷环境相关的种族议题。", "欧文离队后互喷是一回事，波士顿球迷环境争议是另一回事，绿军球迷不能全当没听见。", [sourceUrls.kyrieIrving, sourceUrls.espn], "只讨论公开评论和球迷环境争议，不复述歧视性表达。", 4),
  seed("pierce-wheelchair", "fan_meme", "2000s", "皮尔斯轮椅梗", "2008 总决赛中保罗·皮尔斯坐轮椅离场后回归，后来成为长期球迷梗。", "皮尔斯轮椅梗被玩这么多年，绿军球迷再不爱听也绕不开。", [sourceUrls.paulPierce], 3),
  seed("ray-allen-exit", "teammate_help", "2010s", "雷·阿伦离队裂痕", "雷·阿伦离开凯尔特人加盟热火后，与部分前队友关系长期受关注。", "绿军三巨头不只有冠军，也有雷阿伦离队后的更衣室裂痕。", [sourceUrls.rayAllen, sourceUrls.celticsWikipedia], "讨论公开转会和队友关系，不做人身攻击。", 3),
  seed("rondo-locker-room", "player_conduct", "2010s", "隆多更衣室与性格争议", "拉简·隆多职业生涯中多次被讨论到个性、沟通和更衣室适配问题。", "绿军谈铁血控卫时，隆多那些更衣室争议也不是完全没材料。", [sourceUrls.rajonRondo], "只讨论公开篮球职业争议。", 3),
  seed("garnett-trash-talk", "dirty_play", "2000s", "加内特垃圾话争议", "凯文·加内特以强硬和垃圾话闻名，也因此常成为争议话题。", "绿军强硬文化有冠军味，也有垃圾话越界争议，别只挑好听的讲。", [sourceUrls.kevinGarnett], "不复述侮辱性原话，只讨论公开球场风格争议。", 3),
  seed("perkins-moving-screens", "dirty_play", "2000s", "内线强硬与掩护尺度", "三巨头时期凯尔特人的内线强硬、掩护和身体对抗经常被对手球迷吐槽。", "绿军说强硬，对手球迷说脏；这条线本来就是互喷高发区。", [sourceUrls.perkins, sourceUrls.kevinGarnett], "使用“尺度争议”措辞，不指控未证实违规。", 3),
  seed("danny-ainge-assets", "management", "2010s", "安吉资产囤积争议", "Danny Ainge 任内以积累资产和交易谈判闻名，也被球迷调侃过于精算。", "绿军那套资产管理很精，但也常被喷成只会攒筹码、舍不得梭哈。", [sourceUrls.celticsWikipedia, sourceUrls.espn], 3),
  seed("nets-trade-fleece", "management", "2010s", "篮网交易红利", "凯尔特人与篮网的交易为后续重建提供了关键选秀资产。", "绿军复兴很大一部分来自篮网送温暖，别讲得像全靠自己神机妙算。", [sourceUrls.celticsWikipedia, sourceUrls.basketballReference], 3),
  seed("hayward-injury-contract", "injury_what_if", "2010s", "海沃德伤病与合同", "戈登·海沃德加盟凯尔特人后首战重伤，影响球队计划。", "海沃德大合同第一场就重伤，绿军那几年争冠窗口被伤病狠狠打乱。", [sourceUrls.gordonHayward], "讨论公开伤病和球队影响，不嘲笑伤病。", 3),
  seed("kemba-knee-contract", "management", "2020s", "肯巴合同与膝伤问题", "肯巴·沃克在凯尔特人时期受膝伤影响，合同和状态成为球队问题。", "肯巴那笔签约最后变成膝伤和合同包袱，绿军运作也不是每次都神。", [sourceUrls.kembaWalker, sourceUrls.celticsWikipedia], "讨论公开伤病和合同影响。", 3),
  seed("jaylen-left-hand", "fan_meme", "2020s", "杰伦左手梗", "杰伦·布朗运球左手和失误问题曾被球迷反复调侃。", "杰伦左手梗不是凭空来的，关键场一被针对就会被全网开会。", [sourceUrls.jaylenBrown], 3),
  seed("tatum-kobe-text", "fan_meme", "2020s", "塔图姆短信科比梗", "塔图姆曾公开分享给科比发短信的故事，引发球迷不同评价。", "塔图姆科比短信梗被玩到烂，绿军球迷别一边营销曼巴一边怕被调侃。", [sourceUrls.jaysonTatum], 2),
  seed("smart-flopping", "fan_meme", "2010s", "斯马特造进攻犯规/假摔争议", "马库斯·斯马特以防守和造进攻犯规闻名，也常被对手球迷质疑假摔。", "斯马特强硬防守是真，假摔争议也是真，对手球迷抓这个一点不奇怪。", [sourceUrls.marcusSmart], "讨论比赛风格争议，不做人身攻击。", 3),
  seed("glen-davis-fraud", "player_conduct", "2020s", "格伦·戴维斯医保欺诈案", "前凯尔特人球员 Glen Davis 因 NBA 健康福利计划欺诈案被判刑，属公开司法事件。", "前冠军成员卷进医保欺诈案，绿军黑料库里这种场外公开案也绕不开。", [sourceUrls.glenDavisEspn, sourceUrls.glenDavis], "只描述公开司法事实，不扩展未证实内容。", 5),
  seed("terrence-williams-fraud", "player_conduct", "2020s", "特伦斯·威廉姆斯医保欺诈案", "前凯尔特人球员 Terrence Williams 因 NBA 健康福利计划欺诈案被判刑，属公开司法事件。", "前绿军旧将因为医保欺诈被判刑，这类场外硬料比空口喷人扎实多了。", [sourceUrls.terrenceWilliamsJustice], "只描述公开司法事实，不扩展未证实内容。", 5),
  seed("jabari-bird-domestic-case", "player_conduct", "2010s", "贾巴里·伯德家暴案公开报道", "前凯尔特人球员 Jabari Bird 的家暴相关案件曾被公开报道，后续有承认足够事实的司法进展。", "绿军球迷说队史干净时，Jabari Bird 这种公开家暴案就是不能装看不见。", [sourceUrls.jabariBirdCbs], "涉及家庭暴力时只使用公开司法报道措辞，不添加未经证实细节。", 5),
  seed("jared-sullinger-dismissed-case", "player_conduct", "2010s", "萨林杰家暴指控后撤案", "Jared Sullinger 2013 年曾被逮捕并面临家暴相关指控，之后相关指控被撤销。", "萨林杰这事不能说成定罪，但被逮捕、被控、撤案本身就是绿军旧闻黑料。", [sourceUrls.sullingerEspnCharged, sourceUrls.sullingerEspnDismissed], "必须同时说明指控后来撤销，不能把撤案事件说成已定罪事实。", 4),
  seed("delonte-west-struggles", "player_conduct", "2010s", "德隆蒂·韦斯特场外困境", "前凯尔特人球员 Delonte West 生涯后期经历公开场外困境和健康问题。", "韦斯特这类场外困境更适合严肃讨论，不能当低级笑料，但确实是绿军旧将争议素材。", [sourceUrls.delonteWest], "涉及健康与生活困境时避免羞辱。", 2),
  claimSeed("forum-private-rumor-trap", "通用", "无来源私生活传闻陷阱", "论坛会出现把球员私生活传闻当黑料的打法，但无来源严重指控不能当事实使用。", "靠没来源私生活传闻开火就是虚，绿军球迷反手一句来源呢你就断线。", 3),
  claimSeed("forum-league-whistle-protection", "通用", "联盟护豪门阴谋论", "论坛常见说法会把凯尔特人主场哨、联盟护豪门、暗箱操作混在一起说，证据通常不足。", "别一句联盟亲儿子就当证据，真要喷绿军就拿具体系列赛和判罚争议砸。", 3),
  claimSeed("forum-boston-media-mafia", "通用", "波士顿媒体团护短梗", "球迷论坛常把波士顿媒体声量和历史豪门滤镜当作凯尔特人被偏爱的理由。", "绿军那套媒体滤镜确实厚，但只喊媒体黑帮不如直接点名哪年哪轮被吹过头。", 2),
  claimSeed("forum-ancient-rings-discount", "通用", "远古冠军打折话术", "对喷里常见把凯尔特人早期冠军称作远古折扣冠军，用来削弱 17 冠叙事。", "别一数冠军就端着走，远古冠军含金量被打折是论坛互喷基本盘。", 3),
  claimSeed("forum-2024-hospital-path", "2020s", "2024 医院路径梗", "部分球迷把 2024 年凯尔特人夺冠路径称为医院路径，核心是在说对手伤病影响。", "2024 冠军是真的，但对面一路伤成那样，绿军球迷别装这梗不存在。", 4),
  claimSeed("forum-fake-underdog", "2020s", "强队装下狗梗", "论坛常吐槽凯尔特人阵容厚、战绩强，却在舆论里喜欢强调被质疑和逆风。", "阵容税都堆满了还天天演下狗，绿军这套受害者叙事少来点。", 2),
  claimSeed("forum-tatum-aura", "2020s", "塔图姆气质争议梗", "塔图姆关键时刻存在感、巨星气质和稳定性常被论坛用主观话术攻击。", "塔图姆不是没荣誉，但到关键时刻被喷没杀气，这口锅绿军球迷得会接。", 3),
  claimSeed("forum-jaylen-handle-repeat", "2020s", "杰伦左手被追着打", "杰伦·布朗左手处理球是长期论坛梗，经常被重复拿来攻击凯尔特人外线核心。", "杰伦 FMVP 也救不了左手梗，只要一失误，对面马上开你手柄少半边。", 3),
  claimSeed("forum-mazzulla-timeout", "2020s", "马祖拉暂停梗", "马祖拉早期执教阶段，暂停、临场和战术细节被球迷反复做成梗。", "阵容这么豪华还要靠球迷在线教暂停，绿军教练席被喷不是一天两天。", 2),
  claimSeed("forum-assets-merchant", "2010s", "安吉资产商人梗", "安吉时代长期积累资产、强调交易筹码，被论坛吐槽成资产商人打法。", "绿军复兴不是纯热血，是资产算盘打到飞起，别装豪门只靠情怀。", 2),
  claimSeed("forum-2008-superteam-started-it", "2000s", "2008 三巨头抱团回旋镖", "球迷互喷里常用 2008 凯尔特人三巨头反击绿军球迷嘲笑别人抱团。", "绿军嘲别人抱团前先照镜子，2008 那套三巨头就是抱团互喷祖传回旋镖。", 4),
];

const promptStyles = [
  {
    question: (seed: CelticsSeed) => `${seed.title} 的核心黑料是什么？`,
    answer: (seed: CelticsSeed) => seed.fact,
    attack: (seed: CelticsSeed) => seed.attackAngle,
  },
  {
    question: (seed: CelticsSeed) => `如果对方吹凯尔特人“底蕴无敌”，可以用 ${seed.title} 怎么反击？`,
    answer: (seed: CelticsSeed) => `${seed.fact} 对喷时要抓住的点是：${seed.attackAngle}`,
    attack: (seed: CelticsSeed) => `别一提绿军就只数旗帜，${seed.attackAngle}`,
  },
  {
    question: (seed: CelticsSeed) => `${seed.title} 属于哪类争议，为什么能当攻击点？`,
    answer: (seed: CelticsSeed) => `类别是 ${categoryLabel(seed.category)}。${seed.fact}`,
    attack: (seed: CelticsSeed) => `${seed.attackAngle} 这不是硬编，是绿军历史账本里能查到的素材。`,
  },
  {
    question: (seed: CelticsSeed) => `看到凯尔特人球迷吹“硬仗稳定”，${seed.title} 怎么用？`,
    answer: (seed: CelticsSeed) => `先说事实：${seed.fact} 再把话题拉回硬仗兑现。`,
    attack: (seed: CelticsSeed) => `硬仗稳定别只挑赢的讲，${seed.attackAngle}`,
  },
  {
    question: (seed: CelticsSeed) => `${seed.title} 最容易被对方如何洗白？你怎么拆？`,
    answer: (seed: CelticsSeed) => `对方可能会说这是时代背景或偶然事件；拆法是回到结果：${seed.fact}`,
    attack: (seed: CelticsSeed) => `别一句时代背景就洗完，${seed.attackAngle}`,
  },
  {
    question: (seed: CelticsSeed) => `用一句话记住 ${seed.title}。`,
    answer: (seed: CelticsSeed) => seed.attackAngle,
    attack: (seed: CelticsSeed) => seed.attackAngle,
  },
  {
    question: (seed: CelticsSeed) => `${seed.era} 凯尔特人的 ${seed.title} 能打哪个球迷痛点？`,
    answer: (seed: CelticsSeed) => `${seed.fact} 痛点是 ${categoryLabel(seed.category)}。`,
    attack: (seed: CelticsSeed) => `别把 ${seed.era} 讲成只有荣光，${seed.attackAngle}`,
  },
];

export const celticsMemoryDeck: MemoryCard[] = seeds.flatMap((seedItem) =>
  promptStyles.map((style, index) => ({
    id: `${seedItem.id}-card-${index + 1}`,
    teamId: "team-celtics" as const,
    category: seedItem.category,
    era: seedItem.era,
    title: seedItem.title,
    question: style.question(seedItem),
    answer: style.answer(seedItem),
    attackLine: style.attack(seedItem),
    sourceUrls: seedItem.sourceUrls,
    safetyNote:
      seedItem.safetyNote ??
      "使用公开比赛、管理或历史争议素材；避免仇恨、威胁、人肉和无来源严重指控。",
    factuality: seedItem.factuality ?? defaultFactuality(seedItem.category),
    difficulty: seedItem.difficulty,
  })),
);

function seed(
  id: string,
  category: MemoryCategory,
  era: string,
  title: string,
  fact: string,
  attackAngle: string,
  sourceUrlsInput: string[],
  safetyNoteOrDifficulty?: string | 1 | 2 | 3 | 4 | 5,
  maybeDifficulty?: 1 | 2 | 3 | 4 | 5,
): CelticsSeed {
  return {
    id,
    category,
    era,
    title,
    fact,
    attackAngle,
    sourceUrls: sourceUrlsInput,
    safetyNote: typeof safetyNoteOrDifficulty === "string" ? safetyNoteOrDifficulty : undefined,
    difficulty:
      typeof safetyNoteOrDifficulty === "number"
        ? safetyNoteOrDifficulty
        : maybeDifficulty ?? 3,
  };
}

function claimSeed(
  id: string,
  era: string,
  title: string,
  fact: string,
  attackAngle: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
): CelticsSeed {
  return {
    id,
    category: "fan_meme",
    era,
    title,
    fact,
    attackAngle,
    sourceUrls: [],
    safetyNote:
      "这是论坛梗/传闻型话术训练素材，只能作为对喷语境或识别陷阱使用，不能包装成已证实事实。",
    factuality: "forum_claim",
    difficulty,
  };
}

function categoryLabel(category: MemoryCategory): string {
  const labels: Record<MemoryCategory, string> = {
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
    fan_meme: "球迷梗/论坛梗",
  };

  return labels[category];
}

function defaultFactuality(category: MemoryCategory): MemoryFactuality {
  if (category === "fan_meme") {
    return "meme";
  }

  if (
    category === "legacy_debate" ||
    category === "teammate_help" ||
    category === "fan_controversy" ||
    category === "dirty_play"
  ) {
    return "widely_debated";
  }

  return "verified";
}
