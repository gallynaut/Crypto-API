import express from 'express';
import usersService from '../services/users.services';
import APIResponse from '../models/apiResponse.interface';
import apiKeysServices from '../services/apiKeys.services';

class UsersController {
  private static instance: UsersController;

  static getInstance(): UsersController {
    if (!UsersController.instance) {
      UsersController.instance = new UsersController();
    }
    return UsersController.instance;
  }

  getUserById = async (req: express.Request, res: express.Response) => {
    const readResp:APIResponse = await usersService.readById(req.body.userID);

    if (readResp.error) {
      res.status(400).send(readResp);
    } else {
      res.status(200).send(readResp);
    }
  };

  createUser = async (req: express.Request, res: express.Response) => {
    const createResp:APIResponse = await usersService.createUser(req.body);

    if (createResp.error) {
      res.status(400).send(createResp);
    } else {
      res.status(200).send(createResp);
    }
  };

  putUser = async (req: express.Request, res: express.Response) => {
    const putResp: APIResponse = await usersService.updateById({ ...req.body });

    if (putResp.error) {
      res.status(400).send(putResp);
    } else {
      res.status(200).send(putResp);
    }
  };

  removeUser = async (req: express.Request, res: express.Response) => {
    const deleteResp:APIResponse = await usersService.deleteById(req.body.userID);

    if (deleteResp.error) {
      res.status(400).send(deleteResp);
    } else {
      res.status(200).send(deleteResp);
    }
  };

  getExchangesByApiKey = async (req: express.Request, res: express.Response) => {
    const selectResp:APIResponse = await apiKeysServices.readApiKeysById(req.body.userID);

    if (selectResp.error) {
      res.status(400).send(selectResp);
    } else {
      res.status(200).send(selectResp);
    }
  };

  checkExchangeHasApiKey = async (req: express.Request, res: express.Response) => {
    const selectResp:APIResponse = await apiKeysServices.checkExchangeById(req.body.userID, req.body.exchangeName);

    if (selectResp.error) {
      res.status(400).send(selectResp);
    } else {
      res.status(200).send(selectResp);
    }
  };
}

export default UsersController.getInstance();
