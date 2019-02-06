const koa = require('koa');
const koaBody = require('koa-body');
const koalaApi = require('koa-router')();
const testApi = require('koa-router')();

const app = new koa();

const koalas = require('./routes/koalas');
const practice = require('./routes/practice');


app.use(koaBody({
  jsonLimit: '1kb'
}));

/* error handling */
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

/* Registering routes source: https://github.com/ZijianHe/koa-router/issues/125 */
koalaApi.use('/koalas', koalas.routes());
app.use(koalaApi.routes(), koalaApi.allowedMethods());

testApi.use('/practice', practice.routes());
app.use(testApi.routes(), testApi.allowedMethods());


if(!module.parent) {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server jammin on ${PORT}`);
  });
} else {
  module.exports = app;
}