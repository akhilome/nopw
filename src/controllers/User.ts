import { Request, Response } from 'express';
import UserService from '../services/User';
import EmailService from '../services/Email';
import AuthController from './Auth';
import logger from '../logging';
import responses from '../utils/responses';

const { API_ROOT_URL } = process.env;

const generateLoginEmail = (loginToken: string): string => `
  <div style="text-align: center;">
    <h3>Thank You For Using The Platform</h3>
    <p>To access your user account, <a href="${API_ROOT_URL}/auth/email/${loginToken}">click here</a> to authenticate right now.</p>
    <br />
    <hr />
    <br />
    <p>Please do note that this token expires in <b>15 minutes</b></p>
  </div>
`;

class UserController {
  static async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, email } = req.body;
      const userExists = await UserService.checkIfUserExists(email);
      if (userExists)
        return res
          .status(409)
          .json(responses.unsucessful('A user with that email already exists'));

      await UserService.addNewUser({
        firstName,
        lastName,
        email
      });

      EmailService.sendMail(
        email,
        'Welcome to NOPW',
        generateLoginEmail(AuthController.generateLoginToken(email))
      );

      return res.status(201).json(responses.successful('Sign up successful'));
    } catch (error) {
      logger.error(error);
      return res.status(500).json(responses.genericError());
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    try {
      const validUser = await UserService.checkIfUserExists(email);
      if (!validUser)
        return res
          .status(401)
          .json(responses.unsucessful('No user with that email exists, please sign up'));

      EmailService.sendMail(
        email,
        'New Login Request',
        generateLoginEmail(AuthController.generateLoginToken(email))
      );

      return res.status(200).json(responses.successful('Check your email for auth link'));
    } catch (error) {
      logger.error(error);
      return res.status(500).json(responses.genericError());
    }
  }
}

export default UserController;
