import request from 'supertest';
import app from '../../src/app';
import EmailService from '../../src/services/Email';

describe('GET /api/v1/users/signup', () => {
  beforeEach(() => {
    jest.spyOn(EmailService, 'sendMail').mockResolvedValue(undefined);
  });

  afterAll(() => app.close());

  it('should sign up a user successfully', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Testing',
        lastName: 'Tester',
        email: 'test@tester.testing'
      });

    expect(res.body).toEqual({
      success: true,
      message: 'Sign up successful'
    });
  });

  it('should not sign up a user twice', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Testing',
        lastName: 'Tester',
        email: 'test@tester.testing'
      });

    expect(res.body).toEqual({
      success: false,
      message: 'A user with that email already exists'
    });
  });

  it('should throw', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Testing',
        lastName: 'Tester'
      });

    expect(res.status).toEqual(500);
  });
});
