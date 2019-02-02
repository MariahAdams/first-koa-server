'use strict';
const koa = require('koa');
const koaRouter = require('koa-router');

const app = new koa();
const router = koaRouter();

router.get('koala', '/', (ctx) => {
  ctx.body = 'Welcome! To the Koala Book of Everything!';
});

app.use(router.routes())
  .use(router.allowedMethods());

app.use(async function(ctx) {
  ctx.body = 'Hello World!';
});

module.exports = app;