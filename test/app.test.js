const app = require('../lib/app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Hello World', () => {

  afterAll(() => {
    server.close();
  });

  it('should return welcome message', done => {
    request
      .get('/')
      .expect(200)
      .expect('Welcome! To the Koala Book of Everything!', done);
  });
});