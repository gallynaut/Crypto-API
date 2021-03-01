/* eslint-disable no-console */
import BybitKline from '../models/bybit.kline.model';

export interface ByBitResponse {
  ret_code: number;
  ret_msg: string;
  ext_code: string;
  ext_info: string;
  time_now: string;
  result: BybitKline[];
}

// export interface BybitVolumeRequest {
//   symbolName: string;
//   timeframe: "1" | "3" | "5" | "15" | "30" | "60" | "120" | "240" | "360" | "720" | "D" | "M" | "W";
//   from: number;
// }

const axios = require('axios').default;

class BybitDao {
  private static instance: BybitDao;
  // const axios = require('axios').default;

  constructor() {
    console.log('Created new instance of Bybit DAO');
    // Calculate server time offset here and store in global variable
  }

  static getInstance(): BybitDao {
    if (!BybitDao.instance) {
      BybitDao.instance = new BybitDao();
    }
    return BybitDao.instance;
  }

  getBybitVolume = async (reqURL: string) => {
    let rspData:ByBitResponse;
    try {
      // fetch data from a url endpoint
      const rsp = await axios.get(reqURL);
      rspData = rsp.data;
    } catch (error) {
      console.log('error', error);
      console.log('GET: ', reqURL);
    }
    return rspData;
  };
}

export default BybitDao.getInstance();
