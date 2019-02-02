'use strict';
const koa = require('koa');
const koaRouter = require('koa-router');

const app = new koa();
const router = koaRouter();

app.use(async(ctx, next) => {
  try {
    await next();
  } catch(err) {
    console.log(err.status);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.get('koala', '/', (ctx) => {
  // ctx.body = 'Welcome! To the Koala Book of Everything!';
  ctx.throw(500, 'AN UNKNOWN ERROR OCCURRED'); /* numeric arg must be passed first */
});

app.use(router.routes())
  .use(router.allowedMethods());

app.use(async function(ctx) {
  ctx.body = 'Hello World!';
});

module.exports = app;