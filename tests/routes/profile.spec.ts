import request from 'supertest';
import app from '../../src/app';
import AuthController from '../../src/controllers/Auth';

describe('GET /api/v1/profile', () => {
  let token: string;
  beforeAll(() => {
    token = AuthController.generateAuthToken('j.cole@no.pw');
  });
  afterAll(() => app.close());

  it('should get user profile successfully', async () => {
    const res = await request(app)
      .get('/api/v1/profile')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(Object.keys(res.body)).toContain('data');
    expect(Object.keys(res.body.data)).toContain('user');
    expect(Object.keys(res.body.data.user)).toEqual([
      'firstName',
      'lastName',
      'email'
    ]);
    const { user } = res.body.data;
    expect(`${user.firstName} ${user.lastName}`).toEqual('Jermaine Cole');
  });

  it('should return not authorized if auth token missing', async () => {
    const res = await request(app).get('/api/v1/profile');

    expect(res.status).toBe(401);
    expect(Object.keys(res.body)).not.toContain('data');
  });
});
