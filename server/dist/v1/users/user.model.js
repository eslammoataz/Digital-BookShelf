"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DBConfig_1 = require("../../DBConfig");
class User extends sequelize_1.Model {
}
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["MODERATOR"] = "moderator";
})(UserRole || (UserRole = {}));
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.USER,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }, passwordResetExpire: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: DBConfig_1.default,
    tableName: "User",
    indexes: [
        {
            unique: true,
            fields: ['email'],
        },
        {
            fields: ['createdAt'],
        },
    ],
});
exports.default = User;
//# sourceMappingURL=user.model.js.map