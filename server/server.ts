import "reflect-metadata";
import * as compression from 'compression';
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as api from './api';
import { addNotifier, getTasks, getTask } from './data';
import { AppRoutes } from "./src/routes";
// import * as Notifier from './notifier';

const PORT = process.env.PORT || 8102;

// let notifier = new Notifier();

// addNotifier(
//   'task',
//   (task) => {
//     // this can be invoked multiple times as new requests happen
//     notifier.test((request) => {
//       // we should skip notify if the id of the task does not match the payload
//       if (request.path === '/api/task/:id' && request.params.id !== task.id) {
//         return false;
//       }
//       return true;
//     });
//   }
// );

// notifier.use('/api/task', () => getTasks());
// notifier.use('/api/task/:id', param => (
//   getTask(param.id).then((result) => {
//     if (!result.task) {
//       return Promise.reject({ statusCode: 404, message: 'Not Found' });
//     }
//     return Promise.resolve(result);
//   })
// ));

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

  // create express app
  const app = express()
    .use(compression())
    .use(cookieParser())
    .use(morgan('tiny'))
    .use(bodyParser.json());

  // REST API
  app.use('/api', api);

  // UI
  app.use('/', express.static(path.join(__dirname, '/../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
  });

  // temporary local development concern addressed
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // register all application routes
  AppRoutes.forEach(route => {
    app[route.method](route.path, (request: Request, response: Response, next: Function) => {
      route.action(request, response)
        .then(() => next)
        .catch(err => next(err));
    });
  });

  const server = http.createServer(app);
  server.listen(PORT);
  // notifier.listen(server);

  console.log(`Server started at http://localhost:${PORT}`);

  // // run app
  // const port = 3005;
  // app.listen(port);

  // console.log("Express application is up and running on port " + port);

}).catch(error => console.log("TypeORM connection error: ", error));

