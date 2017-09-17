# czh-ssr
main
npm run build 编译项目
npm run start 启动项目
npm run test 测试

问题:
    ?多端怎么同步->app端也会使用网页


前后端分离  开发层次->webapp node uii      项目层次 build java

企业最重视:
    工程化
    自动化测试/性能提升

为什么用node:
    切接口->减少数据
    前端自由了->做spa(主要给移动站点使用)
    上线自由
    node优点  多并发(适合游戏和直播平台)  同样的并发(在这种环境下)会比java大大的省内存   但是搞不好就很惨

samba服务器可以建一个远程连接的   (可以往上面穿文件)
ssh免加密服务:

lsof -i tcp:8081   修改端口



yarn add 上线需要的不加dev

上线的时候把package.json 放到build
babel-polyfill 兼容老代码
lock: 当删除了一个包之后  如果你代码需要继续使用它会从你的缓存里面读到不会因为你删除之后就代码不能用

cross-spawn
跨平台的命令获取器

prepack(先执行一遍你的代码，把没用的东西给你删掉)  rollup
transform-runtime: 运行时  提取公共的项目
jenkins: 前端持续集成
f2etest-> 代码录像
本地开发-> 提交 -> 同步给老爷爷jenkins -> test e2e -> 没有出错的话  执行编译 -> prod