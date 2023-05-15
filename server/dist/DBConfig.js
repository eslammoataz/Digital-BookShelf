"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(String(process.env.MYSQL_DATABASE), String(process.env.MYSQL_ROOT), String(process.env.MYSQL_ROOT_PASSWORD), {
    host: String(process.env.DB_HOST),
    dialect: 'mysql',
});
exports.default = db;
//# sourceMappingURL=DBConfig.js.map