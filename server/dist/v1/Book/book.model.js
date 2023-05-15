"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DBConfig_1 = require("../../DBConfig");
const categories_model_1 = require("../categories/categories.model");
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    publishDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    paper: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    view: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize: DBConfig_1.default,
    tableName: "book",
    indexes: [
        {
            fields: ['name'],
        },
        {
            fields: ['createdAt'],
        },
    ],
});
categories_model_1.default.hasMany(Book, {
    foreignKey: {
        name: 'categoryId',
    },
});
Book.belongsTo(categories_model_1.default, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    },
    constraints: true
});
exports.default = Book;
//# sourceMappingURL=book.model.js.map