import request from 'supertest';
import app from '../../src/app';
import AuthController from '../../src/controllers/Auth';

describe('GET /api/v1/auth', () => {
  afterAll(() => app.close());

  describe('/email', () => {
    it('should return 401 if token is invalid', async () => {
      const res = await request(app).get(
        '/api/v1/auth/email/ssksksksksksksksksksksksksks'
      );

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 200 if token is valid', async () => {
      jest
        .spyOn(AuthController, 'verifyToken')
        .mockReturnValue({ email: 'tester@test.com' });
      const res = await request(app).get('/api/v1/auth/email/validtokenstub');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Object.keys(res.body)).toContain('data');
    });
  });
});
