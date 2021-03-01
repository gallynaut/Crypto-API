import ExchangesDao from '../dao/exchanges.dao';
import APIResponse from '../models/apiResponse.interface';

class ExchangeServices {
  private static instance: ExchangeServices;

  static getInstance(): ExchangeServices {
    if (!ExchangeServices.instance) {
      ExchangeServices.instance = new ExchangeServices();
    }
    return ExchangeServices.instance;
  }

  getByName = async (exchangeName: string) => {
    const selectExchangesResp = await ExchangesDao.getExchangeByName(exchangeName);
    let resp: APIResponse;

    if (selectExchangesResp) {
      resp = {
        error: false,
        message: `Exchange ${exchangeName} found successfully`,
        data: selectExchangesResp,
      };
    } else {
      resp = {
        error: true,
        message: `Exchange ${exchangeName} not found`,
      };
    }
    return resp;
  };

  listExchanges = async () => {
    const selectExchangesResp = await ExchangesDao.getExchanges();
    let resp: APIResponse;

    if (selectExchangesResp) {
      resp = {
        error: false,
        message: 'Exchanges found successfully',
        data: selectExchangesResp,
      };
    } else {
      resp = {
        error: true,
        message: 'Exchanges not found',
      };
    }
    return resp;
  };

  // We can flatten output later
  getAvailableSymbols = async (exchangeName: string) => {
    const selectSymbolsResp = await ExchangesDao.getAvailableSymbols(exchangeName);
    let resp: APIResponse;

    if (selectSymbolsResp) {
      resp = {
        error: false,
        message: `Exchange symbols found successfully for ${exchangeName}`,
        data: selectSymbolsResp,
      };
    } else {
      resp = {
        error: true,
        message: `No Exchange symbols found for ${exchangeName}`,
      };
    }
    return resp;
  };

  checkSymbolByExchange = async (exchangeName: string, symName: string) => {
    const selectSymbolsResp = await ExchangesDao.getAvailableSymbols(exchangeName);
    let isFound: boolean = false;

    if (selectSymbolsResp) {
      selectSymbolsResp.forEach((element) => {
        if (element.symbolName === symName) {
          isFound = true;
        }
      });
    }
    if (isFound) {
      return {
        error: false,
        message: `Exchange symbol ${symName} found successfully for ${exchangeName}`,
        data: true,
      };
    }
    return {
      error: true,
      message: `Exchange symbol ${symName} not found for ${exchangeName}`,
      data: false,
    };
  };

  getExchangeEndPoint = async (exchangeName: string) => {
    const selectExchangesResp = await ExchangesDao.getExchangeEndPoint(exchangeName);
    let resp: APIResponse;

    if (selectExchangesResp.endPoint) {
      resp = {
        error: false,
        message: `Exchange end point found successfully for ${exchangeName}`,
        data: selectExchangesResp.endPoint,
      };
    } else {
      resp = {
        error: true,
        message: `No Exchange end point found for ${exchangeName}`,
      };
    }
    return resp;
  };
}

export default ExchangeServices.getInstance();
