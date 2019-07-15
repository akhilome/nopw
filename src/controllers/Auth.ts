import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
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
      return res.status(401).json({
        success: false,
        message: 'invalid or expired token'
      });

    const { email } = decoded;
    const authToken = AuthController.generateAuthToken(email);

    return res.status(200).json({
      success: true,
      message: 'authentication successful',
      data: { token: authToken }
    });
  }
}

export default AuthController;
