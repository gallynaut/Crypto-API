/* eslint-disable radix */
/* eslint-disable max-len */
import APIResponse from '../models/apiResponse.interface';
import BybitDao, { ByBitResponse } from '../dao/bybit.dao';
import BybitKline from '../models/bybit.kline.model';

const crypto = require('crypto');

const possibleTimeframes = ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', 'D', 'M', 'W'];

class BybitServices {
  private static instance: BybitServices;

  static getInstance(): BybitServices {
    if (!BybitServices.instance) {
      BybitServices.instance = new BybitServices();
    }
    return BybitServices.instance;
  }

  async getVolume(req:any) {
    if (!(req.symbolName && req.timeframe && req.from)) {
      return {
        error: true,
        message: `Did not have valid parameters for ByBit request (Symbol: ${req.symbolName}, Interval: ${req.timeframe}, From: ${req.from})`,
        data: {
          possibleTimeframes,
        },
      };
    }
    const params = {
      symbol: req.symbolName,
      interval: req.timeframe,
      from: parseInt(req.from),
      api_key: req.apiKey,
      timestamp: Date.now(),
      limit: 1, // Only need one entry
    };
    const paramStr: string = this.getSignature(params, req.secret);
    const fullURL: string = `${req.endPoint}/v2/public/kline/list?'${paramStr}`;
    const getVolumeResp:ByBitResponse = await BybitDao.getBybitVolume(fullURL);
    if (!(getVolumeResp.ret_msg === 'OK' && getVolumeResp.ret_code === 0)) {
      return {
        error: true,
        message: `ByBit returned ${getVolumeResp.ret_msg} with code ${getVolumeResp.ret_code}.`,
      };
    }
    const klineData:BybitKline[] = getVolumeResp.result;

    if (!(Array.isArray(klineData) && klineData.length)) {
      return {
        error: true,
        message: `No data received from ByBit. Check parameters (Symbol: ${req.symbolName}, Interval: ${req.timeframe}, From: ${req.from})`,
        data: {
          possibleTimeframes,
        },
      };
    }
    return {
      error: false,
      message: `Volume received from ${req.exchangeName} for parameters (Symbol: ${req.symbolName}, Interval: ${req.timeframe}, From: ${req.from})`,
      data: {
        volume: this.sumVolume(klineData),
        bybit: klineData,
      },
    };
  }

  // https://github.com/bybit-exchange/api-connectors/blob/master/encryption_example/Encryption.js
  getSignature = (parameters: any, secret: string) => {
    let orderedParams = '';
    Object.keys(parameters).sort().forEach((key) => {
      orderedParams += `${key}=${parameters[key]}&`;
    });
    orderedParams = orderedParams.substring(0, orderedParams.length - 1);
    const signature = crypto.createHmac('sha256', secret).update(orderedParams).digest('hex');

    return `${orderedParams}&sign=${signature}`;
  };

  sumVolume = (klineData:BybitKline[]) => {
    let output = 0;
    klineData.forEach((element) => {
      output += parseInt(element.volume);
    });
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(output);
  };

  // This function could be converted to calculate more values over a range of dates
  checkTimeframe = async (timeframe:string):Promise<APIResponse> => {
    let rsp:APIResponse;
    possibleTimeframes.forEach((tf) => {
      if (<string>tf.trim() === <string>timeframe.trim()) {
        rsp = {
          error: false,
          message: '',
        };
      }
      return null;
    });
    if (rsp && !rsp.error) {
      return rsp;
    }
    return {
      error: true,
      message: `Could not parse timefrmae parameter (timeframe: ${timeframe}, Possible Values: ${possibleTimeframes}`,
    };
  };
}

export default BybitServices.getInstance();
