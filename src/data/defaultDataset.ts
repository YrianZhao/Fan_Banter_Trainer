import type {
  AttackLine,
  BanterDataset,
  ControversyTopic,
  Entity,
  ResponseOption,
  TopicCategory,
  TopicFactuality,
} from "../types";

interface TopicPlan {
  id: string;
  category: TopicCategory;
  title: string;
  summary: string;
  severity: 1 | 2 | 3 | 4 | 5;
  factuality: TopicFactuality;
  sourceUrls: string[];
  safePhrasingNotes: string;
  relatedTargets: string[];
  attacks: [string, string];
  correctFrame: string;
  requiredKnowledgeTags: string[];
}

interface OptionTemplateContext {
  topicPlan: TopicPlan;
  topicIndex: number;
  attackIndex: number;
}

interface WrongOptionTemplate {
  text: string;
  responseType:
    | "good_evidence_wrong_counter"
    | "weak_deflection"
    | "wrong_context"
    | "unsupported_claim";
  explanation: string;
  selfDamageIfWrong: number;
  requiredKnowledgeTags: string[];
}

export const entities: Entity[] = [
  {
    id: "player-lebron",
    type: "player",
    nameZh: "勒布朗·詹姆斯",
    nameEn: "LeBron James",
    aliases: ["詹姆斯", "LeBron", "老詹"],
    tags: ["持球核心", "历史级", "锋线", "湖人", "热火"],
    shortLabel: "詹姆斯",
    color: "#552583",
  },
  {
    id: "player-jordan",
    type: "player",
    nameZh: "迈克尔·乔丹",
    nameEn: "Michael Jordan",
    aliases: ["乔丹", "MJ", "篮球之神"],
    tags: ["历史级", "公牛", "得分手", "冠军"],
    shortLabel: "乔丹",
    color: "#ce1141",
  },
  {
    id: "player-kobe",
    type: "player",
    nameZh: "科比·布莱恩特",
    nameEn: "Kobe Bryant",
    aliases: ["科比", "Kobe", "黑曼巴"],
    tags: ["湖人", "得分手", "冠军", "后卫"],
    shortLabel: "科比",
    color: "#fdb927",
  },
  {
    id: "player-curry",
    type: "player",
    nameZh: "斯蒂芬·库里",
    nameEn: "Stephen Curry",
    aliases: ["库里", "Curry", "萌神"],
    tags: ["勇士", "三分", "后卫", "王朝"],
    shortLabel: "库里",
    color: "#1d428a",
  },
  {
    id: "player-durant",
    type: "player",
    nameZh: "凯文·杜兰特",
    nameEn: "Kevin Durant",
    aliases: ["杜兰特", "Durant", "KD"],
    tags: ["得分手", "锋线", "转会争议", "勇士"],
    shortLabel: "杜兰特",
    color: "#007ac1",
  },
  {
    id: "player-harden",
    type: "player",
    nameZh: "詹姆斯·哈登",
    nameEn: "James Harden",
    aliases: ["哈登", "Harden", "大胡子"],
    tags: ["火箭", "持球核心", "后卫", "季后赛争议"],
    shortLabel: "哈登",
    color: "#ce1141",
  },
  {
    id: "player-yao",
    type: "player",
    nameZh: "姚明",
    nameEn: "Yao Ming",
    aliases: ["姚明", "Yao"],
    tags: ["火箭", "中锋", "伤病遗憾", "国际球员"],
    shortLabel: "姚明",
    color: "#ba0c2f",
  },
  {
    id: "player-shaq",
    type: "player",
    nameZh: "沙奎尔·奥尼尔",
    nameEn: "Shaquille O'Neal",
    aliases: ["奥尼尔", "Shaq", "大鲨鱼"],
    tags: ["湖人", "中锋", "统治力", "罚球争议"],
    shortLabel: "奥尼尔",
    color: "#552583",
  },
  {
    id: "player-duncan",
    type: "player",
    nameZh: "蒂姆·邓肯",
    nameEn: "Tim Duncan",
    aliases: ["邓肯", "Duncan", "石佛"],
    tags: ["马刺", "大前锋", "冠军", "体系"],
    shortLabel: "邓肯",
    color: "#8a8d8f",
  },
  {
    id: "player-jokic",
    type: "player",
    nameZh: "尼古拉·约基奇",
    nameEn: "Nikola Jokic",
    aliases: ["约基奇", "Jokic", "约老师"],
    tags: ["中锋", "组织核心", "MVP", "掘金"],
    shortLabel: "约基奇",
    color: "#fec524",
  },
  {
    id: "team-lakers",
    type: "team",
    nameZh: "洛杉矶湖人",
    nameEn: "Los Angeles Lakers",
    aliases: ["湖人", "Lakers", "紫金军团"],
    tags: ["流量队", "豪门", "西部", "冠军"],
    shortLabel: "湖人",
    color: "#552583",
  },
  {
    id: "team-warriors",
    type: "team",
    nameZh: "金州勇士",
    nameEn: "Golden State Warriors",
    aliases: ["勇士", "Warriors", "金州"],
    tags: ["三分", "王朝", "西部", "冠军"],
    shortLabel: "勇士",
    color: "#1d428a",
  },
  {
    id: "team-celtics",
    type: "team",
    nameZh: "波士顿凯尔特人",
    nameEn: "Boston Celtics",
    aliases: ["凯尔特人", "绿军", "Celtics"],
    tags: ["豪门", "东部", "冠军"],
    shortLabel: "绿军",
    color: "#007a33",
  },
  {
    id: "team-bulls",
    type: "team",
    nameZh: "芝加哥公牛",
    nameEn: "Chicago Bulls",
    aliases: ["公牛", "Bulls", "芝加哥"],
    tags: ["乔丹", "历史王朝", "东部"],
    shortLabel: "公牛",
    color: "#ce1141",
  },
  {
    id: "team-rockets",
    type: "team",
    nameZh: "休斯敦火箭",
    nameEn: "Houston Rockets",
    aliases: ["火箭", "Rockets", "休斯敦"],
    tags: ["姚明", "哈登", "西部", "魔球"],
    shortLabel: "火箭",
    color: "#ce1141",
  },
  {
    id: "team-heat",
    type: "team",
    nameZh: "迈阿密热火",
    nameEn: "Miami Heat",
    aliases: ["热火", "Heat", "迈阿密"],
    tags: ["东部", "强硬", "季后赛", "三巨头"],
    shortLabel: "热火",
    color: "#98002e",
  },
  {
    id: "team-spurs",
    type: "team",
    nameZh: "圣安东尼奥马刺",
    nameEn: "San Antonio Spurs",
    aliases: ["马刺", "Spurs", "圣安东尼奥"],
    tags: ["体系", "小市场", "冠军", "西部"],
    shortLabel: "马刺",
    color: "#8a8d8f",
  },
  {
    id: "team-mavericks",
    type: "team",
    nameZh: "达拉斯独行侠",
    nameEn: "Dallas Mavericks",
    aliases: ["独行侠", "小牛", "Mavericks", "达拉斯"],
    tags: ["西部", "东契奇", "2011", "进攻"],
    shortLabel: "独行侠",
    color: "#00538c",
  },
];

