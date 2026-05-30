import { buildMemoryDeck, claimSeed, seed } from "./memoryDeckFactory";
import type { MemoryCard, MemorySeed, MemoryTeamId } from "./memoryDeckTypes";

interface GeneratedTeamConfig {
  id: MemoryTeamId;
  nameZh: string;
  shortLabel: string;
  color: string;
  sourceSlug: string;
  painPoints: string[];
  rivalryTargets: string[];
  scandalHooks: string[];
}

export interface GeneratedMemoryTeam {
  id: MemoryTeamId;
  nameZh: string;
  shortLabel: string;
  color: string;
  deck: MemoryCard[];
  status: "deep";
  sourceNotes: string[];
}

const teamConfigs: GeneratedTeamConfig[] = [
  config("team-hawks", "老鹰", "老鹰", "#e03a3e", "ATL", ["东决上限", "长期不上不下", "特雷杨时代防守争议", "选秀与建队摇摆"], ["凯尔特人", "热火", "尼克斯"], ["管理层换帅", "球市声量低", "季后赛硬仗不足"]),
  config("team-nets", "篮网", "篮网", "#111111", "BRK", ["三巨头解体", "篮网交易送温暖", "季后赛兑现差", "伤病如果论"], ["凯尔特人", "雄鹿", "尼克斯"], ["欧文缺阵风波", "哈登离队", "杜兰特交易申请"]),
  config("team-hornets", "黄蜂", "黄蜂", "#1d1160", "CHA", ["长期季后赛荒", "选秀兑现差", "乔丹老板时代争议", "防守和球队文化弱"], ["热火", "魔术", "老鹰"], ["管理层低效", "年轻核心伤病", "市场存在感低"]),
  config("team-bulls", "公牛", "公牛", "#ce1141", "CHI", ["乔丹后长期断档", "罗斯伤病如果论", "管理层保守", "重建反复"], ["活塞", "尼克斯", "凯尔特人"], ["总经理争议", "核心健康问题", "季后赛缺席"]),
  config("team-cavaliers", "骑士", "骑士", "#860038", "CLE", ["詹姆斯离队断崖", "2018 后重建", "小球市吸引力", "季后赛上限"], ["勇士", "凯尔特人", "公牛"], ["老板公开信", "阵容围绕巨星", "伤病借口"]),
  config("team-mavericks", "独行侠", "独行侠", "#00538c", "DAL", ["2011 后长期没再夺冠", "东契奇帮手争议", "布伦森流失", "防守建队摇摆"], ["热火", "太阳", "快船"], ["库班管理风格", "交易豪赌", "球队文化调查争议"]),
  config("team-nuggets", "掘金", "掘金", "#0e2240", "DEN", ["约基奇前队史冠军荒", "小市场曝光低", "穆雷伤病如果论", "防守质疑"], ["湖人", "森林狼", "太阳"], ["高原主场争议", "季后赛低谷", "夺冠路径争议"]),
  config("team-pistons", "活塞", "活塞", "#c8102e", "DET", ["长期摆烂", "选秀失败", "坏孩子军团脏名声", "现代竞争力低"], ["公牛", "凯尔特人", "湖人"], ["管理层混乱", "连败纪录", "球场动作名声"]),
  config("team-warriors", "勇士", "勇士", "#1d428a", "GSW", ["73 胜总决赛 3-1 被翻", "杜兰特加盟 73 胜球队", "格林动作和队内拳击", "怀斯曼榜眼争议"], ["骑士", "湖人", "火箭"], ["格林禁赛", "普尔拳击", "移动掩护梗"]),
  config("team-rockets", "火箭", "火箭", "#ce1141", "HOU", ["哈登季后赛争议", "27 连铁", "姚麦伤病如果论", "重建摆烂"], ["勇士", "爵士", "湖人"], ["魔球极端化", "保罗伤病", "老板省钱争议"]),
  config("team-pacers", "步行者", "步行者", "#002d62", "IND", ["从未拿 NBA 总冠军", "奥本山宫殿后遗症", "小市场上限", "东决门槛"], ["尼克斯", "活塞", "热火"], ["球员冲突", "明星流失", "进攻强防守弱"]),
  config("team-clippers", "快船", "快船", "#c8102e", "LAC", ["无西决传统直到近年", "空接之城失败", "3-1 被翻盘", "伦纳德出勤"], ["湖人", "勇士", "独行侠"], ["老板丑闻历史", "季后赛崩盘", "巨星健康管理"]),
  config("team-lakers", "湖人", "湖人", "#552583", "LAL", ["F4 豪阵失败", "OK 组合内讧", "威少交易适配灾难", "园区冠军打折梗"], ["凯尔特人", "勇士", "掘金"], ["Kermit Washington 拳击事件", "豪门哨子梗", "科比后期乐透低谷"]),
  config("team-grizzlies", "灰熊", "灰熊", "#5d76a9", "MEM", ["黑白双熊无冠", "莫兰特场外争议", "小市场上限", "伤病潮"], ["勇士", "湖人", "快船"], ["年轻球队嘴硬", "纪律问题", "季后赛经验不足"]),
  config("team-heat", "热火", "热火", "#98002e", "MIA", ["抱团争议", "2020 园区路径", "落选秀文化被质疑", "总决赛失利多"], ["凯尔特人", "尼克斯", "独行侠"], ["莱利强硬管理", "伤病借口", "阵容天赋不足"]),
  config("team-bucks", "雄鹿", "雄鹿", "#00471b", "MIL", ["字母垫脚争议", "小市场补强难", "2021 后未再突破", "教练更换频繁"], ["凯尔特人", "篮网", "热火"], ["季后赛伤病互喷", "半场进攻短板", "利拉德交易适配"]),
  config("team-timberwolves", "森林狼", "森林狼", "#0c2340", "MIN", ["加内特后长期烂队", "巴特勒训练赛风波", "唐斯季后赛质疑", "戈贝尔交易代价"], ["掘金", "灰熊", "独行侠"], ["管理层豪赌", "状元兑现压力", "内线双塔适配"]),
  config("team-pelicans", "鹈鹕", "鹈鹕", "#0c2340", "NOP", ["锡安出勤争议", "浓眉离队", "小市场吸引力", "季后赛缺席"], ["湖人", "灰熊", "太阳"], ["伤病管理", "体重话题", "核心续约压力"]),
  config("team-knicks", "尼克斯", "尼克斯", "#006bb6", "NYK", ["多兰老板争议", "长期烂队", "巨星招募失败", "季后赛成绩断档"], ["凯尔特人", "步行者", "热火"], ["媒体压力", "交易乱象", "主场嘘声"]),
  config("team-thunder", "雷霆", "雷霆", "#007ac1", "OKC", ["三少解体", "杜兰特离队", "哈登交易", "年轻队季后赛经验"], ["勇士", "火箭", "灰熊"], ["资产囤积", "小市场续约压力", "重建摆烂"]),
  config("team-magic", "魔术", "魔术", "#0077c0", "ORL", ["奥尼尔离队", "霍华德离队", "长期重建", "后卫/锋线培养反复"], ["热火", "湖人", "凯尔特人"], ["巨星留不住", "进攻便秘", "管理层摇摆"]),
  config("team-76ers", "76人", "76人", "#006bb6", "PHI", ["相信过程摆烂", "恩比德季后赛争议", "西蒙斯崩盘", "哈登闹剧"], ["凯尔特人", "猛龙", "篮网"], ["管理层宫斗", "伤病借口", "抢七低谷"]),
  config("team-suns", "太阳", "太阳", "#1d1160", "PHO", ["无冠历史", "2021 总决赛被翻", "2022 抢七惨败", "三巨头防守和深度"], ["独行侠", "湖人", "马刺"], ["老板丑闻历史", "保罗伤病", "杜兰特交易豪赌"]),
  config("team-trail-blazers", "开拓者", "开拓者", "#e03a3e", "POR", ["奥登伤病", "罗伊伤病", "利拉德时代上限", "长期西部陪跑"], ["湖人", "勇士", "掘金"], ["选秀遗憾", "核心离队", "防守短板"]),
  config("team-kings", "国王", "国王", "#5a2d81", "SAC", ["长期季后赛荒", "2002 西决判罚争议", "管理层混乱", "考辛斯时代失控"], ["湖人", "勇士", "快船"], ["选秀错过东契奇", "小市场上限", "防守短板"]),
  config("team-spurs", "马刺", "马刺", "#c4ced4", "SAS", ["伦纳德离队争议", "邓肯后低谷", "摆烂拿状元争议", "体系依赖"], ["湖人", "太阳", "独行侠"], ["伤病沟通", "老派进攻", "小市场吸引力"]),
  config("team-raptors", "猛龙", "猛龙", "#ce1141", "TOR", ["卡特离队", "德罗赞交易冷血", "2019 一冠后拆队", "詹姆斯阴影"], ["76人", "凯尔特人", "骑士"], ["北境吸引力", "季后赛被横扫", "伤病路径争议"]),
  config("team-jazz", "爵士", "爵士", "#002b5c", "UTA", ["斯托克顿马龙无冠", "戈贝尔米切尔内讧", "季后赛上限", "小市场补强难"], ["火箭", "公牛", "掘金"], ["球迷文化争议", "防守体系被点名", "重建摆烂"]),
  config("team-wizards", "奇才", "奇才", "#002b5c", "WAS", ["长期烂队", "沃尔比尔合同争议", "乔丹复出战绩普通", "管理层反复"], ["凯尔特人", "骑士", "公牛"], ["枪支更衣室旧闻", "超级顶薪包袱", "选秀培养差"]),
];

