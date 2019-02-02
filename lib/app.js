'use strict';
const koa = require('koa');
const app = new koa();

app.use(async function(ctx) {
  ctx.body = 'Hello World!';
});

module.exports = app;