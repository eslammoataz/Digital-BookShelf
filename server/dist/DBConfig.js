"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
// const db = new Sequelize('books', 'root', 'admin', {
//   dialect: 'mysql',
//   host: 'localhost',
// });
const db = new sequelize_1.Sequelize(String(process.env.MYSQL_DATABASE), String(process.env.MYSQL_ROOT), 
// String(process.env.MYSQL_ROOT_PASSWORD),
'admin', {
    host: String(process.env.DB_HOST),
    dialect: 'mysql',
});
exports.default = db;
//# sourceMappingURL=DBConfig.js.map