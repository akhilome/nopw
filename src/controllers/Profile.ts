import { Request, Response } from 'express';
import UserService from '../services/User';
import responses from '../utils/responses';

class ProfileController {
  static async getProfile(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const user = await UserService.getUserDetails(email);

    return res
      .status(200)
      .json(responses.successful('profile fetched successfully', { user }));
  }
}

export default ProfileController;
