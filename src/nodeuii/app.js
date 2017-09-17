'use strict';
// 引用koa
import Koa from 'koa';

import render from 'koa-swig';
import configs from'./configs/default';
// const logger = require('koa-logger')
import co from 'co';
import router from './controllers';
// import serve from 'koa-static';
import errorhandler from 'koa-errorhandler';
// import logger from './middleware/koa-log4js';
// import log4js from 'log4js';
// const cheseLog = require('./logs');
const app = new Koa();

app.context.render = co.wrap(render({
    root: configs.viewsConf,
    autoescape: true,
    cache: false,
    ext: 'html',
}));
// 错误
app.use(errorhandler());
// app.use(logger(configs.log, log4js));
// 设置静态文件
// app.use(serve(configs.assetsConf));
// 设置路由
app.use(router.routes());



app.listen(configs.port);
// module.exports = app;