# Fan Banter Trainer 项目规则

- 项目是可部署到 GitHub Pages 的纯静态 React + TypeScript + Vite 游戏，不依赖服务端数据库。
- 首版界面与题库文案使用简体中文，玩法围绕 NBA 球迷事实吐槽训练。
- 题库采用结构化数据模型：`entities` 保存球队/球星，`topics` 保存争议主题，`attackLines` 保存敌方先手话术，`responseOptions` 保存回复选项与解释。
- 管理员维护方式为浏览器内导入/编辑/导出 JSON，数据暂存在 localStorage；导出的 JSON 需要提交回仓库才会成为正式题库。
- 内容边界：以公开篮球事实、比赛表现、季后赛失利、转会争议、伤病争议、判罚争议、荣誉比较、球迷 meme 等吐槽为主；可以使用公开且可来源化的场外争议素材，但避免人身威胁、仇恨言论、人肉信息、无来源严重指控和不可验证的私生活传闻。
- 移动端是核心使用场景；修改 UI 后需要检查小屏布局，避免横向滚动、按钮文字溢出和选项不可点击。
- 游戏回复选项按钮应显示简短、像真实对喷会说出口的句子；训练说明、有效性分析和上下文解释放在选择后的 `explanation` 中。
- 常用命令：`npm install`、`npm run dev`、`npm test`、`npm run build`、`npm run preview`。
- GitHub 仓库：`https://github.com/YrianZhao/Fan_Banter_Trainer`。
- 线上地址：`https://yrianzhao.github.io/Fan_Banter_Trainer/`。
- 部署方式：GitHub Pages 使用 `.github/workflows/deploy-pages.yml` 的 Actions workflow，推送到 `main` 后构建 `dist` 并发布。
