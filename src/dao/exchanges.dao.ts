import { PrismaClient } from '@prisma/client';

class ExchangesDao {
  private static instance: ExchangesDao;
  prisma = new PrismaClient();

  constructor() {
    // eslint-disable-next-line no-console
    console.log('Created new instance of ExchangeDao');
  }

  static getInstance(): ExchangesDao {
    if (!ExchangesDao.instance) {
      ExchangesDao.instance = new ExchangesDao();
    }
    return ExchangesDao.instance;
  }

  // returns list of exchange names
  async getExchanges() {
    return this.prisma.exchange.findMany({
      include: {
        symbols: {
          select: { symbolName: true },
        },
      },
    });
  }

  async getExchangeByName(exchangeName: string) {
    return this.prisma.exchange.findUnique({
      where: { name: exchangeName },
    });
  }

  async getExchangeEndPoint(exchangeName: string) {
    return this.prisma.exchange.findUnique({
      where: {
        name: exchangeName,
      },
      select: {
        name: true,
        endPoint: true,
      },
    });
  }

  async getAvailableSymbols(exchangeName: string) {
    return this.prisma.exchangeSymbol.findMany({
      where: { exchangeName },
      select: { symbolName: true },
    });
  }

  // async getVolume(exchangeName: string, timeframe: string, from?: string) {
  //   console.log("Checking Postgres for ", exchangeName, "'s volume\nTimeframe: ", timeframe)
  // }
}

export default ExchangesDao.getInstance();
