import request from 'supertest';
import app from '../../src/app';
import EmailService from '../../src/services/Email';
import UserService from '../../src/services/User';

describe('POST /api/v1/users/signup', () => {
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

describe('POST /api/v1/users/signup', () => {
  beforeEach(() => {
    jest.spyOn(EmailService, 'sendMail').mockResolvedValue(undefined);
  });
  afterAll(() => app.close());

  it('should login user successfully', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test@tester.testing' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: 'Check your email for auth link'
    });
  });

  it('should not login non-existent user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'null@gmail.com' });

    expect(res.body).toEqual({
      success: false,
      message: 'No user with that email exists, please sign up'
    });
  });

  it('should throw for login', async () => {
    jest
      .spyOn(UserService, 'checkIfUserExists')
      .mockRejectedValue(new Error('wtf!'));

    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test@tester.testing' });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
