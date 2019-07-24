import { request, response } from 'express';
import AuthController from '../../src/controllers/Auth';
import UserService from '../../src/services/User';
import { Profile } from 'passport';

describe('AuthController', () => {
  describe('AuthController.socialCallback', () => {
    afterEach(jest.resetAllMocks);
    const profile: Profile = {
      id: `${Date.now()}`,
      emails: [{ value: 'new.guy@gmail.com' }],
      displayName: 'New Guy',
      name: { givenName: 'New', familyName: 'Guy' },
      provider: 'test'
    };
    const cb = jest.fn();

    it('should save new user to database', async () => {
      const addUserSpy = jest.spyOn(UserService, 'addNewUser');

      await AuthController.socialCallback('', '', profile, cb);
      expect(addUserSpy).toHaveBeenCalledWith({
        firstName: 'New',
        lastName: 'Guy',
        email: 'new.guy@gmail.com'
      });
      expect(cb).toHaveBeenCalledWith(null, { email: 'new.guy@gmail.com' });
    });

    it('should save user to db even with one name', async () => {
      const addUserSpy = jest.spyOn(UserService, 'addNewUser');

      await AuthController.socialCallback(
        '',
        '',
        {
          ...profile,
          displayName: 'New',
          emails: [{ value: 'new.dude@gmail.com' }]
        },
        cb
      );
      expect(addUserSpy).toHaveBeenCalledWith({
        firstName: 'New',
        lastName: ' ',
        email: 'new.dude@gmail.com'
      });
      expect(cb).toHaveBeenCalledWith(null, { email: 'new.dude@gmail.com' });
    });

    it('should not attempt to save existing user to database', async () => {
      const addUserSpy = jest.spyOn(UserService, 'addNewUser');

      await AuthController.socialCallback('', '', profile, cb);
      expect(addUserSpy).not.toHaveBeenCalled();
      expect(cb).toHaveBeenCalledWith(null, { email: 'new.guy@gmail.com' });
    });
  });

  describe('AuthController.socialAuth', () => {
    afterEach(jest.resetAllMocks);
    request.user = { email: 'j.cole@no.pw' };

    it('should generate auth token', async () => {
      response.status = jest.fn().mockReturnThis();
      response.json = jest.fn();
      await AuthController.socialAuth(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalled();
    });
  });
});
