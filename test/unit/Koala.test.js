require('dotenv').config();
require('../../lib/utils/connect')();
const Koala = require('../../lib/models/Koala');
const mongoose = require('mongoose');

describe('Koala Model', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('validates a good model', () => {
    const data = {
      name: 'Audrey',
      age: 4,
      home: 'San Diego Zoo'
    };
    const koala = new Koala(data);

    const json = koala.toJSON();
    delete json._id;
    expect(json).toEqual(data);
    expect(koala.validateSync()).toBeUndefined();
  });

});