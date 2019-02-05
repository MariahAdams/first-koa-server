const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');

const app = new koa();
const router = koaRouter();

app.use(koaBody({
  jsonLimit: '1kb'
}));

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

router.post('body parser', '/uppercase', async(ctx) => {
  const body = ctx.request.body;
  if(!body.name) ctx.throw(400, '.name is required');
  ctx.body = { name: body.name.toUpperCase() };
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