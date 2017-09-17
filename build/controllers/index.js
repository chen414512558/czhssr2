'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

// 首页
router.get('/', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'hello hahahahahah';
});

exports.default = router;