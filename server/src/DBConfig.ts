import { Sequelize } from "sequelize"

const db = new Sequelize(
    String(process.env.MYSQL_DATABASE),
    String(process.env.MYSQL_ROOT),
    String(process.env.MYSQL_ROOT_PASSWORD),
    {
        host: String(process.env.DB_HOST),
        dialect: 'mysql',
    }
);
export default db