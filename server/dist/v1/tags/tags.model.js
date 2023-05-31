"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DBConfig_1 = require("../../DBConfig");
class Tag extends sequelize_1.Model {
}
Tag.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false
    }
}, {
    sequelize: DBConfig_1.default,
    tableName: "Tags",
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
exports.default = Tag;
//# sourceMappingURL=tags.model.js.map