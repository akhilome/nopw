import db from '../database';

class UserService {
  static async addNewUser(user: INewUser): Promise<string> {
    const { firstName: first_name, lastName: last_name, email } = user;
    const [savedEmail]: string[] = await db
      .table('users')
      .insert({ first_name, last_name, email })
      .returning('email');

    return savedEmail;
  }

  static async checkIfUserExists(email: string): Promise<boolean> {
    const [{ count }] = await db
      .table('users')
      .count()
      .where({ email });
    return Boolean(+count);
  }
}

export default UserService;

interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
}
