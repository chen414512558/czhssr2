'use strict';
// 引用koa

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _default = require('./configs/default');

var _default2 = _interopRequireDefault(_default);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _koaErrorhandler = require('koa-errorhandler');

var _koaErrorhandler2 = _interopRequireDefault(_koaErrorhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import logger from './middleware/koa-log4js';
// import log4js from 'log4js';
// const cheseLog = require('./logs');
const app = new _koa2.default();
// import serve from 'koa-static';

// const logger = require('koa-logger')


app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _default2.default.viewsConf,
    autoescape: true,
    cache: false,
    ext: 'html'
}));
// 错误
app.use((0, _koaErrorhandler2.default)());
// app.use(logger(configs.log, log4js));
// 设置静态文件
// app.use(serve(configs.assetsConf));
// 设置路由
app.use(_controllers2.default.routes());

app.listen(_default2.default.port);
// module.exports = app;