const sourceBook: Record<string, string[]> = {
  "player-lebron": [
    "https://www.basketball-reference.com/players/j/jamesle01.html",
    "https://en.wikipedia.org/wiki/LeBron_James",
  ],
  "player-jordan": [
    "https://www.basketball-reference.com/players/j/jordami01.html",
    "https://en.wikipedia.org/wiki/Michael_Jordan",
  ],
  "player-kobe": [
    "https://www.basketball-reference.com/players/b/bryanko01.html",
    "https://en.wikipedia.org/wiki/Kobe_Bryant",
  ],
  "player-curry": [
    "https://www.basketball-reference.com/players/c/curryst01.html",
    "https://en.wikipedia.org/wiki/Stephen_Curry",
  ],
  "player-durant": [
    "https://www.basketball-reference.com/players/d/duranke01.html",
    "https://en.wikipedia.org/wiki/Kevin_Durant",
  ],
  "player-harden": [
    "https://www.basketball-reference.com/players/h/hardeja01.html",
    "https://en.wikipedia.org/wiki/James_Harden",
  ],
  "player-yao": [
    "https://www.basketball-reference.com/players/m/mingya01.html",
    "https://en.wikipedia.org/wiki/Yao_Ming",
  ],
  "player-shaq": [
    "https://www.basketball-reference.com/players/o/onealsh01.html",
    "https://en.wikipedia.org/wiki/Shaquille_O%27Neal",
  ],
  "player-duncan": [
    "https://www.basketball-reference.com/players/d/duncati01.html",
    "https://en.wikipedia.org/wiki/Tim_Duncan",
  ],
  "player-jokic": [
    "https://www.basketball-reference.com/players/j/jokicni01.html",
    "https://en.wikipedia.org/wiki/Nikola_Joki%C4%87",
  ],
  "team-lakers": [
    "https://www.basketball-reference.com/teams/LAL/",
    "https://en.wikipedia.org/wiki/Los_Angeles_Lakers",
  ],
  "team-warriors": [
    "https://www.basketball-reference.com/teams/GSW/",
    "https://en.wikipedia.org/wiki/Golden_State_Warriors",
  ],
  "team-celtics": [
    "https://www.basketball-reference.com/teams/BOS/",
    "https://en.wikipedia.org/wiki/Boston_Celtics",
  ],
  "team-bulls": [
    "https://www.basketball-reference.com/teams/CHI/",
    "https://en.wikipedia.org/wiki/Chicago_Bulls",
  ],
  "team-rockets": [
    "https://www.basketball-reference.com/teams/HOU/",
    "https://en.wikipedia.org/wiki/Houston_Rockets",
  ],
  "team-heat": [
    "https://www.basketball-reference.com/teams/MIA/",
    "https://en.wikipedia.org/wiki/Miami_Heat",
  ],
  "team-spurs": [
    "https://www.basketball-reference.com/teams/SAS/",
    "https://en.wikipedia.org/wiki/San_Antonio_Spurs",
  ],
  "team-mavericks": [
    "https://www.basketball-reference.com/teams/DAL/",
    "https://en.wikipedia.org/wiki/Dallas_Mavericks",
  ],
};

