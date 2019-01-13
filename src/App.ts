// @format
import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {Maybe} from 'tsmonad';
import * as handlers from './handlers';
import {auth} from './middlewares';

interface AppConfig {
  port: number;
  jwt_secret: Maybe<string>;
}

export interface Authorized {}

export const defaultConfig: AppConfig = {
  port: 3000,
  jwt_secret: Maybe.nothing(),
};

export default {
  run(config?: AppConfig) {
    const server = express();
    const appConfig = {...defaultConfig, ...config};
    const {port, jwt_secret} = appConfig;
    const authMiddleware = auth(jwt_secret);

    server.use(bodyParser.json()); // to support JSON-encoded bodies
    server.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      }),
    );

    server.get('/', authMiddleware, handlers.index);
    server.get('/currencies', authMiddleware, handlers.currencies.index);
    server.get(
      '/currencies/:currency',
      authMiddleware,
      handlers.currencies.currency,
    );

    server.listen(isNaN(port) ? defaultConfig.port : port);
  },
};
