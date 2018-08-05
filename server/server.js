"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const compression = require("compression");
const typeorm_1 = require("typeorm");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const api = require("./api");
const routes_1 = require("./src/routes");
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
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
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
    routes_1.AppRoutes.forEach(route => {
        console.log(route);
        app[route.method](route.path, (request, response, next) => {
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
})).catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=server.js.map