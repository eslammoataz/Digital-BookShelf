import { DataTypes, Model } from "sequelize";
import db from "../../DBConfig";
import Categories from '../categories/categories.model';



class Book extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public author!: string;
    public publishDate!: string;
    public paper!: number;
    public view!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        publishDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        paper: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
    sequelize: db,
    tableName: "book",
    indexes: [
        {
            fields: ['name'],
        },
        {
            fields: ['createdAt'],
        },
    ],
}

);
Categories.hasMany(Book, {
    foreignKey: {
        name: 'categoryId',
    },
});

Book.belongsTo(Categories, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    },
    constraints: true
});
export default Book;
