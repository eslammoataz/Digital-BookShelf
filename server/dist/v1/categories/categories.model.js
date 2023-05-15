"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DBConfig_1 = require("../../DBConfig");
class Categories extends sequelize_1.Model {
}
Categories.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: DBConfig_1.default,
    tableName: "categories",
    indexes: [
        {
            unique: true,
            fields: ['name']
        },
        {
            fields: ['createdAt'],
        },
    ],
});
exports.default = Categories;
//# sourceMappingURL=categories.model.js.map