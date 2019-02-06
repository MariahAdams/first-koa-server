require('dotenv').config();
require('../../lib/utils/connect')();
const app = require('../../lib/app');
const server = app.listen();
const request = require('supertest').agent(server);
const mongoose = require('mongoose');
const Koala = require('../../lib/models/Koala');

describe('koala routes', () => {

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    mongoose.connection.close();
  });


  it('should CREATE a koala', async() => {
    const koala = { name: 'Julie', age: 4, home: 'SD' };
    const createKoala = await Koala.create(koala);

    const res = await request
      .post('/koalas')
      .send(createKoala);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: 'Koala created!',
      data: {
        name: 'Julie',
        age: 4,
        home: 'SD',
        _id: expect.any(String),
        __v: 0
      }
    });
  });

  it('should GET all koalas', async() => {
    await Koala.create({ name: 'Julie', age: 4, home: 'SD' });
    await Koala.create({ name: 'Joey', age: 10, home: 'Aus' });

    const res = await request
      .get('/koalas');
    expect(res.body.data).toHaveLength(2);
  });

  it('should GET one koala', async() => {
    const george = await Koala.create({ name: 'George', age: 13, home: 'SD' });

    const res = await request
      .get(`/koalas/${george._id}`);
    expect(res.body.data).toEqual({
      name: 'George',
      age: 13,
      home: 'SD',
      _id: george._id.toString(),
      __v: 0
    });
  });

  it('should DELETE one koala', async() => {
    const thanos = await Koala.create({ name: 'Thanos', age: 1000, home: 'Nowhere' });

    const res = await request
      .delete(`/koalas/${thanos._id}`);
    expect(res.body).toEqual({ deleted: 1 });
  });

  it('should UPDATE a koala', async() => {
    const mocha = await Koala.create({ name: 'Mocha', age: 2, home: 'Aus' });

    const res = await request
      .put(`/koalas/${mocha._id}`)
      .send({ age: 4 });
    expect(res.body).toEqual({
      name: 'Mocha', 
      age: 4, 
      home: 'Aus',
      _id: expect.any(String),
      __v: 0
    });
  });

});