const extraSourceUrls = [
  "https://www.basketball-reference.com/leagues/NBA_2025.html",
  "https://www.nba.com/news",
  "https://www.espn.com/nba/",
];

export const generatedMemoryTeams: GeneratedMemoryTeam[] = teamConfigs.map((team) => ({
  id: team.id,
  nameZh: team.nameZh,
  shortLabel: team.shortLabel,
  color: team.color,
  deck: buildMemoryDeck(team.id, team.nameZh, buildGeneratedSeeds(team)),
  status: "deep",
  sourceNotes: [
    `${team.nameZh}深度包由球队痛点配置生成，覆盖历史低谷、季后赛失利、管理层争议、宿敌互喷和论坛梗。`,
    `基础事实源使用 Basketball Reference 球队页、Wikipedia 球队赛季页和 NBA 官方球队页，后续可继续替换为逐事件深度来源。`,
  ],
}));

function config(
  id: MemoryTeamId,
  nameZh: string,
  shortLabel: string,
  color: string,
  sourceSlug: string,
  painPoints: string[],
  rivalryTargets: string[],
  scandalHooks: string[],
): GeneratedTeamConfig {
  return { id, nameZh, shortLabel, color, sourceSlug, painPoints, rivalryTargets, scandalHooks };
}

function buildGeneratedSeeds(team: GeneratedTeamConfig): MemorySeed[] {
  const sourceUrls = [
    `https://www.basketball-reference.com/teams/${team.sourceSlug}/`,
    `https://en.wikipedia.org/wiki/${encodeURIComponent(team.nameZh === "76人" ? "Philadelphia 76ers" : team.nameZh)}`,
    "https://www.nba.com/teams",
  ];

  const painSeeds = team.painPoints.flatMap((point, index) => [
    seed(
      `${team.id}-pain-${index + 1}-core`,
      index % 2 === 0 ? "legacy_debate" : "management",
      "通用",
      `${point} 核心痛点`,
      `${team.nameZh}长期被对手球迷围绕“${point}”开会，这是该队互喷语境里的高频攻击点。`,
      `${team.shortLabel}球迷别只挑高光讲，${point}这页黑账对面一翻就能压住场子。`,
      sourceUrls,
      "这是球队长期舆论痛点概括，具体年份和细节后续应继续补来源。",
      index >= 2 ? 3 : 4,
    ),
    seed(
      `${team.id}-pain-${index + 1}-rebuttal`,
      "fan_meme",
      "论坛",
      `${point} 论坛梗`,
      `论坛常把${team.nameZh}的“${point}”压缩成一句攻击梗，用来反击该队球迷的历史地位或竞争力叙事。`,
      `别急着吹${team.shortLabel}，${point}这个梗一出来，楼里风向马上变。`,
      sourceUrls,
      "论坛梗需要结合具体上下文使用，不得扩写为无来源严重指控。",
      3,
    ),
  ]);

  const rivalrySeeds = team.rivalryTargets.map((target, index) =>
    seed(
      `${team.id}-rivalry-${index + 1}`,
      "rivalry",
      "通用",
      `对 ${target} 的宿敌互喷`,
      `${team.nameZh}与${target}相关的互喷，常围绕季后赛输赢、球星对位、判罚争议和冠军含金量展开。`,
      `碰到${target}球迷，${team.shortLabel}这边别只会喊口号，先准备好季后赛旧账和对位痛点。`,
      sourceUrls,
      3,
    ),
  );

  const eraSeeds = [
    seed(`${team.id}-early-low`, "playoff_loss", "早期", "早期队史低谷", `${team.nameZh}队史并非每个阶段都有稳定竞争力，早期或迁移阶段常有季后赛缺席和战绩低谷。`, `${team.shortLabel}不是每年都有资格谈豪门，早期低谷翻出来也够打脸。`, sourceUrls, 2),
    seed(`${team.id}-modern-low`, "playoff_loss", "现代", "现代重建低谷", `${team.nameZh}在现代 NBA 也经历过重建、伤病、核心离队或阵容断档。`, `别把${team.shortLabel}说成永远有竞争力，现代低谷一样能被对面开会。`, sourceUrls, 3),
    seed(`${team.id}-front-office`, "management", "通用", "管理层操作争议", `${team.nameZh}的管理层操作常被球迷拿来讨论，包括选秀、交易、续约和换帅。`, `${team.shortLabel}球迷喷别人管理层前，自己这些选秀交易黑历史先别跳过。`, sourceUrls, 3),
    seed(`${team.id}-injury-excuse`, "injury_what_if", "通用", "伤病如果论", `${team.nameZh}的不少赛季会被球迷用伤病解释失败，但对手通常会把这视为如果论。`, `伤病能解释背景，不能直接把${team.shortLabel}输掉的系列赛改判成赢。`, sourceUrls, "讨论公开伤病影响，不嘲笑伤病。", 3),
    seed(`${team.id}-star-help`, "teammate_help", "通用", "球星帮手争议", `${team.nameZh}球星的帮手质量、阵容深度和关键战支援，常被用来评价球队上限。`, `别只吹老大多强，${team.shortLabel}帮手和阵容短板一摊开，争冠叙事就没那么顺。`, sourceUrls, 3),
    seed(`${team.id}-coach-blame`, "management", "通用", "教练背锅争议", `${team.nameZh}失败赛季里，教练临场、轮换和战术经常被拿来背锅。`, `输球就甩锅教练太方便，${team.shortLabel}阵容问题和核心短板也得一起算。`, sourceUrls, 2),
    seed(`${team.id}-fan-culture`, "fan_controversy", "通用", "球迷文化争议", `${team.nameZh}球迷的护短、贷款冠军、裁判抱怨或历史滤镜，是论坛互喷常见材料。`, `${team.shortLabel}球迷别一边贷款一边破防，对面抓的就是你们这套饭圈滤镜。`, sourceUrls, "讨论球迷文化，不使用地域、种族、性别等歧视表达。", 3),
    seed(`${team.id}-dirty-label`, "dirty_play", "通用", "强硬与脏动作标签", `${team.nameZh}部分时期会被对手球迷贴上动作大、尺度占便宜或防守脏的标签。`, `强硬可以吹，但${team.shortLabel}被喷动作大也不是凭空冒出来的论坛风向。`, sourceUrls, "只使用尺度争议措辞，不编造具体恶意伤人指控。", 3),
    seed(`${team.id}-finals-pressure`, "finals_loss", "通用", "总决赛或冲冠压力", `${team.nameZh}一旦进入争冠叙事，总决赛失败、冲冠窗口浪费或无冠压力都会被放大。`, `吹争冠可以，${team.shortLabel}先把窗口浪费和总决赛压力这本账算明白。`, sourceUrls, 3),
    seed(`${team.id}-legacy-discount`, "legacy_debate", "通用", "荣誉含金量打折", `${team.nameZh}的冠军、分区冠军或高胜场赛季，常被对手用路径、伤病、时代和对手强度打折。`, `${team.shortLabel}荣誉不是不能吹，但含金量一被拆，对喷就没那么舒服了。`, sourceUrls, 3),
  ];

  const scandalSeeds = team.scandalHooks.map((hook, index) =>
    seed(
      `${team.id}-hook-${index + 1}`,
      index === 0 ? "player_conduct" : "management",
      "通用",
      `${hook} 争议`,
      `${team.nameZh}相关的“${hook}”常被对手球迷当作公开争议或舆论痛点使用。`,
      `${hook}这事一摆出来，${team.shortLabel}球迷再想装队史干净就没那么容易。`,
      sourceUrls,
      "这是公开舆论争议概括；涉及场外严重指控时必须补具体可靠来源后再细化。",
      4,
    ),
  );

  const claimSeeds = [
    claimSeed(`${team.id}-forum-whistle`, "论坛", "裁判照顾梗", `论坛常用“裁判照顾”攻击${team.nameZh}，但通常需要具体比赛判罚支撑。`, `别只喊黑哨，真要喷${team.shortLabel}就拿具体回合和系列赛说话。`, 2),
    claimSeed(`${team.id}-forum-fake-tough`, "论坛", "嘴硬没成绩梗", `论坛常把${team.nameZh}球迷的高预期和现实成绩落差做成梗。`, `${team.shortLabel}球迷嘴越硬，对面翻战绩时越疼。`, 2),
    claimSeed(`${team.id}-forum-injury-excuse`, "论坛", "伤病借口梗", `对手球迷常把${team.nameZh}的伤病解释说成借口。`, `伤病年年有，${team.shortLabel}不能每次输球都靠如果论续命。`, 3),
    claimSeed(`${team.id}-forum-media-hype`, "论坛", "媒体吹过头梗", `当${team.nameZh}受到媒体关注时，对手常攻击其被过度吹捧。`, `媒体把${team.shortLabel}吹热了，不代表季后赛账本也能自动好看。`, 2),
    claimSeed(`${team.id}-forum-trade-machine`, "论坛", "交易幻想梗", `论坛常吐槽${team.nameZh}球迷喜欢幻想打包边角料换明星。`, `${team.shortLabel}球迷别天天拿破铜烂铁换全明星，别人不是来做慈善的。`, 2),
  ];

  const categoryDepthSeeds = [
    seed(`${team.id}-depth-playoff-game7`, "playoff_loss", "通用", "抢七和关键战痛点", `${team.nameZh}的关键战表现会被对手球迷反复拿来审判，尤其是抢七、附加赛和被淘汰战。`, `关键战别只剪高光，${team.shortLabel}那些出局夜才是对喷最疼的材料。`, sourceUrls, 3),
    seed(`${team.id}-depth-playoff-upset`, "playoff_loss", "通用", "被下克上或爆冷风险", `${team.nameZh}一旦作为高预期球队输给低顺位或更弱纸面的对手，论坛会直接把它定义成爆冷黑料。`, `${team.shortLabel}别老说纸面强，真到季后赛被下克上，纸面就是笑话。`, sourceUrls, 3),
    seed(`${team.id}-depth-finals-window`, "finals_loss", "通用", "冲冠窗口浪费", `${team.nameZh}的争冠窗口如果没有兑现冠军，会被对手包装成窗口浪费。`, `窗口开了没拿到就是硬伤，${team.shortLabel}球迷别拿“差一点”当冠军游行。`, sourceUrls, 3),
    seed(`${team.id}-depth-finals-discount`, "finals_loss", "通用", "总决赛表现打折", `${team.nameZh}的总决赛或准总决赛表现会被用来质疑队史含金量和核心成色。`, `真到最高舞台才露底，${team.shortLabel}这些总决赛账本不是一句尊重能抹掉。`, sourceUrls, 3),
    seed(`${team.id}-depth-roster-fit`, "management", "通用", "阵容适配失败", `${team.nameZh}的失败赛季常能追到阵容结构问题，比如空间、防守、持球分配和替补深度。`, `${team.shortLabel}别把名气当阵容，适配一塌糊涂时，全明星也能打成堵车。`, sourceUrls, 3),
    seed(`${team.id}-depth-contract-risk`, "management", "通用", "合同包袱争议", `${team.nameZh}的大合同、提前续约和交易代价，经常被论坛拿来质疑管理层判断。`, `合同一签错，${team.shortLabel}后面几年都得给管理层交学费。`, sourceUrls, 3),
    seed(`${team.id}-depth-draft-miss`, "management", "通用", "选秀错失争议", `${team.nameZh}队史存在被球迷复盘的选秀选择和培养遗憾。`, `选秀夜一念之差，${team.shortLabel}可能直接错过一个时代，这种黑料最适合翻旧账。`, sourceUrls, 3),
    seed(`${team.id}-depth-star-exit`, "teammate_help", "通用", "核心离队或帮手流失", `${team.nameZh}如果留不住核心或关键帮手，会被质疑球队吸引力、管理层和争冠诚意。`, `人一走就说不合适，${team.shortLabel}怎么不先问自己为什么留不住？`, sourceUrls, 3),
    seed(`${team.id}-depth-locker-room`, "teammate_help", "通用", "更衣室化学反应", `${team.nameZh}失败赛季里的更衣室、球权和领袖秩序，常被包装成化学反应问题。`, `${team.shortLabel}纸面阵容再亮，更衣室一乱就全是素材。`, sourceUrls, "只讨论公开篮球职业争议，不扩写私人传闻。", 3),
    seed(`${team.id}-depth-star-playoff`, "legacy_debate", "通用", "当家球星季后赛成色", `${team.nameZh}当家球星的季后赛效率、关键回合选择和带队上限，是球迷互喷核心材料。`, `常规赛能吹，季后赛才结账，${team.shortLabel}老大这笔账别逃。`, sourceUrls, 4),
    seed(`${team.id}-depth-ring-context`, "legacy_debate", "通用", "冠军或荣誉上下文", `${team.nameZh}的荣誉会被对手从对手伤病、路径、时代、阵容强度等角度重新估价。`, `荣誉不是不能数，但${team.shortLabel}别怕别人问路径和对手成色。`, sourceUrls, 3),
    seed(`${team.id}-depth-media-narrative`, "fan_controversy", "通用", "媒体叙事保护", `${team.nameZh}在高关注赛季会被质疑受到媒体叙事保护或过度包装。`, `媒体滤镜一厚，${team.shortLabel}输球时反噬就更狠。`, sourceUrls, 2),
    seed(`${team.id}-depth-online-fanbase`, "fan_controversy", "通用", "球迷贷款与护短", `${team.nameZh}球迷在论坛里的贷款冠军、护短和双标，会被对手集中攻击。`, `${team.shortLabel}球迷别一边贷款一边装理性，对面最爱打的就是双标。`, sourceUrls, "讨论球迷行为，不使用群体歧视。", 2),
    seed(`${team.id}-depth-referee-series`, "fan_meme", "论坛", "判罚系列赛梗", `${team.nameZh}相关系列赛常被论坛简化成哨子、罚球或尺度梗。`, `哨子梗虽然粗暴，但${team.shortLabel}每次占到便宜，对面都会截图开喷。`, sourceUrls, "论坛梗需要具体判罚支撑，不得直接等同暗箱操作。", 2),
    seed(`${team.id}-depth-toxic-option-trap`, "fan_meme", "论坛", "低质量狠话陷阱", `攻击${team.nameZh}时只会骂街但没有事实，会在训练里被视为低质量话术。`, `光吼${team.shortLabel}垃圾没用，拿不出旧账就是给对面送节奏。`, sourceUrls, "训练玩家避免无证据辱骂。", 1),
    seed(`${team.id}-depth-regular-season-fraud`, "legacy_debate", "通用", "常规赛强队季后赛打折", `${team.nameZh}如果常规赛声势很强但季后赛未兑现，会被论坛打成常规赛球队。`, `常规赛赢麻了不等于季后赛结账，${team.shortLabel}一出局就全是回旋镖。`, [...sourceUrls, ...extraSourceUrls], 3),
    seed(`${team.id}-depth-bench-depth`, "management", "通用", "替补深度短板", `${team.nameZh}的替补深度、轮换稳定性和第二阵容火力，是失败赛季常见复盘点。`, `主力能打不代表阵容厚，${team.shortLabel}替补一露怯，对面马上开会。`, [...sourceUrls, ...extraSourceUrls], 2),
    seed(`${team.id}-depth-defense-target`, "dirty_play", "通用", "防守被点名或尺度争议", `${team.nameZh}在季后赛会被对手针对防守弱点，也可能因身体尺度被贴标签。`, `${team.shortLabel}防守一被点名，所谓体系马上变成对手提款机。`, [...sourceUrls, ...extraSourceUrls], "只讨论公开比赛对位和尺度争议，不编造恶意伤人。", 3),
    seed(`${team.id}-depth-clutch-offense`, "playoff_loss", "通用", "关键时刻进攻断电", `${team.nameZh}在关键时刻的半场进攻、失误和投篮选择，是对喷里最容易被压缩成黑料的内容。`, `最后五分钟不会打，${team.shortLabel}前面领先多少都能被喷成虚胖。`, [...sourceUrls, ...extraSourceUrls], 3),
    seed(`${team.id}-depth-star-health`, "injury_what_if", "通用", "核心健康变量", `${team.nameZh}核心球员出勤和健康状态，经常决定球队上限，也会成为对手质疑稳定性的材料。`, `核心老是要看健康抽奖，${team.shortLabel}争冠叙事就别说得太稳。`, [...sourceUrls, ...extraSourceUrls], "讨论公开出勤和伤病影响，不嘲笑伤病。", 3),
    seed(`${team.id}-depth-rival-receipts`, "rivalry", "通用", "宿敌旧账本", `${team.nameZh}面对宿敌时，历史交锋、系列赛翻车和球星对位都会被做成旧账本。`, `宿敌一来就翻旧账，${team.shortLabel}球迷没准备材料就只能挨打。`, [...sourceUrls, ...extraSourceUrls], 3),
    seed(`${team.id}-depth-front-runner`, "fan_meme", "论坛", "顺风球迷梗", `论坛常攻击${team.nameZh}球迷顺风输出、逆风消失。`, `${team.shortLabel}赢球满屏输出，输球集体潜水，这梗太好用了。`, [...sourceUrls, ...extraSourceUrls], "论坛梗只描述球迷行为，不做群体歧视。", 2),
    seed(`${team.id}-depth-trade-rumor-noise`, "management", "通用", "交易流言噪音", `${team.nameZh}围绕核心补强和交易流言的舆论噪音，常被对手球迷嘲成管理层没方向。`, `年年交易流言飞起，${team.shortLabel}真到补强时又总差一口气。`, [...sourceUrls, ...extraSourceUrls], 2),
    seed(`${team.id}-depth-ownership-pressure`, "management", "通用", "老板和管理压力", `${team.nameZh}老板投入、管理层耐心和市场压力，会影响球队长期路线。`, `别什么都甩给球员，${team.shortLabel}上面那套决策也没少制造黑料。`, [...sourceUrls, ...extraSourceUrls], 2),
    seed(`${team.id}-depth-social-media-meme`, "fan_meme", "论坛", "社媒热梗反噬", `${team.nameZh}一旦被社媒做成热梗，单场拉胯、球员表情和赛后发言都会被反复二创。`, `${team.shortLabel}最怕的不是输一场，是输完还被做成全网模板。`, [...sourceUrls, ...extraSourceUrls], "社媒梗不扩写为私人攻击。", 2),
  ];

  return [
    ...painSeeds,
    ...rivalrySeeds,
    ...eraSeeds,
    ...scandalSeeds,
    ...claimSeeds,
    ...categoryDepthSeeds,
  ];
}
