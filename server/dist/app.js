"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
require("reflect-metadata");
require("es6-shim");
const error_middleware_1 = require("./v1/middlewares/error.middleware");
const DBConfig_1 = require("./DBConfig");
class App {
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeDataBase();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            res.setHeader('X-Powered-By', 'Express');
            next();
        });
        this.app.use(cookieParser());
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api/v1/', controller.router);
        });
    }
    initializeDataBase() {
        DBConfig_1.default.sync({})
            .then(() => {
            console.log('Connection has been established successfully.');
        })
            .catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map