const app = require('../lib/app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('App', () => {

  afterAll(() => {
    server.close();
  });

  it('should return welcome message', async() => {
    const res = await request.get('/');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Welcome! To the Koala Book of Everything!');
  });

  it('should return 500 when error is thrown', async() => {
    const res = await request.get('/error');
    expect(res.status).toEqual(500);
    expect(res.text).toEqual('An error occurred at /error');
  });

  it('should return 404', async() => {
    const res = await request.get('/test');
    expect(res.status).toEqual(404);
    expect(res.text).toEqual('Not Found');
  });

  describe('BodyParser', () => {

    it('should POST to /uppercase', async() => {
      const res = await request
        .post('/uppercase')
        .send({ name: 'tobi' });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ name: 'TOBI' });
    });

    it('should work with urlencoded', async() => {
      const res = await request
        .post('/uppercase')
        .send('name=tj');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ name: 'TJ' });
    });

    it('should return 413 when length > limit', async() => {
      const res = await request
        .post('/json')
        .send({ name: Array(5000).join('a') });
      expect(res.status).toEqual(413);
    });

    it('should return 400 when no name is sent', async() => {
      const res = await request
        .post('/uppercase')
        .send('age=100');
      console.log('***body***', res.body);
      expect(res.status).toEqual(400);
    });

  });

});