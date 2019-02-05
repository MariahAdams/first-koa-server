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


  it('should save a koala', async() => {
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

});

/* Async testing with mongoose: http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose */