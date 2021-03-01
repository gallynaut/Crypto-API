import ApiKeysDao from '../dao/apiKeys.dao';
import APIResponse from '../models/apiResponse.interface';

class ApiKeysServices {
  private static instance: ApiKeysServices;

  static getInstance(): ApiKeysServices {
    if (!ApiKeysServices.instance) {
      ApiKeysServices.instance = new ApiKeysServices();
    }
    return ApiKeysServices.instance;
  }

  checkExchangeById = async (id: number, exgName: string) => {
    const selectReturn = await ApiKeysDao.getExchangesWithValidAPIKeys(id);
    let resp: APIResponse;
    let isFound: boolean = false;
    let createdAt: string;

    if (selectReturn) {
      selectReturn.apiKeys.forEach((element) => {
        if (element.exchangeName === exgName) {
          isFound = true;
          createdAt = element.createdAt;
        }
      });
    }

    if (isFound) {
      resp = {
        error: false,
        message: `Successfully found an API Key for user ${id} and exchange ${exgName}`,
        data: {
          isFound,
          exchangeName: exgName,
          createdAt: createdAt || '',
        },
      };
    } else {
      resp = {
        error: true,
        message: `Failed to find an API Key for user ${id} and exchange ${exgName}`,
        data: isFound,
      };
    }
    return resp;
  };

  readApiKeysById = async (id: number) => {
    const selectReturn = await ApiKeysDao.getExchangesWithValidAPIKeys(id);
    let resp: APIResponse;

    if (selectReturn && selectReturn.apiKeys && selectReturn.apiKeys.length !== 0) {
      resp = {
        error: false,
        message: `Successfully found exchanges for user ${id}`,
        data: selectReturn.apiKeys,
      };
    } else {
      resp = {
        error: true,
        message: `Failed to find exchanges for user ${id}`,
        data: [],
      };
    }
    return resp;
  };

  getAPIKeyByExchange = async (id: number, exchangeName: string) => {
    const selectReturn = await ApiKeysDao.getAPIKeyByExchange(id, exchangeName);
    let resp: APIResponse;

    if (Array.isArray(selectReturn.apiKeys) && selectReturn.apiKeys.length) {
      resp = {
        error: false,
        message: `Successfully found api keys for user ${id} and exchange ${exchangeName}`,
        data: {
          apiKey: selectReturn.apiKeys[0].apiKey,
          secret: selectReturn.apiKeys[0].secret,
        },
      };
    } else {
      resp = {
        error: true,
        message: `Failed to find api keys for user ${id} and exchange ${exchangeName}`,
        data: [],
      };
    }
    return resp;
  };

  // async createAPIKey(key: ApiKeys) {
  //   const createReturn = await ApiKeysDao.addKey({ ...req.body });
  //   let resp: APIResponse

  //   if(createReturn) {
  //     resp = {
  //       error: false,
  //       message: `Successfully deleted user with ID ${id}`,
  //       data: createReturn,
  //     }
  //   } else {
  //     resp = {
  //       error: true,
  //       message: `Failed to delete user ${id}`,
  //     }
  //   }
  //   return resp
  // }
}

export default ApiKeysServices.getInstance();