const topicPlans: Record<string, TopicPlan[]> = {
  "player-lebron": [
    plan("2011-finals", "finals_loss", "2011 总决赛表现争议", "2011 年总决赛表现长期是讨论詹姆斯历史地位时的主要反方素材。", 5, "verified", "承认该系列赛是低谷，不把单轮表现扩大成整个生涯否定。", [], ["{target}球迷一谈历史第一就急，2011 总决赛那轮表现怎么绕？", "别只摆生涯总数据，2011 这种最高舞台低谷就是历史评价里的扣分项。"], "2011 是硬伤，但后续多年总决赛和冠军回应了持续性", ["2011", "总决赛", "历史地位"]),
    plan("decision", "superteam", "决定一与抱团争议", "2010 年离开骑士加盟热火的公开宣布方式和组队路径，长期引发球迷争论。", 4, "widely_debated", "可以谈公开转会与节目观感，不延伸到家庭或私人攻击。", ["team-heat"], ["{target}当年决定一把老东家球迷伤得不轻，还开了抱团争冠模板。", "说忠诚和带队之前，先解释下从骑士去热火组队这事吧。"], "宣布方式有争议，但自由球员选择和后续场上兑现要分开讨论", ["自由球员", "抱团", "转会"]),
    plan("finals-record", "legacy_debate", "总决赛胜负与亚军争议", "詹姆斯多次进入总决赛，也因此常被拿总决赛胜负记录比较。", 3, "widely_debated", "讨论胜负记录时要同时考虑进入总决赛次数和对手强度。", [], ["{target}进总决赛多是多，可输的次数也多，别只把亚军当荣誉。", "历史级球星比的是最高舞台，{target}总决赛胜率这点经常被抓。"], "总决赛失利要看，但能长期把球队带到最高舞台本身也是样本", ["总决赛", "历史地位", "样本"]),
  ],
  "player-jordan": [
    plan("first-round", "playoff_failure", "早期季后赛首轮出局", "乔丹早期曾多次在季后赛首轮出局，常被用于反击“完美履历”叙事。", 3, "verified", "不要否定乔丹巅峰成就，重点讨论早期球队阶段。", [], ["{target}球迷别把生涯讲得像一路无敌，早期首轮出局也不少。", "说完美履历之前，{target}没等到成熟阵容时也没少被淘汰。"], "早期出局存在，但那是阵容成长阶段，后三连和两个三连才是核心样本", ["首轮", "公牛", "成长阶段"]),
    plan("teammate-help", "teammate_help", "皮蓬与公牛体系帮助", "乔丹冠军叙事中，皮蓬、禅师和公牛防守体系经常被拿来讨论队友帮助。", 3, "widely_debated", "可以讨论队友和体系，不把团队成功偷换成个人无价值。", ["team-bulls"], ["{target}六冠当然强，可皮蓬、禅师和公牛体系帮了多少也不能装没看见。", "别说得像一个人打五个，{target}身边配置和体系也是顶级。"], "队友帮助真实存在，但历史级核心本来就要在强队里把上限兑现", ["队友", "体系", "六冠"]),
    plan("wizards-years", "legacy_debate", "奇才时期下滑样本", "乔丹奇才时期表现仍有亮点，但不再是公牛巅峰级统治力。", 2, "verified", "讨论晚年竞技状态，避免年龄羞辱。", [], ["{target}球迷只剪公牛时期，奇才那段下滑就当没发生？", "历史讨论不能只看巅峰，{target}晚年样本也说明人不是永远无敌。"], "晚年下滑符合竞技规律，历史评价主要看巅峰高度和冠军阶段", ["奇才", "晚年", "巅峰"]),
  ],
  "player-kobe": [
    plan("efficiency", "stat_padding", "高难度出手与效率争议", "科比的高难度出手和部分赛季效率，经常被拿来讨论得分选择。", 3, "widely_debated", "讨论投篮选择和效率，不把“铁”扩展成人身羞辱。", [], ["{target}球迷别只说曼巴精神，高难度强投和效率争议可不少。", "关键球敢投是一回事，{target}有些出手选择确实容易被喷上头。"], "高难度出手带来效率争议，但也塑造了他在硬解回合里的价值", ["效率", "出手选择", "关键球"]),
    plan("2004-finals", "finals_loss", "2004 总决赛进攻选择争议", "2004 年湖人总决赛失利中，科比和球队进攻分配常被拿来讨论。", 4, "verified", "围绕系列赛表现和战术分配，不延伸到私人攻击。", ["team-lakers", "player-shaq"], ["{target}球迷谈硬仗之前，2004 总决赛出手和效率就够反方讲半天。", "OK 组合最后那轮总决赛，{target}的进攻选择争议可不是小事。"], "2004 是争议点，但后续两连冠证明他也能作为核心完成争冠闭环", ["2004", "总决赛", "OK组合"]),
    plan("shaq-split", "teammate_help", "OK 组合拆分后的比较", "科比和奥尼尔合作及分开后的冠军叙事，经常成为球迷争论点。", 3, "widely_debated", "可以讨论球权、阵容与冠军路径，不攻击私人关系。", ["player-shaq", "team-lakers"], ["{target}前三冠离不开奥尼尔统治力，别把 OK 组合讲成单核神话。", "说五冠时要分清楚，{target}前三冠身边可是巅峰奥尼尔。"], "前三冠有奥尼尔加成，但后两冠也回应了单独带队争冠质疑", ["队友帮助", "OK组合", "冠军路径"]),
  ],
  "player-curry": [
    plan("2016-finals", "finals_loss", "2016 总决赛 3-1 被逆转", "勇士 73 胜赛季总决赛 3-1 领先后被骑士逆转，是库里争议中最常见素材。", 5, "verified", "承认总决赛结果，不用阴谋论替代比赛分析。", ["team-warriors", "player-lebron"], ["{target}球迷别一提王朝就飘，2016 总决赛 3-1 被翻盘太经典。", "73 胜常规赛再亮，{target}那年总决赛收尾就是被抓一辈子的点。"], "2016 是痛点，但后续冠军和 2022 FMVP 回应了体系红利质疑", ["2016", "总决赛", "3-1"]),
    plan("finals-mvp", "legacy_debate", "早期 FMVP 空缺争议", "库里在 2022 年前没有总决赛 MVP，曾经被反方球迷用来攻击历史地位。", 3, "verified", "注意 2022 之后该争议已经发生变化。", [], ["{target}以前老被说没有 FMVP，这不就是体系核心不够硬的证据吗？", "勇士冠军多，可{target}早期没 FMVP 这点当年可没少被嘲。"], "2022 已经补上 FMVP，早期空缺不能抹掉他改变防守策略的影响", ["FMVP", "体系", "2022"]),
    plan("defense-target", "fan_meme", "防守端被点名话题", "库里因身材和位置，季后赛常被对手尝试点名，球迷也常围绕防守价值争论。", 2, "widely_debated", "讨论防守策略，不做人身外貌攻击。", [], ["{target}进攻确实强，可季后赛被点名防守这事也不是没发生过。", "别只看三分，{target}防守端被针对时勇士体系要帮他兜不少。"], "被点名和防守没价值不是一回事，勇士防守体系也依赖他的纪律性和轮转", ["防守", "点名", "体系"]),
  ],
  "player-durant": [
    plan("warriors-join", "superteam", "加盟 73 胜勇士路径争议", "杜兰特 2016 年加盟刚淘汰自己的勇士，是现代 NBA 最具争议的转会之一。", 5, "verified", "讨论公开转会路径和竞争格局，不延伸到人格侮辱。", ["team-warriors"], ["{target}个人能力再强，加盟刚赢自己的 73 胜勇士，这条冠军路就是容易被质疑。", "你说{target}冠军硬，可去勇士这步让联盟失衡，反方当然抓着打。"], "路径争议存在，但两连 FMVP 的个人输出也是真实硬实力", ["勇士", "转会", "FMVP"]),
    plan("okc-exit", "trade_drama", "离开雷霆与 3-1 背景", "杜兰特离开雷霆前，雷霆曾在西决对勇士 3-1 领先后被逆转。", 4, "verified", "讨论球队选择和系列赛背景，避免私人攻击。", [], ["{target}离开雷霆之前刚被勇士翻盘，转头加入对手，这观感很难不被喷。", "不是不能换队，但{target}那次从雷霆去勇士，时间点太容易被反方做文章。"], "观感确实敏感，但自由球员选择不等于否定他的场上能力", ["雷霆", "3-1", "自由球员"]),
    plan("bus-driver", "legacy_debate", "是否作为绝对核心夺冠争议", "杜兰特离开勇士后，是否能作为唯一头牌夺冠成为历史地位讨论中的常见话题。", 3, "widely_debated", "使用球迷梗时避免人身羞辱，聚焦冠军路径。", [], ["{target}离开勇士后还没证明自己单独带队夺冠，历史地位别说得太满。", "反方一提{target}就是冠军路径：是不是绝对核心带队，这问题还在。"], "冠军路径可讨论，但不能把勇士时期顶级终结表现说成无效", ["历史地位", "带队", "冠军路径"]),
  ],
  "player-harden": [
    plan("playoff-drop", "choking_claim", "季后赛关键战争议", "哈登多次在季后赛关键战表现波动，是反方球迷最常使用的攻击点。", 5, "widely_debated", "可谈效率、失误、系列赛结果，不使用人格羞辱。", [], ["{target}常规赛再猛，一到季后赛关键战就被翻旧账，这点太难洗。", "你拿{target}得分王没用，反方盯的是季后赛硬仗成色。"], "季后赛短板要承认，但也要区分单场拉胯和长期组织进攻价值", ["季后赛", "关键战", "效率"]),
    plan("free-throws", "fan_meme", "造犯规打法争议", "哈登巅峰期造犯规能力很强，也因此经常被质疑观感和季后赛适配。", 3, "widely_debated", "讨论规则利用和比赛观感，不攻击身体特征。", [], ["{target}那套造犯规打法常规赛好用，季后赛尺度一变就容易被喷。", "别只摆罚球数据，{target}打法观感争议当年可太大了。"], "造犯规是规则内技能，但季后赛尺度变化确实会影响讨论", ["罚球", "规则", "打法"]),
    plan("trade-requests", "trade_drama", "多次换队与争冠路径争议", "哈登生涯后期多次换队追求争冠，引发关于稳定性和球队承诺的讨论。", 3, "widely_debated", "只讨论公开交易申请和球队适配，不延伸到私人生活。", [], ["{target}后期换队太频繁，球迷还怎么吹长期带队稳定性？", "一遇到争冠不顺就换环境，{target}这履历很容易被反方攻击。"], "换队频繁影响观感，但也要看每段合作的阵容健康和争冠窗口", ["换队", "争冠", "稳定性"]),
  ],
  "player-yao": [
    plan("injury-what-if", "injury_what_if", "伤病遗憾与上限讨论", "姚明职业生涯受伤病影响明显，球迷常用如果论讨论其上限。", 4, "verified", "讨论出勤和健康风险，不嘲笑伤病。", ["team-rockets"], ["{target}实力不差，但伤病让巅峰太短，历史讨论总不能全靠如果。", "姚麦火箭听着浪漫，可{target}出勤和季后赛样本就是不够长。"], "伤病限制样本是事实，但健康时的攻防影响和国际意义不能被抹掉", ["伤病", "如果论", "火箭"]),
    plan("playoff-results", "playoff_failure", "季后赛突破有限", "姚明所在火箭多年受伤病和阵容影响，季后赛突破有限。", 3, "verified", "把团队结果和个人表现分开讨论。", ["team-rockets"], ["{target}球迷别只说统治力，季后赛轮次和硬成绩确实有限。", "国际影响力归国际影响力，{target}NBA 季后赛成绩这块反方很好打。"], "季后赛成绩有限，但不能忽略时代强队密度、伤病和队友健康变量", ["季后赛", "火箭", "团队结果"]),
    plan("era-pace", "legacy_debate", "时代节奏与现代适配讨论", "姚明所处时代与现代空间篮球不同，球迷常争论其放到今天的适配。", 2, "opinion", "这是跨时代假设，表达时避免当成确定事实。", [], ["{target}放到现在会不会被小球点名？别只按情怀自动升级。", "慢节奏传统中锋到现代空间时代，{target}适配不是一句情怀能解决。"], "跨时代适配是观点题，既要看防守空间，也要看低位和罚球线以上技术", ["跨时代", "现代篮球", "中锋"]),
  ],
  "player-shaq": [
    plan("free-throws", "fan_meme", "罚球短板与砍鲨战术", "奥尼尔罚球短板导致砍鲨战术成为经典话题。", 3, "verified", "可以调侃罚球，不攻击身体或私人生活。", [], ["{target}篮下再无解，罚球一上来就被砍鲨，这短板太明显。", "关键时刻敢不敢让{target}站罚球线？这就是反方常用点。"], "罚球短板真实存在，但对手愿意犯规本身也说明篮下统治力可怕", ["罚球", "砍鲨", "统治力"]),
    plan("conditioning", "fan_meme", "体型与训练状态争议", "奥尼尔生涯部分阶段训练状态和体型管理被媒体与球迷讨论。", 2, "widely_debated", "只谈公开竞技状态与出勤，不做人身羞辱。", [], ["{target}天赋太夸张，但训练状态和体型管理也经常被拿来吐槽。", "如果{target}一直保持最佳状态，成就可能更夸张；反过来说明自律争议存在。"], "状态管理可以讨论，但不能掩盖巅峰期真实统治力和冠军产出", ["训练状态", "体能", "巅峰"]),
    plan("kobe-help", "teammate_help", "与科比互相成就的争议", "奥尼尔湖人三连冠时期与科比互相成就，球迷经常争论谁更关键。", 3, "widely_debated", "讨论队友互补和奖项，不攻击私人关系。", ["player-kobe", "team-lakers"], ["{target}湖人三连强是强，可身边有科比，别讲得像单核碾压。", "奥尼尔统治力顶，但 OK 组合不是一个人完成的工程。"], "科比帮助真实存在，但三连 FMVP 也说明奥尼尔是那段的第一攻击点", ["OK组合", "FMVP", "队友"]),
  ],
  "player-duncan": [
    plan("system", "teammate_help", "马刺体系加成争议", "邓肯与波波维奇、马刺体系长期绑定，常被反方说成体系红利。", 3, "widely_debated", "可以讨论体系，不把团队篮球贬成个人无能。", ["team-spurs"], ["{target}球迷别只数五冠，波波维奇和马刺体系给了多少加成？", "把{target}单拎出来吹之前，先说说马刺稳定体系有多重要。"], "体系加成存在，但能当 20 年体系地基本身就是历史级价值", ["体系", "马刺", "队友"]),
    plan("market-visibility", "fan_meme", "低调风格与流量不足", "邓肯风格低调，球迷讨论时常被调侃存在感和观赏性不足。", 1, "meme", "这是球迷梗，不应替代荣誉和比赛事实。", [], ["{target}强是强，可比赛风格太朴素，论坛吵架都没多少素材。", "历史级球星讨论热度里，{target}总像被放进说明书里。"], "观赏性梗不等于实力低，低调高效反而是他稳定性的来源", ["风格", "球迷梗", "低调"]),
    plan("2004-olympics", "legacy_debate", "国际赛场样本争议", "2004 年美国男篮失利中，邓肯也常被拿来讨论国际赛场适配和阵容问题。", 2, "verified", "讨论国家队样本时要考虑规则、阵容和角色。", [], ["{target}NBA 稳，可 2004 国际赛场那段也不是完全没槽点。", "别只看马刺体系，{target}离开熟悉环境也有不顺样本。"], "国际赛失利不能单扣给一个人，但确实提醒跨环境表现要具体分析", ["国际赛", "2004", "环境"]),
  ],
  "player-jokic": [
    plan("defense", "legacy_debate", "防守形态质疑", "约基奇早期经常被质疑护筐和横移，冠军后讨论更多转向防守形态差异。", 3, "widely_debated", "讨论防守方式，不嘲笑身体条件。", [], ["{target}高阶数据再好，传统中锋护筐和换防短板以前没少被喷。", "别只看进攻组织，{target}防守端被针对时也有话题。"], "防守形态不是盖帽秀，站位、篮板和进攻控场同样能支撑冠军体系", ["防守", "高阶数据", "中锋"]),
    plan("mvp-fatigue", "legacy_debate", "MVP 讨论与审美疲劳", "约基奇多次进入 MVP 讨论，球迷围绕高阶数据和审美疲劳争论很多。", 2, "widely_debated", "讨论奖项标准，不引申为媒体阴谋。", [], ["{target}MVP 讨论总靠高阶数据刷屏，普通球迷看着难免审美疲劳。", "一到 MVP 就是高阶数据，{target}球迷是不是太依赖表格了？"], "高阶数据不是全部，但持续赢球和季后赛兑现让数据有现实支撑", ["MVP", "高阶数据", "奖项"]),
    plan("2024-wolves", "playoff_failure", "卫冕路上被森林狼淘汰", "掘金 2024 年季后赛被森林狼淘汰后，约基奇带队卫冕失败被拿来讨论。", 3, "verified", "讨论系列赛结果，不把一次失利扩大成否定冠军。", [], ["{target}刚拿冠军就卫冕失败，碰上长臂防守群也不是想打谁就打谁。", "说联盟第一人之前，{target}2024 被森林狼挡住这轮也得算进讨论。"], "卫冕失败是样本，但单轮失利不能抹掉冠军和长期季后赛产出", ["2024", "季后赛", "森林狼"]),
  ],
  "team-lakers": [
    plan("superstar-model", "management_failure", "巨星路线与阵容适配", "湖人常依赖巨星吸引力建队，阵容适配成败也因此被反复讨论。", 3, "widely_debated", "讨论管理策略和阵容结构，不攻击城市或球迷群体。", ["player-lebron", "player-kobe", "player-shaq"], ["{target}老说豪门底蕴，其实很多时候就是靠城市和巨星吸引力硬砸。", "湖人建队有时像拼名气，阵容适配翻车也不是一次两次。"], "豪门吸引力是优势，问题在于能不能把明星资源转化成合理阵容", ["建队", "豪门", "适配"]),
    plan("westbrook-fit", "trade_drama", "2021-22 阵容适配失败", "湖人 2021-22 赛季阵容空间、防守和角色适配问题是近年典型争议。", 4, "verified", "围绕公开阵容和比赛表现，不攻击个人私生活。", ["player-lebron"], ["{target}那套巨星堆叠不看空间，2021-22 打得多别扭还用说？", "湖人球迷嘲别人管理层前，先看看自己那次阵容适配翻车。"], "那次适配失败要承认，但单次失败不能否定长期争冠吸引力", ["2022", "阵容适配", "交易"]),
    plan("bubble-title", "legacy_debate", "园区冠军含金量争议", "2020 年园区冠军因特殊赛季环境，长期被球迷讨论含金量。", 3, "widely_debated", "可以讨论赛制环境，但不要用“缩水”直接否定所有球队努力。", ["player-lebron"], ["{target}2020 园区冠军环境太特殊，含金量当然会被反方质疑。", "别只数冠军，湖人那冠没有主客场旅行压力，这点球迷一直会拿来说。"], "特殊环境所有队都面对，能在同一规则下夺冠仍然是冠军", ["2020", "园区", "冠军含金量"]),
  ],
  "team-warriors": [
    plan("2016-collapse", "finals_loss", "2016 总决赛 3-1 被逆转", "勇士 73 胜赛季总决赛失利，是球队王朝叙事中的最大痛点。", 5, "verified", "承认系列赛结果，不使用阴谋论替代复盘。", ["player-curry"], ["{target}73 胜总决赛 3-1 被翻盘，这种历史级翻车怎么洗？", "勇士球迷说王朝前，2016 那个收尾就是反方第一张牌。"], "2016 是硬伤，但后续冠军证明这支队不是只会常规赛", ["2016", "3-1", "总决赛"]),
    plan("durant-parity", "superteam", "杜兰特加盟后竞争失衡争议", "勇士在 73 胜班底上加入杜兰特，让 2017-18 的冠军路径长期被讨论。", 5, "verified", "讨论阵容强度和联盟格局，不否定球员个人能力。", ["player-durant"], ["{target}那两冠就是 73 胜班底再加杜兰特，联盟竞争都失衡了。", "勇士球迷吹统治力可以，但 KD 加盟让冠军路径太豪华。"], "阵容豪华确实加大争议，但场上执行和统治力也是真实结果", ["杜兰特", "超级球队", "冠军"]),
    plan("moving-screens", "referee_controversy", "掩护尺度与体系争议", "勇士无球体系中掩护质量和裁判尺度，经常成为对手球迷吐槽点。", 2, "meme", "这是常见球迷争议，避免把裁判问题说成确定作弊。", [], ["{target}无球跑位当然强，但移动掩护尺度也没少被人吐槽。", "勇士那套体系一跑起来，对手球迷最爱说的就是掩护尺度。"], "掩护尺度可以争论，但不能把所有进攻成功都归因于裁判", ["掩护", "裁判尺度", "体系"]),
  ],
  "team-celtics": [
    plan("2022-finals", "finals_loss", "2022 总决赛进攻断电", "凯尔特人 2022 年总决赛失误和关键时刻进攻波动被频繁讨论。", 4, "verified", "讨论系列赛表现和成长成本。", [], ["{target}2022 总决赛关键时刻进攻断电、失误一堆，这还怎么嘴硬？", "绿军球迷别只说天赋，2022 总决赛处理球成熟度就是被勇士教育。"], "年轻核心交学费是事实，但能到总决赛也说明基本盘足够强", ["2022", "总决赛", "失误"]),
    plan("one-title-core", "legacy_debate", "双探花核心兑现速度争议", "凯尔特人长期拥有高水平阵容，球迷会争论其核心兑现是否足够快。", 3, "widely_debated", "讨论争冠窗口和阵容，不攻击球员人格。", [], ["{target}阵容年年都厚，核心兑现速度却一直被催，这不就是压力吗？", "绿军这几年资源不少，球迷还总说未来可期，反方当然抓兑现速度。"], "高期待带来高压力，但持续深轮次说明阵容不是纸面强队", ["双探花", "争冠窗口", "兑现"]),
    plan("historic-rings", "legacy_debate", "历史冠军数量与现代样本", "凯尔特人历史冠军多，但很多冠军来自较早年代，现代球迷常争论可比性。", 2, "opinion", "跨时代荣誉比较要说明时代差异。", [], ["{target}别老拿远古冠军压人，现代样本才是现在球迷吵架重点。", "绿军历史厚是厚，可拿几十年前的冠军吓现在球队不太够吧。"], "历史底蕴是事实，但现代竞争力也需要用近年季后赛证明", ["历史", "冠军", "跨时代"]),
  ],
  "team-bulls": [
    plan("post-jordan-rebuild", "management_failure", "乔丹后长期重建", "公牛在乔丹时代后长期难以重回王朝级竞争力，是球队争议核心。", 4, "verified", "讨论管理和球队建设，不只依赖怀旧。", ["player-jordan"], ["{target}离开乔丹后这么多年难回顶级，豪门底气是不是太靠怀旧？", "公牛球迷一谈就是六冠，可后乔丹时代管理层成绩很难撑住嘴。"], "乔丹后低谷存在，但六冠王朝仍是球队历史真实资产", ["重建", "乔丹", "管理"]),
    plan("rose-injury", "injury_what_if", "罗斯伤病如果论", "罗斯受伤让公牛争冠窗口改变，球迷常用如果论讨论那支球队。", 3, "verified", "讨论伤病遗憾，不嘲笑伤病或身体。", [], ["{target}后来最可惜就是罗斯伤病，但争冠讨论不能全靠如果。", "公牛球迷说如果罗斯健康没问题，可现实窗口就是没兑现。"], "伤病如果论不能当冠军，但那支队的防守和 MVP 核心也不是空想", ["罗斯", "伤病", "如果论"]),
    plan("front-office-last-dance", "management_failure", "王朝拆散与管理层争议", "公牛王朝后期管理层、薪资和续约问题经常被讨论。", 3, "widely_debated", "围绕公开管理决策，不做人身攻击。", ["player-jordan"], ["{target}王朝结束不只是自然衰老，管理层操作也一直被球迷喷。", "公牛六冠后没能平稳延续，管理层争议就是反方素材。"], "管理层争议存在，但王朝周期本来就会面对薪资、年龄和权力分配问题", ["王朝", "管理层", "Last Dance"]),
  ],
  "team-rockets": [
    plan("harden-era", "playoff_failure", "哈登时代季后赛突破", "火箭哈登时代常规赛强势，但季后赛多次被勇士等强队挡住。", 4, "verified", "讨论系列赛结果和对手强度，不用单场羞辱替代分析。", ["player-harden", "team-warriors"], ["{target}魔球吹了那么多年，哈登时代最后还是没进总决赛。", "火箭球迷别只说差一点，季后赛结果就是一直差那口气。"], "突破失败要承认，但巅峰勇士强度和保罗伤病也要放进上下文", ["哈登", "魔球", "季后赛"]),
    plan("yao-tmac-injuries", "injury_what_if", "姚麦组合伤病遗憾", "姚麦时代受伤病影响，火箭长期被如果论包围。", 3, "verified", "讨论健康和阵容，不嘲笑伤病。", ["player-yao"], ["{target}姚麦故事讲得动人，可季后赛成绩很多时候只剩如果。", "火箭球迷最常说健康就好了，但现实就是窗口没打出来。"], "如果论不能换成绩，但健康时的阵容上限和时代竞争强度也要看", ["姚麦", "伤病", "如果论"]),
    plan("small-ball", "management_failure", "极致小球与阵容实验", "火箭极致小球和魔球实验让球队风格鲜明，也带来篮板与尺寸争议。", 3, "widely_debated", "讨论战术实验和阵容风险，不嘲笑身高。", [], ["{target}那套极致小球看着先进，碰到尺寸和篮板问题就很难受。", "火箭魔球不是没道理，但把中锋位置压到极致，风险也很明显。"], "小球实验有短板，但它确实逼出了联盟对空间和效率的重新讨论", ["小球", "魔球", "阵容"]),
  ],
  "team-heat": [
    plan("superteam-heatles", "superteam", "热火三巨头抱团争议", "2010 年热火三巨头组队让球队获得冠军，也长期被反方称为抱团模板。", 4, "verified", "讨论公开自由球员组队，不做人身辱骂。", ["player-lebron"], ["{target}三巨头那几年强是强，但抱团争冠这个标签很难撕掉。", "热火球迷说文化前，先承认三巨头时期天赋堆得有多狠。"], "三巨头是超级阵容，但冠军仍需要场上防守、空间和关键球兑现", ["三巨头", "抱团", "冠军"]),
    plan("offense-ceiling", "playoff_failure", "平民阵容进攻上限", "热火纪律性和防守强，但部分总决赛样本中进攻天赋上限被质疑。", 3, "widely_debated", "讨论阵容结构，不贬低努力和伤病。", [], ["{target}文化再硬，到了总决赛拼天赋时进攻断档很明显。", "热火能以下克上，但真到最高舞台，进攻上限经常被抓。"], "进攻天赋是问题，但热火纪律性让很多纸面更强的队提前回家", ["进攻", "总决赛", "文化"]),
    plan("jimmy-carry", "teammate_help", "巴特勒单核负担争议", "热火近年季后赛常被认为依赖巴特勒高强度输出，阵容火力被讨论。", 3, "widely_debated", "讨论球队火力分配，不攻击伤病或个人生活。", [], ["{target}这些年太靠巴特勒硬撑，其他火力一断就很难赢系列赛。", "热火球迷说团队篮球，但关键时候还是看巴特勒能不能爆。"], "依赖核心没错，问题是热火能把角色球员纪律性拉到很高水平", ["巴特勒", "角色球员", "季后赛"]),
  ],
  "team-spurs": [
    plan("system-label", "teammate_help", "体系篮球与球星光环争议", "马刺团队体系强大，常被对手球迷用来弱化单个球星的光环。", 3, "widely_debated", "讨论团队篮球，不把体系等同于没有巨星。", ["player-duncan"], ["{target}球迷别只吹巨星，波波维奇体系才是长期稳定的关键吧？", "马刺赢球像机器，反方当然会说体系大于个人。"], "体系是优势，但能长期运行说明核心、教练和角色球员都高水平", ["体系", "波波维奇", "团队"]),
    plan("kawhi-exit", "trade_drama", "伦纳德离队争议", "伦纳德与马刺的分手过程是球队近年最重要的公开争议之一。", 4, "widely_debated", "只讨论公开报道和球队影响，不涉及医疗隐私细节。", [], ["{target}再稳也有伦纳德离队那次大裂痕，管理和沟通可不是完美。", "马刺球迷说文化无敌，可小卡事件说明体系也会出大问题。"], "伦纳德离队是重大裂痕，但不能把二十年稳定文化全抹掉", ["伦纳德", "交易", "球队文化"]),
    plan("market-style", "fan_meme", "小市场与观赏性梗", "马刺长期低调高效，球迷常用小市场和比赛风格调侃热度。", 1, "meme", "这是球迷梗，不应当作竞技否定。", [], ["{target}强归强，但小市场慢节奏，论坛流量经常吵不过别人。", "马刺球迷讲战术讲半天，路人可能已经看睡了。"], "热度梗不等于实力弱，低调执行力正是马刺长期强的原因", ["小市场", "风格", "球迷梗"]),
  ],
  "team-mavericks": [
    plan("2011-one-ring", "legacy_debate", "2011 冠军后延续性", "独行侠 2011 年夺冠伟大，但随后多年没有延续同级争冠阵容。", 3, "verified", "尊重 2011 冠军，同时讨论后续建队。", [], ["{target}2011 很传奇，但之后很久没能延续争冠阵容也是事实。", "独行侠球迷别只活在 2011，冠军后管理层续航问题也得聊。"], "2011 单冠含金量高，但后续管理确实留下了窗口延续问题", ["2011", "建队", "冠军"]),
    plan("luka-defense", "teammate_help", "东契奇时代攻防平衡", "东契奇时代独行侠进攻上限高，但防守配置和持球负担常被讨论。", 3, "widely_debated", "讨论角色配置和防守，不做国籍攻击。", [], ["{target}进攻靠东契奇能抡，但防守和持球负担一到季后赛就被放大。", "独行侠球迷别只看进攻数据，阵容攻防平衡一直是难题。"], "持球负担和防守问题存在，但东契奇硬解能力也让球队上限很高", ["东契奇", "防守", "持球"]),
    plan("2024-finals", "finals_loss", "2024 总决赛进攻受限", "独行侠 2024 年进入总决赛，但面对凯尔特人整体防守时进攻被限制。", 4, "verified", "讨论系列赛对位和阵容差距。", [], ["{target}2024 进总决赛不错，可真碰到完整强队，进攻点被限制得很明显。", "独行侠球迷说西部杀出来很硬，但总决赛被绿军防守教育也是真的。"], "总决赛受限是事实，但能冲出西部说明这套核心已经有竞争力", ["2024", "总决赛", "凯尔特人"]),
  ],
};

