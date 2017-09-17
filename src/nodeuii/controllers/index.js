import Router from 'koa-router';
const router = new Router();

// 首页
router.get('/', async (ctx, next)=>{
    ctx.status = 200;
    ctx.body = 'hello hahahahahah';
});

export default router;
