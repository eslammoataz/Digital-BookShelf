import { DataTypes, Model } from "sequelize";
import db from "../../DBConfig";



class Tag extends Model {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    }, {
    sequelize: db,
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
}

);


export default Tag;