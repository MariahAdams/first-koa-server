const router = require('koa-router')();

module.exports = router
  .get('test', '/', (ctx) => {
    ctx.throw(500, `An error occurred at ${ctx.url}`); /* numeric arg must be passed first */
  })

  .post('body parser', '/', async(ctx) => {
    const body = ctx.request.body;
    if(!body.name) ctx.throw(400, '.name is required');
    ctx.body = { name: body.name.toUpperCase() };
  });