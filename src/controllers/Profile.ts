import { Request, Response } from 'express';
import UserService from '../services/User';

class ProfileController {
  static async getProfile(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const user = await UserService.getUserDetails(email);

    return res.status(200).json({
      success: true,
      message: 'profile fetched successfully',
      data: { user }
    });
  }
}

export default ProfileController;
