import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as compression from 'compression';

import 'reflect-metadata';
import 'es6-shim';

import errorMiddleware from './v1/middlewares/error.middleware';
import db from './DBConfig';
import { NextFunction } from 'express';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeDataBase();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(compression());
    this.app.use(bodyParser.json());

    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.setHeader('X-Powered-By', 'Express');
        next();
      }
    );
    this.app.use(cookieParser());
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1/', controller.router);
    });
  }

  private initializeDataBase() {
    db.sync({})
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database: ', error);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
