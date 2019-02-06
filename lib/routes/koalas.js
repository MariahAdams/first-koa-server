const router = require('koa-router')();
const Koala = require('../models/Koala');

module.exports = router
  .post('koala', '/', async(ctx, next) => {
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
  })

  .get('koala', '/', async(ctx, next) => {
    const res = await Koala.find();
    if(!res) throw new Error('Failed to retrieve koalas');
    else {
      ctx.body = { message: 'Successfully retrieved koalas!', data: res };
      next();
    }
  })

  .get('koala', '/:id', async(ctx, next) => {
    const res = await Koala.findById(ctx.params.id);
    if(!res) throw new Error('Failed to retrieve the koala :(');
    else {
      ctx.body = { message: 'Successfully retrieved koala!', data: res };
      next();
    }
  })

  .delete('koala', '/:id', async(ctx, next) => {
    const res = await Koala.findByIdAndDelete(ctx.params.id);
    if(!res) throw new Error('failed to delete');
    else {
      ctx.body = { deleted: 1 };
      next();
    }
  })

  .put('koala', '/:id', async(ctx, next) => {
    const res = await Koala.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
    if(!res) throw new Error('failed to update');
    else {
      ctx.body = res;
      next();
    }
  });