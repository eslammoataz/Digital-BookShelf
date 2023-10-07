import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

// const db = new Sequelize('books', 'root', 'admin', {
//   dialect: 'mysql',
//   host: 'localhost',
// });

const db = new Sequelize(
  String(process.env.MYSQL_DATABASE),
  String(process.env.MYSQL_ROOT),
  // String(process.env.MYSQL_ROOT_PASSWORD),
  'admin',
  {
    host: String(process.env.DB_HOST),
    dialect: 'mysql',
  }
);

export default db;
