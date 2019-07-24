import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import responses from '../utils/responses';
import UserService from '../services/User';
const { JWT_PRIVATE_KEY = '' } = process.env;

class AuthController {
  static generateLoginToken(email: string): string {
    return jwt.sign({ email }, JWT_PRIVATE_KEY, {
      expiresIn: '15m'
    });
  }

  static verifyToken(token: string): false | { email: string } {
    try {
      const decoded: any = jwt.verify(token, JWT_PRIVATE_KEY);
      return decoded;
    } catch (error) {
      return false;
    }
  }

  static generateAuthToken(email: string): string {
    return jwt.sign({ email }, JWT_PRIVATE_KEY, { expiresIn: '3d' });
  }

  static authenticate(req: Request, res: Response): Response {
    const { token } = req.params;
    const decoded = AuthController.verifyToken(token);

    if (!decoded)
      return res
        .status(401)
        .json(responses.unsucessful('invalid or expired token'));

    const { email } = decoded;
    const authToken = AuthController.generateAuthToken(email);

    return res
      .status(200)
      .json(
        responses.successful('authentication successful', { token: authToken })
      );
  }

  static authorize(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const { authorization: authToken } = req.headers;
    const decoded = AuthController.verifyToken(authToken || '');

    if (!decoded)
      return res
        .status(401)
        .json(responses.unsucessful('no or invalid authorization token'));

    req.body.email = decoded.email;
    next();
  }

  static async socialCallback(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: CallableFunction
  ) {
    const {
      emails: [{ value: email }],
      name: { givenName: firstName, familyName: lastName }
    }: IProfile = profile;

    const userExists = await UserService.checkIfUserExists(email);
    if (!userExists)
      await UserService.addNewUser({ firstName, lastName, email });

    return cb(null, { email });
  }

  static socialAuth(req: Request, res: Response): Response {
    const user: { email: string } = req.user;
    const token = AuthController.generateAuthToken(user.email);

    return res
      .status(200)
      .json(responses.successful('authentication successful', { token }));
  }
}

export default AuthController;

interface IProfile {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: [{ value: string; verified: boolean }];
  photos: [{ value: string }];
  provider: string;
}
