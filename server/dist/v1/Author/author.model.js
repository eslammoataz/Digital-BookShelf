"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = require("../users/user.model");
const DBConfig_1 = require("../../DBConfig");
class Author extends sequelize_1.Model {
}
Author.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: DBConfig_1.default,
    tableName: 'author',
});
Author.belongsTo(user_model_1.default, { foreignKey: 'userId' });
user_model_1.default.hasOne(Author, { foreignKey: 'userId' });
exports.default = Author;
//# sourceMappingURL=author.model.js.map