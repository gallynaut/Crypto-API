import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import UsersController from '../controllers/users.controller';
import UsersMiddleware from '../middleware/users.middleware';
import ExchangeMiddleware from '../middleware/exchanges.middleware';

export default class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.post('/users', [
      UsersMiddleware.checkBodyEmail,
      UsersMiddleware.checkUserByEmail,
      UsersController.createUser,
    ]);

    this.app.route('/users/:userId')
      .all([
        UsersMiddleware.extractUserId,
      ])
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser)
      .put(UsersController.putUser);

    this.app.route('/users/:userId/exchanges')
      .all([
        UsersMiddleware.extractUserId,
      ])
      .get(UsersController.getExchangesByApiKey);

    this.app.route('/users/:userId/exchanges/:exchangeName')
      .all([
        UsersMiddleware.extractUserId,
        ExchangeMiddleware.extractExchangeName,
      ])
      .get(UsersController.checkExchangeHasApiKey);
    // .post([
    //   UsersMiddleware.checkBodyForApiKey,
    // ])

    return this.app;
  }
}
