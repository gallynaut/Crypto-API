import { PrismaClient } from '@prisma/client';
import User from '../models/users.model';

class UsersDao {
  private static instance: UsersDao;
  prisma = new PrismaClient();

  constructor() {
    // eslint-disable-next-line no-console
    console.log('Created new instance of UsersDao');
  }

  static getInstance(): UsersDao {
    if (!UsersDao.instance) {
      UsersDao.instance = new UsersDao();
    }
    return UsersDao.instance;
  }

  async addUser(user: User) {
    return this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      },
    });
  }

  async getUserById(userID: number) {
    return this.prisma.user.findUnique({
      where: { id: userID },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async putUserById(user: User) {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: { ...user },
    });
  }

  async removeUserById(userID: number) {
    return this.prisma.user.delete({
      where: {
        id: userID,
      },
    });
  }
}

export default UsersDao.getInstance();
