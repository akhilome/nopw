import request from 'supertest';
import app from '../../src/app';

describe('GET /api/v1', () => {
  afterAll(() => app.close());

  it('should return 404', async () => {
    const res = await request(app).get('/api/v1');
    expect(res.status).toBe(404);
  });

  it('should respond with appropriate body message', async () => {
    const res = await request(app).get('/api/v1');
    expect(res.body).toEqual({
      success: false,
      message: 'invalid route'
    });
  });
});
