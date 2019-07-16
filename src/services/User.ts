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

  static async getUserDetails(email: string): Promise<INewUser> {
    const [res] = await db
      .table('users')
      .select('first_name')
      .select('last_name')
      .select('email')
      .where({ email });

    return {
      firstName: res['first_name'],
      lastName: res['last_name'],
      email: res['email']
    };
  }
}

export default UserService;

interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
}
