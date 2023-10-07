import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  Model,
  Sequelize,
} from 'sequelize';
import Tag from '../../v1/tags/tags.model';
import db from '../../DBConfig';
import Categories from '../categories/categories.model';
import Author from '../Author/author.model';

class Book extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public publishDate!: string;
  public paper!: number;
  public view!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public setTags!: BelongsToManyAddAssociationMixin<Tag, number>;
  public getTags!: BelongsToManyGetAssociationsMixin<Tag>;

  public setAuthors!: BelongsToManyAddAssociationMixin<Author, number>;
  public getAuthors!: BelongsToManyGetAssociationsMixin<Author>;
}
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    paper: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cover_book: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'book',
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
Book.belongsToMany(Tag, { through: 'Book_tags' });
Tag.belongsToMany(Book, { through: 'Book_tags' });
Categories.hasMany(Book, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
});

Book.belongsTo(Categories, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
  constraints: true,
});
Author.belongsToMany(Book, {
  through: 'Author_Books',
  foreignKey: { name: 'authorId', allowNull: false },
});

Book.belongsToMany(Author, {
  through: 'Author_Books',
  foreignKey: { name: 'bookId', allowNull: false },
});

export default Book;
