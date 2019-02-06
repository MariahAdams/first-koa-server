const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');

const app = new koa();
const router = koaRouter();

const Koala = require('./models/Koala');

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

router.post('koala', '/koalas', async(ctx, next) => {
  const body = ctx.request.body;
  if(!body.name || !body.age) ctx.throw(400, 'required fields missing');

  const res = await Koala
    .create({
      name: body.name,
      age: body.age,
      home: body.home
    });
  if(!res) throw new Error('Failed to create koala');
  else {
    ctx.body = { message: 'Koala created!', data: res };
    next();
  }
  
});

router.get('koala', '/koalas', async(ctx, next) => {
  const res = await Koala.find();
  if(!res) throw new Error('Failed to retrieve koalas');
  else {
    ctx.body = { message: 'Successfully retrieved koalas!', data: res };
    next();
  }
});

router.get('koala', '/koalas/:id', async(ctx, next) => {
  const res = await Koala.findById(ctx.params.id);
  if(!res) throw new Error('Failed to retrieve the koala :(');
  else {
    ctx.body = { message: 'Successfully retrieved koala!', data: res };
    next();
  }
});

router.delete('koala', '/koalas/:id', async(ctx, next) => {
  const res = await Koala.findByIdAndDelete(ctx.params.id);
  if(!res) throw new Error('failed to delete');
  else {
    ctx.body = { deleted: 1 };
    next();
  }
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