function plan(
  id: string,
  category: TopicCategory,
  title: string,
  summary: string,
  severity: 1 | 2 | 3 | 4 | 5,
  factuality: TopicFactuality,
  safePhrasingNotes: string,
  relatedTargets: string[],
  attacks: [string, string],
  correctFrame: string,
  requiredKnowledgeTags: string[],
): TopicPlan {
  return {
    id,
    category,
    title,
    summary,
    severity,
    factuality,
    sourceUrls: [],
    safePhrasingNotes,
    relatedTargets,
    attacks,
    correctFrame,
    requiredKnowledgeTags,
  };
}

function buildDataset(): BanterDataset {
  const topics: ControversyTopic[] = [];
  const attackLines: AttackLine[] = [];
  const responseOptions: ResponseOption[] = [];

  Object.entries(topicPlans).forEach(([targetId, plans]) => {
    const target = entities.find((entity) => entity.id === targetId);

    if (!target) {
      return;
    }

    plans.forEach((topicPlan, topicIndex) => {
      const topicId = `${targetId}-${topicPlan.id}`;
      const topic: ControversyTopic = {
        id: topicId,
        targetType: target.type,
        targetId,
        targetName: target.nameZh,
        category: topicPlan.category,
        title: topicPlan.title,
        summary: topicPlan.summary,
        severity: topicPlan.severity,
        factuality: topicPlan.factuality,
        sourceUrls: sourceBook[targetId] ?? topicPlan.sourceUrls,
        safePhrasingNotes: topicPlan.safePhrasingNotes,
        relatedTargets: topicPlan.relatedTargets,
      };

      topics.push(topic);

      topicPlan.attacks.forEach((attackText, attackIndex) => {
        const attackLineId = `${topicId}-attack-${attackIndex + 1}`;
        attackLines.push({
          id: attackLineId,
          attackerTargetId: "enemy-generic",
          defenderTargetId: targetId,
          controversyTopicId: topicId,
          text: attackText,
          tone: topicPlan.severity >= 4 ? "sharp" : "mild",
          tags: [topicPlan.category, ...topicPlan.requiredKnowledgeTags],
        });

        responseOptions.push(
          buildCorrectOption(attackLineId, {
            topicPlan,
            topicIndex,
            attackIndex,
          }),
          ...buildWrongOptions(attackLineId, {
            topicPlan,
            topicIndex,
            attackIndex,
          }),
        );
      });
    });
  });

  return {
    version: "0.4.1",
    updatedAt: "2026-05-26",
    entities,
    topics,
    attackLines,
    responseOptions,
  };
}

