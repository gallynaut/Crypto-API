import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import ExchangesController from '../controllers/exchanges.controller';
import ExchangesMiddleware from '../middleware/exchanges.middleware';

export default class ExchangesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ExchangesRoutes');
  }

  configureRoutes() {
    this.app.route('/exchanges')
      .get(ExchangesController.listExchanges);

    this.app.route('/exchanges/:exchangeName')
      .all([
        ExchangesMiddleware.extractExchangeName,
      ])
      .get(ExchangesController.getExchangeByName);

    this.app.route('/exchanges/:exchangeName/symbols')
      .all([
        ExchangesMiddleware.extractExchangeName,
      ])
      .get(ExchangesController.getAvailableSymbols);

    this.app.route('/exchanges/:exchangeName/symbols/:symbolName')
      .all([
        ExchangesMiddleware.extractExchangeName,
        ExchangesMiddleware.extractSymbolName,
      ])
      .get(ExchangesController.checkAvailableSYmbols);
    // Post request for Symbols handled by manual input for security

    return this.app;
  }
}
