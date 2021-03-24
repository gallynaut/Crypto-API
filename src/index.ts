/* eslint-disable radix */
/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import bodyparser from 'body-parser';
import { CommonRoutesConfig } from './routes/common.routes.config';
import TestRoutes from './routes/test.routes';
import ExchangesRoutes from './routes/exchanges.routes';
import VolumeRoutes from './routes/volume.routes';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = parseInt(process.env.APP_PORT || '3000');
const AllRoutes: Array<CommonRoutesConfig> = [];

app.use(bodyparser.json());

AllRoutes.push(new TestRoutes(app));
AllRoutes.push(new ExchangesRoutes(app));
AllRoutes.push(new VolumeRoutes(app));

server.listen(port, () => {
  console.log(`Crypto API is running on *:${port}`);
  AllRoutes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});

export default app;
