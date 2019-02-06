const app = require('../lib/app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('App', () => {

  afterAll(() => {
    server.close();
  });

  it('should return 500 when error is thrown', async() => {
    const res = await request.get('/practice');
    expect(res.status).toEqual(500);
    expect(res.text).toEqual('An error occurred at /practice');
  });

  it('should return 404', async() => {
    const res = await request.get('/error');
    expect(res.status).toEqual(404);
    expect(res.text).toEqual('Not Found');
  });

  describe('BodyParser', () => {

    it('should POST to /practice', async() => {
      const res = await request
        .post('/practice')
        .send({ name: 'tobi' });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ name: 'TOBI' });
    });

    it('should work with urlencoded', async() => {
      const res = await request
        .post('/practice')
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
        .post('/practice')
        .send('age=100');
      expect(res.status).toEqual(400);
    });

  });

});