function buildCorrectOption(
  attackLineId: string,
  { topicPlan, topicIndex, attackIndex }: OptionTemplateContext,
): ResponseOption {
  const punches: Record<TopicCategory, string[]> = {
    playoff_failure: [
      "别只会翻一轮黑历史，季后赛要看完整样本；{enemy}那边真要逐轮审判，自己也经不起这么翻。",
      "你抓这一轮可以，但别装成终审判决；硬仗样本摊开看，{enemy}那边也别想全身而退。",
      "季后赛不是剪一张黑图就能判案；真要开庭，把双方每轮首锅、二锅和对手强度都摆出来。",
      "别岁月史书成只输过这一回合；系列赛账本摊开，{enemy}那边也有被打到沉默的夜晚。",
      "拿一轮失败当传家宝可以，但别碰瓷完整履历；真比季后赛，别只会拿高亮评论当证据。",
    ],
    finals_loss: [
      "总决赛输了当然扣分，但能长期站到最后一关本身就是门槛；{enemy}那边先把同级舞台次数摆上来。",
      "拿总决赛失利来压人可以，可别把进不去总决赛包装成更干净；没到考场的人别笑交卷的人错题多。",
      "总决赛黑点能聊，但进不去总决赛的人少装无瑕白玉；一个是错题多，一个是卷子都没摸几次。",
      "别把亚军说成原罪，先问{enemy}那边有没有能力稳定把球队拖到最高舞台。",
      "最高舞台输球当然难看，但拿低轮次回家的人嘲笑总决赛输家，这火力本身就带回旋镖。",
    ],
    superteam: [
      "阵容强不等于冠军自动到账；真这么简单，{enemy}那边那些纸面强队就不会一年年翻车。",
      "你可以喷组队观感，但别把规则内选择说成没本事；最后还得在场上把账结清。",
      "说抱团可以，但别双标成自己补强叫运作，别人补强叫投机；标准先统一再上嘴脸。",
      "阵容豪华是争议，不是判死刑；豪阵翻车的笑话联盟从来不缺，{enemy}那边别装没见过。",
      "冠军路径可以扣分，但不能把场上兑现一键清零；不然纸面阵容强却翻车的队更该被开会。",
    ],
    trade_drama: [
      "转会观感不好可以喷，但职业联盟不是童话书；{enemy}那边要谈忠诚，也先把自家交易账本翻干净。",
      "换队是黑点还是选择，要看后面怎么兑现；光骂路径不看结果，就是拿情绪冒充分析。",
      "离队可以被喷，但别演成只有别人做选择；真翻交易史，谁家球迷都别装道德标兵。",
      "职业联盟谈忠诚最容易回旋镖：管理层能交易人，球员换队就突然成原罪？",
      "路径争议归路径争议，场上没兑现才是真正难看；只会骂路线，说明你已经没比赛内容可打。",
    ],
    injury_what_if: [
      "伤病让样本变短是事实，但拿伤病当嘲点就太低级；讨论上限至少得把健康时的影响力算进去。",
      "如果论不能换冠军，可也别把健康问题说成能力不行；{enemy}那边先分清运气和实力。",
      "伤病不是免死金牌，也不是羞辱材料；健康样本和缺席成本分开算，才像认真聊球。",
      "如果论不能直接封神，但拿伤病开香槟也挺掉价；真要吵，就拿健康年份的对位和数据说话。",
      "出勤短板可以扣分，可别把遗憾说成菜；这类话一出口，路人都知道你没准备材料。",
    ],
    referee_controversy: [
      "裁判尺度能讨论，但别把所有回合都甩给哨子；真有统治力，就别只靠慢镜头赢论坛。",
      "你要讲尺度就逐回合讲，别一句裁判把比赛全抹掉；{enemy}那边也没少吃过尺度红利。",
      "裁判争议不是万能垃圾桶，什么失误、断电、投不进都往里倒，只会显得复盘能力为零。",
      "有争议就拿回合说话，别拿一张截图审判整轮系列赛；论坛断案不是录像中心。",
      "尺度可以喷，但别装成只有自己吃亏；哨子账本真翻起来，{enemy}那边也未必干净。",
    ],
    stat_padding: [
      "数据当然要看含金量，但别只在不喜欢的人身上查水分；{enemy}那边的数据也经得起同样拆解吗？",
      "刷不刷要看比赛语境，不是数据好就扣帽子；真要查垃圾时间和效率，大家一起上表格。",
      "别一看到好数据就喊刷，先把比分、对手、效率和回合价值拆开；不然就是印象流开会。",
      "数据不能包治百病，但也不是你不喜欢就作废；真要扣水分，{enemy}那边也一起过筛。",
      "别拿集锦当数据库，关键回合、失误、效率一起看，谁裸泳一眼就出来。",
    ],
    choking_claim: [
      "关键战拉胯能喷，但别用几场球偷换整个生涯；{enemy}那边的硬仗黑料也不是没有。",
      "你抓关键战没问题，可别只剪失败回合；真比硬仗，就把系列赛贡献和对手强度一起算。",
      "关键战开会可以，但别只会复读战犯；先分清谁首锅、谁二锅、谁是被阵容拖下水。",
      "硬仗不是只截最后两分钟，前面四十分钟谁在续命也得算；别靠短视频审判系列赛。",
      "你说拉胯可以，拿样本来；只喊战犯不列回合，攻击力看着大，其实一碰就碎。",
    ],
    legacy_debate: [
      "历史地位不是靠一句黑点打穿的；你可以扣分，但{enemy}那边也得拿同等级荣誉和样本来对账。",
      "跨时代吵架最怕双标：喜欢的人看荣誉，不喜欢的人看瑕疵；先把标准统一再开喷。",
      "历史讨论不是饭圈打榜，不能只给自家算巅峰、给别人算黑点；账本一摊，双标最先死。",
      "别用一句梗压整个履历，荣誉、巅峰、长度、硬仗都要算；{enemy}那边也别想只交选择题。",
      "想碰瓷历史地位就别拿情绪当证据；同一把尺子量下去，很多吹上天的故事也会漏风。",
    ],
    teammate_help: [
      "队友强不是原罪，历史级核心本来就要把强阵容兑现；{enemy}那边有帮手时怎么不主动扣分？",
      "别把团队篮球偷换成抱大腿；真有强队友就该出成绩，出不了成绩才更难看。",
      "队友帮助能讨论，但别把有帮手直接翻译成没能力；联盟冠军史本来就是强强合作。",
      "帮手强不丢人，强阵容不夺冠才丢人；{enemy}那边如果也吃配置红利，就别装孤胆英雄。",
      "别一到别人就是抱大腿，一到自家就是合理补强；这种双标在论坛只能骗同温层。",
    ],
    management_failure: [
      "管理层翻车确实该喷，但这更说明争冠不是喊口号；{enemy}那边要是操作更乱，就别装运营大师。",
      "建队失误可以认，可别只盯别人账本；{enemy}那边那些烂操作翻出来也够开一桌会。",
      "管理层烂账可以开会，但别把球队所有成败都甩给办公室；场上兑现和建队锅要分清。",
      "你要喷操作就列交易、薪资和选秀，别只会一句管理层有病；那叫情绪，不叫复盘。",
      "运营翻车不是免罪牌，也不是万能锅；真比建队，{enemy}那边的补强笑话也不少。",
    ],
    fan_meme: [
      "梗可以玩，但别把梗当判决书；真上强度还得回到比赛事实和系列赛结果。",
      "论坛段子能热场，不能当证据；{enemy}那边如果只剩梗，那就是没材料了。",
      "玩梗可以，别把烂梗当核武器；一问年份和回合就哑火，那叫跟风不是懂球。",
      "高亮评论不等于事实，评分区情绪也不是判决书；真要开喷，至少把材料带齐。",
      "梗图只能赢一秒，事实能赢一整楼；{enemy}那边要是只会复读，那就已经没活了。",
    ],
  };
  const punch = pickByIndex(punches[topicPlan.category], topicIndex + attackIndex);
  const closers = [
    "这话说重一点：别只会挑别人伤疤，自己阵营的烂账也没少到能装清白。",
    "真要上强度，就按同一标准互查账，别一到自家就开始岁月史书。",
    "论坛吵架最怕没材料，你这套要是只靠情绪，下一句就该被人按回数据表里。",
    "别急着扣帽子，先把比赛、年份、对手和结果说清楚；说不清就是纯嘴硬。",
  ];
  const closer = pickByIndex(closers, topicIndex * 3 + attackIndex);

  return {
    id: `${attackLineId}-option-correct`,
    attackLineId,
    text: `${topicPlan.correctFrame}。${punch}${closer}`,
    isCorrect: true,
    responseType: "rebuttal_then_counterattack",
    explanation: `有效，因为它先接住{target}这条争议，不硬洗；随后用同一标准、样本范围或{enemy}那边的可比短板完成反击，语气更硬但仍然有论据。`,
    damage: 16 + topicPlan.severity * 3 + (topicIndex % 2),
    selfDamageIfWrong: 0,
    requiredKnowledgeTags: topicPlan.requiredKnowledgeTags,
  };
}

