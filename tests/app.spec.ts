import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  afterAll(() => app.close());

  it('should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('should respond with appropriate body message', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({
      success: true,
      message: 'server up & running'
    });
  });
});
