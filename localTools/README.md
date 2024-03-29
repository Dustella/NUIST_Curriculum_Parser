# 南信大新教务系统 - 小爱同学课程表导入适配

## 官方文档存档

由于学校更新教务系统频繁，有能力的欢迎 fork 并提交新的适配

[语雀](https://open-schedule-prod.ai.xiaomi.com/docs/#/help/?id=aischeduletools)

[WebArchive](https://web.archive.org/web/20240228035003/https://open-schedule-prod.ai.xiaomi.com/docs/#/help/?id=aischeduletools)

## 小爱课程表开发者工具本地调试工具

[x] 使用 WebSocket 将 NodeWatch 监听到的文件变动发送到开发者工具
[x] Parser 本地调试环境，完全模拟服务器处理环境

### 使用说明

首先修改`config.ini`，根据注释修改为自己对应的文件，保存间隔最好还是不要低于 300，通信和处理信息都需要时间

lock 文件是使用了淘宝镜像源的，可以直接`npm i`

随后就可以运行脚本`npm run start`

此时打开开发者工具，进入`版本详情`Tab，如果代码编写右边出现绿色链接标志，则表明链接成功

修改你在`config.ini`配置的代码文件，则会自动同步到代码框中

> 注意：不要在输入框弹出的时候使用，是不生效的

本工具还附带了模拟服务器环境运行 parser 的功能，在进行本地测试时会自动调用

如需 debug 需要自行关注命令行输出
