const app = require('../lib/app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Hello World', () => {

  afterAll(() => {
    server.close();
  });

  it('should return welcome message', async() => {
    const res = await request.get('/');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Welcome! To the Koala Book of Everything!');
  });

  it('should return 404', async() => {
    //TBD
  });
});