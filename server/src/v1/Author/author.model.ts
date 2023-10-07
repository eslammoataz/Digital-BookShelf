import { DataTypes, Model } from 'sequelize';
import Books from '../Book/book.model';
import User from '../users/user.model';

import db from '../../DBConfig';

class Author extends Model {
  public id!: number;
  public name!: string;
}
Author.init(
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
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'author',
  }
);

Author.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Author, { foreignKey: 'userId' });

export default Author;
