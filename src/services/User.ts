import db from '../database';

class UserService {
  static async addNewUser(user: INewUser): Promise<void> {
    const { firstName: first_name, lastName: last_name, email } = user;
    await db.table('users').insert({ first_name, last_name, email });
  }

  static async checkIfUserExists(email: string): Promise<boolean> {
    const res = await db
      .table('users')
      .select('id')
      .where({ email });

    return Boolean(+res.length);
  }
}

export default UserService;

interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
}
