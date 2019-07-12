import * as Express from 'express';
import UserService from '../services/User';
import EmailService from '../services/Email';

const { API_ROOT_URL } = process.env;

const generateLoginEmail = (loginToken: string): string => `
  <div style="text-align: center;">
    <h3>Thank You For Using The Platform</h3>
    <p>To access your user account, <a href="http://${API_ROOT_URL}/auth/${loginToken}">click here</a> to authenticate right now.</p>
    <br />
    <hr />
    <br />
    <p>Please note that this token expires in <b>15 minutes</b></p>
  </div>
`;

class UserController {
  static async signUp(req: Express.Request, res: Express.Response) {
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
      const newUserEmail = await UserService.addNewUser({
        firstName,
        lastName,
        email
      });

      EmailService.sendMail(
        newUserEmail,
        'Welcome to NOPW',
        generateLoginEmail(newUserEmail)
      );

      res.status(201).json({
        success: true,
        message: 'Sign up successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong while processing your request'
      });
    }
  }
}

export default UserController;
