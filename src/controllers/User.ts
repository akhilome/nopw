import { Request, Response } from 'express';
import UserService from '../services/User';
import EmailService from '../services/Email';
import AuthController from './Auth';

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
    const {
      body: { firstName, lastName, email }
    } = req;

    try {
      const userExists = await UserService.checkIfUserExists(email);

      if (userExists)
        return res.status(409).json({
          success: false,
          message: 'A user with that email already exists'
        });

      await UserService.addNewUser({
        firstName,
        lastName,
        email
      });

      await EmailService.sendMail(
        email,
        'Welcome to NOPW',
        generateLoginEmail(AuthController.generateLoginToken(email))
      );

      return res.status(201).json({
        success: true,
        message: 'Sign up successful'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while processing your request'
      });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    try {
      const validUser = await UserService.checkIfUserExists(email);

      if (!validUser)
        return res.status(401).json({
          success: false,
          message: 'No user with that email exists, please sign up'
        });

      await EmailService.sendMail(
        email,
        'New Login Request',
        generateLoginEmail(AuthController.generateLoginToken(email))
      );

      return res.status(200).json({
        success: true,
        message: 'Check your email for auth link'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Somthing went wrong while processing your request'
      });
    }
  }
}

export default UserController;
