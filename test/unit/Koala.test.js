require('dotenv').config();
require('../../lib/utils/connect')();
const Koala = require('../../lib/models/Koala');
const mongoose = require('mongoose');
const getErrors = require('./error');

describe.skip('Koala Model', () => {

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

  it('validates required fields', () => {
    const koala = new Koala({});
    const errors = getErrors(koala.validateSync(), 2);
    expect(errors.name.kind).toEqual('required');
    expect(errors.age.kind).toEqual('required');
  });

});