import express from 'express';
import exchangesService from '../services/exchanges.services';
import APIResponse from '../models/apiResponse.interface';
import BybitServices from '../services/bybit.services';

class ExchangesController {
  private static instance: ExchangesController;

  static getInstance(): ExchangesController {
    if (!ExchangesController.instance) {
      ExchangesController.instance = new ExchangesController();
    }
    return ExchangesController.instance;
  }

  listExchanges = async (req: express.Request, res: express.Response) => {
    const listExgResp:APIResponse = await exchangesService.listExchanges();

    if (listExgResp.error) {
      res.status(400).send(listExgResp);
    } else {
      res.status(200).send(listExgResp);
    }
  };

  getExchangeByName = async (req: express.Request, res: express.Response) => {
    const readResp:APIResponse = await exchangesService.getByName(req.body.exchangeName);

    if (readResp.error) {
      res.status(400).send(readResp);
    } else {
      res.status(200).send(readResp);
    }
  };

  getAvailableSymbols = async (req: express.Request, res: express.Response) => {
    const readResp:APIResponse = await exchangesService.getAvailableSymbols(req.body.exchangeName);

    if (readResp.error) {
      res.status(400).send(readResp);
    } else {
      res.status(200).send(readResp);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  checkAvailableSYmbols = async (req: express.Request, res: express.Response) => {
    // eslint-disable-next-line max-len
    const checkResp:APIResponse = await exchangesService.checkSymbolByExchange(req.body.exchangeName, req.body.symbolName);

    if (checkResp.error) {
      res.status(400).send(checkResp);
    } else {
      res.status(200).send(checkResp);
    }
  };

  getVolume = async (req: express.Request, res: express.Response) => {
    if (req.body.exchangeName && req.body.exchangeName.includes('BYBIT')) {
      // PASS CONTROL TO BYBIT SERVICES
      const getVolumeResp:APIResponse = await BybitServices.getVolume({ ...req.body });

      if (getVolumeResp.error) {
        res.status(400).send(getVolumeResp);
      } else {
        res.status(200).send(getVolumeResp);
      }
    }
  };
}

export default ExchangesController.getInstance();
