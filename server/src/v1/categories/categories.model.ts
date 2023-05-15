import { DataTypes, Model } from "sequelize";
import db from "../../DBConfig";
import Book from '../Book/book.model';



class Categories extends Model {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
Categories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
    sequelize: db,
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
}

);


export default Categories;