import express from 'express';
import APIResponse from 'src/models/apiResponse.interface';
import userService from '../services/users.services';
import ApiKeysServices from '../services/apiKeys.services';

class UsersMiddleware {
  private static instance: UsersMiddleware;

  static getInstance() {
    if (!UsersMiddleware.instance) {
      UsersMiddleware.instance = new UsersMiddleware();
    }
    return UsersMiddleware.instance;
  }

  extractUserId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const numID = Number(req.params.userId);
    if (!numID) {
      res.status(400).send({
        error: true,
        message: 'Could not read user ID. Make sure it is a number',
      });
    } else {
      req.body.userID = numID;
      // CHECK USER EXIST
      const readResp:APIResponse = await userService.readById(req.body.userID);
      if (readResp.error) {
        res.status(400).send({
          error: true,
          message: `Could not find user for id ${req.body.userID}`,
        });
      } else {
        next();
      }
    }
  };

  checkBodyEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!userService.checkEmailValidity(req.body.email)) {
      res.status(400).send({
        error: true,
        message: 'Could not read email address',
      });
    } else {
      next();
    }
  };

  checkUserByEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const readResp:APIResponse = await userService.readByEmail(req.body.email);

    if (!readResp.error) {
      res.status(400).send({
        error: true,
        message: `User already found for email ${req.body.email}`,
      });
    } else {
      next();
    }
  };

  getAPIKeyByExchange = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const readResp:APIResponse = await ApiKeysServices.getAPIKeyByExchange(req.body.userID, req.body.exchangeName);

    if (readResp.error) {
      res.status(400).send(readResp);
    } else {
      // these should be hashed
      req.body.apiKey = readResp.data.apiKey;
      req.body.secret = readResp.data.secret;
      next();
    }
  };

  // static async checkBodyForApiKey(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   const key: ApiKeys = { ...req.body };
  //   console.log(key);
  // }
}

export default UsersMiddleware.getInstance();
