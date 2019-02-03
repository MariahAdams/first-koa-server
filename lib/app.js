const koa = require('koa');
const koaRouter = require('koa-router');

const app = new koa();
const router = koaRouter();

app.use(async(ctx, next) => {
  try {
    await next();
  } 
  catch(err) {
    console.log(err.status);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.get('test', '/error', (ctx) => {
  ctx.throw(500, `An error occurred at ${ctx.url}`); /* numeric arg must be passed first */
});

router.get('koala', '/', (ctx) => {
  ctx.body = 'Welcome! To the Koala Book of Everything!';
});

app.use(router.routes())
  .use(router.allowedMethods());

if(!module.parent) {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server jammin on ${PORT}`);
  });
} else {
  module.exports = app;
}