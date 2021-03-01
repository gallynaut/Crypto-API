import { PrismaClient } from '@prisma/client';

class ApiKeysDao {
  private static instance: ApiKeysDao;
  prisma = new PrismaClient();

  constructor() {
    // eslint-disable-next-line no-console
    console.log('Created new instance of ApiKeysDao');
  }

  static getInstance(): ApiKeysDao {
    if (!ApiKeysDao.instance) {
      ApiKeysDao.instance = new ApiKeysDao();
    }
    return ApiKeysDao.instance;
  }

  // async addKey(key: ApiKeys ) {
  //   return await this.prisma.apiKey.create({
  //     data: {
  //       apiKey: key.apiKey,
  //       secret: key.secret,
  //       userID: key.userID,
  //       exchangeName: key.exchangeName,
  //       createdAt: Date.now().toString(),
  //       subaccount: key.subaccount || '',
  //       }
  //   })
  // }

  async getExchangesWithValidAPIKeys(userID: number) {
    return this.prisma.user.findUnique({
      where: { id: userID },
      include: {
        apiKeys: {
          select: {
            exchangeName: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async getAPIKeyByExchange(userID: number, exgName: string) {
    return this.prisma.user.findFirst({
      where: { id: userID },
      include: { apiKeys: { where: { exchangeName: exgName } } },
    });
  }
}

export default ApiKeysDao.getInstance();