function buildWrongOptions(
  attackLineId: string,
  context: OptionTemplateContext,
): ResponseOption[] {
  return [buildHalfRightWrongCounter(context), ...selectWrongTemplates(context)].map((template, index) => ({
    id: `${attackLineId}-option-wrong-${index + 1}`,
    attackLineId,
    text: template.text,
    isCorrect: false,
    responseType: template.responseType,
    explanation: template.explanation,
    damage: 0,
    selfDamageIfWrong: template.selfDamageIfWrong,
    requiredKnowledgeTags: template.requiredKnowledgeTags,
  }));
}

function buildHalfRightWrongCounter({
  topicPlan,
  topicIndex,
  attackIndex,
}: OptionTemplateContext): WrongOptionTemplate {
  const wrongCounters = [
    "但{enemy}那边别装了，库里防守被点名那几轮一样是提款机。",
    "但{enemy}那边也别笑，哈登关键战拉胯的素材一翻就是一整页。",
    "但{enemy}那边更没资格说，太阳抢七半场崩盘那种名场面才叫社死。",
    "但{enemy}那边先解释抱团路线，杜兰特去勇士这条路更难看。",
    "但{enemy}那边也别装硬，恩比德季后赛突破问题比这个还刺眼。",
    "但{enemy}那边先别叫，尼克斯低谷那么多年才缓过来，账本更长。",
    "但{enemy}那边也别碰瓷，湖人那次阵容适配失败够开十栋楼。",
    "但{enemy}那边更抽象，热火总决赛进攻断电不是一天两天了。",
  ];
  const wrongCounter = pickByIndex(wrongCounters, topicIndex + attackIndex);

  return {
    text: `${topicPlan.correctFrame}。${wrongCounter}`,
    responseType: "good_evidence_wrong_counter",
    explanation:
      "半对半错：前半段证据能回应当前攻击，但后半段反击对象或角度不匹配，像是把别人的黑料硬塞进来。游戏里必须同时做到证据贴题、回怼也打中对方阵营。",
    selfDamageIfWrong: 9,
    requiredKnowledgeTags: ["证据贴题", "反击匹配"],
  };
}

