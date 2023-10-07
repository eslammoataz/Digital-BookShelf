"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const book_model_1 = require("../Book/book.model");
const user_model_1 = require("../users/user.model");
const DBConfig_1 = require("../../DBConfig");
class Reviews extends sequelize_1.Model {
}
Reviews.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isWithinRange(value) {
                if (value < 0 || value > 5) {
                    throw new Error('Rating must be between 0 and 5');
                }
            },
        },
    },
}, {
    sequelize: DBConfig_1.default,
    tableName: 'reviews',
});
user_model_1.default.hasMany(Reviews, {
    foreignKey: 'userId',
});
Reviews.belongsTo(user_model_1.default, {
    foreignKey: 'userId',
});
book_model_1.default.hasMany(Reviews, {
    foreignKey: 'bookId',
});
Reviews.belongsTo(book_model_1.default, {
    foreignKey: 'userId',
});
exports.default = Reviews;
//# sourceMappingURL=reviews.model.js.map