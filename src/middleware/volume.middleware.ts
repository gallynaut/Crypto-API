import express from 'express';
import APIResponse from '../models/apiResponse.interface';
import BybitServices from '../services/bybit.services';

class VolumeMiddleware {
  private static instance: VolumeMiddleware;

  static getInstance() {
    if (!VolumeMiddleware.instance) {
      VolumeMiddleware.instance = new VolumeMiddleware();
    }
    return VolumeMiddleware.instance;
  }

  parseVolumeParameters = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!(req.query.timeframe && req.query.from)) {
      res.status(400).send({
        error: true,
        message: `Could not parse query string. (timeframe: ${req.query.timeframe}, from: ${req.query.from})`,
      });
    } else {
      req.body.from = req.query.from;
      req.body.timeframe = req.query.timeframe;

      next();
    }
  };
  validateTimeframe = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const checkResp: APIResponse = await BybitServices.checkTimeframe(req.body.timeframe);

    if (checkResp.error) {
      res.status(400).send(checkResp);
    } else {
      next();
    }
  };
}

export default VolumeMiddleware.getInstance();
