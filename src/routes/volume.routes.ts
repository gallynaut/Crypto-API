import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import UsersMiddleware from '../middleware/users.middleware';
import ExchangeMiddleware from '../middleware/exchanges.middleware';
import VolumeMiddleware from '../middleware/volume.middleware';
import ExchangesController from '../controllers/exchanges.controller';

export default class VolumeRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'VolumeRoutes');
  }

  configureRoutes() {
    this.app.route('/exchanges/:exchangeName/symbols/:symbolName/volume')
      .all([
        ExchangeMiddleware.extractExchangeName,
        ExchangeMiddleware.extractSymbolName,
        ExchangeMiddleware.getExchangeEndPoint,
        VolumeMiddleware.parseVolumeParameters,
        ExchangeMiddleware.loadDefaultAPIKeys,
        VolumeMiddleware.validateTimeframe,
      ])
      .get(ExchangesController.getVolume);

    this.app.route('/users/:userId/exchanges/:exchangeName/symbols/:symbolName/volume')
      .all([
        UsersMiddleware.extractUserId,
        ExchangeMiddleware.extractExchangeName,
        ExchangeMiddleware.extractSymbolName,
        ExchangeMiddleware.getExchangeEndPoint,
        VolumeMiddleware.parseVolumeParameters,
        UsersMiddleware.getAPIKeyByExchange,
        VolumeMiddleware.validateTimeframe,
      ])
      .get(ExchangesController.getVolume);

    return this.app;
  }
}
