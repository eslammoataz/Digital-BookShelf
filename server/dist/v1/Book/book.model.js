"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tags_model_1 = require("../../v1/tags/tags.model");
const DBConfig_1 = require("../../DBConfig");
const categories_model_1 = require("../categories/categories.model");
const author_model_1 = require("../Author/author.model");
class Book extends sequelize_1.Model {
}
Book.init({
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
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    publishDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    paper: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    view: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    cover_book: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: DBConfig_1.default,
    tableName: 'book',
    indexes: [
        {
            fields: ['name'],
        },
        {
            fields: ['createdAt'],
        },
    ],
});
Book.belongsToMany(tags_model_1.default, { through: 'Book_tags' });
tags_model_1.default.belongsToMany(Book, { through: 'Book_tags' });
categories_model_1.default.hasMany(Book, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false,
    },
});
Book.belongsTo(categories_model_1.default, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false,
    },
    constraints: true,
});
author_model_1.default.belongsToMany(Book, {
    through: 'Author_Books',
    foreignKey: { name: 'authorId', allowNull: false },
});
Book.belongsToMany(author_model_1.default, {
    through: 'Author_Books',
    foreignKey: { name: 'bookId', allowNull: false },
});
exports.default = Book;
//# sourceMappingURL=book.model.js.map