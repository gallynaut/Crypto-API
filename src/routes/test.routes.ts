import { Application, Request, Response } from 'express';

import { CommonRoutesConfig } from './common.routes.config';

export default class TestRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'TestRoutes');
  }

  configureRoutes() {
    this.app.get('/api/test', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Get request successfull' });
    });
    this.app.post('/api/test', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Post request successfull' });
    });

    return this.app;
  }
}