function selectWrongTemplates({
  topicPlan,
  topicIndex,
  attackIndex,
}: OptionTemplateContext): WrongOptionTemplate[] {
  const common: WrongOptionTemplate[] = [
    {
      text: "你懂球吗？",
      responseType: "weak_deflection",
      explanation: "无效，语气很冲但没有论据，对方只要追问细节就会露怯。",
      selfDamageIfWrong: 10,
      requiredKnowledgeTags: ["反击力度"],
    },
    {
      text: `{target}人气高，{enemy}球迷说什么都没用。`,
      responseType: "wrong_context",
      explanation: "无效，人气不能回应这次攻击里的具体事实，属于转移话题。",
      selfDamageIfWrong: 12,
      requiredKnowledgeTags: ["上下文匹配"],
    },
    {
      text: `{enemy}那边所有荣誉都靠剧本和运气。`,
      responseType: "unsupported_claim",
      explanation: "无效，而且会额外扣血。这个说法没有证据，还把讨论推向无法证明的阴谋论。",
      selfDamageIfWrong: 15,
      requiredKnowledgeTags: ["事实依据"],
    },
    {
      text: "别跟我扯数据，我只相信眼睛。",
      responseType: "unsupported_claim",
      explanation: "无效，拒绝证据会让自己丢掉事实准确度，尤其在历史争议里很容易被反打。",
      selfDamageIfWrong: 14,
      requiredKnowledgeTags: ["事实依据"],
    },
    {
      text: "反正冠军多就是一切，其他不用聊。",
      responseType: "wrong_context",
      explanation: "无效，冠军可以作为反击素材，但不能替代对当前攻击点的直接回应。",
      selfDamageIfWrong: 12,
      requiredKnowledgeTags: ["上下文匹配"],
    },
    {
      text: "别洗了，评分区都把{target}打成战犯了，这还需要解释？",
      responseType: "unsupported_claim",
      explanation: "无效，评分区情绪不能替代比赛证据，容易被对方要求列回合。",
      selfDamageIfWrong: 14,
      requiredKnowledgeTags: ["事实依据"],
    },
    {
      text: "你们这群人就是滤镜太厚，换个球衣早就喷退役了。",
      responseType: "weak_deflection",
      explanation: "无效，这句话只是在攻击球迷群体，没有回应当前篮球争议。",
      selfDamageIfWrong: 12,
      requiredKnowledgeTags: ["上下文匹配"],
    },
    {
      text: "别拿年份和数据压我，我看比赛的感觉不会错。",
      responseType: "unsupported_claim",
      explanation: "无效，感觉可以引出观点，但不能替代年份、数据和具体回合。",
      selfDamageIfWrong: 14,
      requiredKnowledgeTags: ["事实依据"],
    },
    {
      text: "{target}这事不用细聊，反正{enemy}也干过类似的。",
      responseType: "wrong_context",
      explanation: "无效，反打双标之前必须先回应当前攻击点，否则只是逃题。",
      selfDamageIfWrong: 12,
      requiredKnowledgeTags: ["同一标准"],
    },
    {
      text: "你要是真懂球，就不会问这种问题。",
      responseType: "weak_deflection",
      explanation: "无效，这是典型空话压人，不给证据也不给反击角度。",
      selfDamageIfWrong: 10,
      requiredKnowledgeTags: ["反击力度"],
    },
    {
      text: "这不是黑点，这是媒体和黑粉联合做局。",
      responseType: "unsupported_claim",
      explanation: "无效，未经证实的做局说法属于阴谋论，会让自己额外掉血。",
      selfDamageIfWrong: 16,
      requiredKnowledgeTags: ["事实依据"],
    },
    {
      text: "别管过程，最后有人背锅就完事了。",
      responseType: "wrong_context",
      explanation: "无效，甩锅不等于复盘，尤其无法说明为什么这个选项贴合当前攻击。",
      selfDamageIfWrong: 13,
      requiredKnowledgeTags: ["系列赛复盘"],
    },
    {
      text: "{enemy}球迷先把自家专区管好，再来教别人怎么聊球。",
      responseType: "weak_deflection",
      explanation: "无效，攻击球迷社区不能回应球员或球队争议。",
      selfDamageIfWrong: 12,
      requiredKnowledgeTags: ["上下文匹配"],
    },
    {
      text: "别装理中客了，这种球看一眼就知道谁菜。",
      responseType: "unsupported_claim",
      explanation: "无效，把复杂争议压成一句谁菜，没有证据也没有上下文。",
      selfDamageIfWrong: 14,
      requiredKnowledgeTags: ["事实依据"],
    },
  ];
  const categorySpecific: Record<TopicCategory, WrongOptionTemplate[]> = {
    playoff_failure: [
      {
        text: "季后赛输了也没事，常规赛好看就够了。",
        responseType: "wrong_context",
        explanation: "无效，对方攻击的是季后赛兑现，你却退到常规赛观感，正中对方下怀。",
        selfDamageIfWrong: 13,
        requiredKnowledgeTags: ["季后赛"],
      },
      {
        text: "那轮系列赛肯定是联盟不想让{target}赢。",
        responseType: "unsupported_claim",
        explanation: "无效，没有证据的联盟阴谋论只会让自己额外掉血。",
        selfDamageIfWrong: 16,
        requiredKnowledgeTags: ["事实依据"],
      },
    ],
    finals_loss: [
      {
        text: "总决赛输球不算黑点，进了总决赛就自动满分。",
        responseType: "wrong_context",
        explanation: "无效，总决赛失利当然能讨论；正确打法是承认扣分再补上下文。",
        selfDamageIfWrong: 13,
        requiredKnowledgeTags: ["总决赛"],
      },
      {
        text: "输总决赛是因为对面运气爆棚，没必要复盘。",
        responseType: "unsupported_claim",
        explanation: "无效，把比赛全推给运气没有分析含量，也挡不住对方继续追问。",
        selfDamageIfWrong: 14,
        requiredKnowledgeTags: ["系列赛复盘"],
      },
    ],
    superteam: [
      {
        text: "抱团不算事，打不过就加入才是最高境界。",
        responseType: "weak_deflection",
        explanation: "无效，这只会坐实对方对冠军路径的攻击，没有反驳含金量。",
        selfDamageIfWrong: 13,
        requiredKnowledgeTags: ["冠军路径"],
      },
      {
        text: "{enemy}那边也抱团，所以{target}这次不用解释。",
        responseType: "wrong_context",
        explanation: "无效，可以反打双标，但不能跳过当前争议本身。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["同一标准"],
      },
    ],
    trade_drama: [
      {
        text: "职业球员想走就走，球迷没资格有意见。",
        responseType: "weak_deflection",
        explanation: "无效，转会自由和球迷观感可以同时存在，不能用一句话压掉争议。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["转会争议"],
      },
      {
        text: "所有离队都是管理层活该，球员永远没问题。",
        responseType: "unsupported_claim",
        explanation: "无效，绝对化甩锅没有证据，也不能解释具体离队背景。",
        selfDamageIfWrong: 15,
        requiredKnowledgeTags: ["事实依据"],
      },
    ],
    injury_what_if: [
      {
        text: "受伤就说明不够硬，没什么好聊的。",
        responseType: "unsupported_claim",
        explanation: "无效，这种说法把健康问题粗暴等同于能力问题，既不准确也很容易被反击。",
        selfDamageIfWrong: 16,
        requiredKnowledgeTags: ["伤病语境"],
      },
      {
        text: "如果都健康，{target}早就把所有人打服了。",
        responseType: "weak_deflection",
        explanation: "无效，如果论不能直接兑换成绩，必须结合真实样本来讲。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["如果论"],
      },
    ],
    referee_controversy: [
      {
        text: "裁判就是全部原因，对手赢了也没含金量。",
        responseType: "unsupported_claim",
        explanation: "无效，裁判争议需要具体回合支持，不能一句话抹掉整场比赛。",
        selfDamageIfWrong: 16,
        requiredKnowledgeTags: ["裁判争议"],
      },
      {
        text: "只要裁判没吹，就说明每个动作都完美。",
        responseType: "wrong_context",
        explanation: "无效，没吹和没有争议不是一回事，这种回答太容易被慢镜头反打。",
        selfDamageIfWrong: 13,
        requiredKnowledgeTags: ["尺度"],
      },
    ],
    stat_padding: [
      {
        text: "数据好就是强，效率和比赛阶段都不用看。",
        responseType: "wrong_context",
        explanation: "无效，数据争议恰恰要看效率、阶段和对手强度。",
        selfDamageIfWrong: 13,
        requiredKnowledgeTags: ["数据语境"],
      },
      {
        text: "高阶数据都是骗人的，别拿表格压我。",
        responseType: "weak_deflection",
        explanation: "无效，不能因为不喜欢数据就拒绝所有证据。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["数据分析"],
      },
    ],
    choking_claim: [
      {
        text: "关键战拉胯不算，谁都有心情不好的时候。",
        responseType: "weak_deflection",
        explanation: "无效，关键战争议不能用情绪带过，必须回到系列赛样本。",
        selfDamageIfWrong: 13,
        requiredKnowledgeTags: ["关键战"],
      },
      {
        text: "{enemy}那边关键球全靠裁判帮忙。",
        responseType: "unsupported_claim",
        explanation: "无效，没有具体证据的裁判指控会让反击质量下降。",
        selfDamageIfWrong: 15,
        requiredKnowledgeTags: ["事实依据"],
      },
    ],
    legacy_debate: [
      {
        text: "历史地位不用讨论，喜欢谁谁就是第一。",
        responseType: "weak_deflection",
        explanation: "无效，这句话没有标准，也不能回应对方提出的历史黑点。",
        selfDamageIfWrong: 11,
        requiredKnowledgeTags: ["历史地位"],
      },
      {
        text: "远古或现代都不重要，反正{target}自动压死{enemy}。",
        responseType: "unsupported_claim",
        explanation: "无效，跨时代争论最需要标准，直接宣布胜利没有说服力。",
        selfDamageIfWrong: 14,
        requiredKnowledgeTags: ["跨时代比较"],
      },
    ],
    teammate_help: [
      {
        text: "队友越强越说明老大越伟大，没必要扣分。",
        responseType: "wrong_context",
        explanation: "无效，队友帮助可以解释，但不能把配置争议直接反转成加分。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["队友帮助"],
      },
      {
        text: "{enemy}那边所有冠军都是抱大腿，没一个干净。",
        responseType: "unsupported_claim",
        explanation: "无效，这种一刀切没有事实支撑，也容易被对方抓双标。",
        selfDamageIfWrong: 15,
        requiredKnowledgeTags: ["事实依据"],
      },
    ],
    management_failure: [
      {
        text: "管理层烂和球队没关系，球迷不用背锅。",
        responseType: "wrong_context",
        explanation: "无效，对方攻击的是球队建队和竞争力，不是让球迷承担责任。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["建队逻辑"],
      },
      {
        text: "老板和管理层都不懂球，反正球迷最懂。",
        responseType: "weak_deflection",
        explanation: "无效，吐槽管理层可以，但这句话没有具体操作案例。",
        selfDamageIfWrong: 11,
        requiredKnowledgeTags: ["管理层"],
      },
    ],
    fan_meme: [
      {
        text: "梗火就说明是真的，不需要再查比赛。",
        responseType: "unsupported_claim",
        explanation: "无效，球迷梗可以增强语气，但不能替代事实来源。",
        selfDamageIfWrong: 14,
        requiredKnowledgeTags: ["球迷梗"],
      },
      {
        text: "别讲事实了，论坛都这么说。",
        responseType: "weak_deflection",
        explanation: "无效，论坛共识不是证据，容易被对方用真实数据反打。",
        selfDamageIfWrong: 12,
        requiredKnowledgeTags: ["事实依据"],
      },
    ],
  };
  const pool = [
    ...categorySpecific[topicPlan.category],
    ...common,
  ];
  const start = (topicIndex * 2 + attackIndex) % pool.length;

  return [0, 1, 2, 3].map((offset) => pool[(start + offset) % pool.length]);
}

function pickByIndex<T>(items: T[], index: number): T {
  return items[index % items.length];
}

export const defaultDataset = buildDataset();
