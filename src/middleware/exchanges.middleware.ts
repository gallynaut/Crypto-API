/* eslint-disable max-len */
import express from 'express';
import exchangesService from '../services/exchanges.services';
import APIResponse from '../models/apiResponse.interface';

class ExchangeMiddleware {
  private static instance: ExchangeMiddleware;

  static getInstance() {
    if (!ExchangeMiddleware.instance) {
      ExchangeMiddleware.instance = new ExchangeMiddleware();
    }
    return ExchangeMiddleware.instance;
  }

  extractExchangeName = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.params.exchangeName) {
      res.status(400).send({
        error: true,
        message: `Could not read exchange. Make sure it is valid. ${req.params.exchangeName}`,
      });
    } else {
      // CHECK EXCHANGE NAME EXIST
      req.body.exchangeName = req.params.exchangeName.toUpperCase();
      const readResp:APIResponse = await exchangesService.getByName(req.body.exchangeName);

      if (readResp.error) {
        res.status(400).send({
          error: true,
          message: `Could not find exchange. Make sure it is valid: ${req.body.exchangeName}`,
        });
      } else {
        next();
      }
    }
  };

  extractSymbolName = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.params.symbolName) {
      res.status(400).send({
        error: true,
        message: `Could not read symbol. Make sure it is valid. ${req.params.symbolName}`,
      });
    } else {
      req.body.symbolName = req.params.symbolName.toUpperCase();

      // CHECK SYMBOL EXIST
      const readResp:APIResponse = await exchangesService.checkSymbolByExchange(req.body.exchangeName, req.body.symbolName);
      if (!readResp.data) {
        res.status(400).send({
          error: true,
          message: `Could not find symbol ${req.body.symbolName} for exchange ${req.body.exchangeName}`,
        });
      } else {
        next();
      }
    }
  };

  getExchangeEndPoint = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const endPointResp = await exchangesService.getExchangeEndPoint(req.body.exchangeName);

    if (endPointResp.error) {
      res.status(400).send({
        error: true,
        message: `Failed to find endpoint for exchange ${req.body.exchangeName}`,
      });
    } else {
      req.body.endPoint = endPointResp.data;
      next();
    }
  };

  loadDefaultAPIKeys = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.body.apiKey) {
      if (req.body.exchangeName === 'BYBIT') {
        req.body.apiKey = process.env.BYBIT_MAIN_API;
        req.body.secret = process.env.BYBIT_MAIN_SECRET;
      } else if (req.body.exchangeName === 'BYBIT-TEST') {
        req.body.apiKey = process.env.BYBIT_TEST_API;
        req.body.secret = process.env.BYBIT_TEST_SECRET;
      }
      next();
    }
  };
}

export default ExchangeMiddleware.getInstance();
