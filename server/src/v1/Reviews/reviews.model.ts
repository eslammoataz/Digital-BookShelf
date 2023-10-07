import { DataTypes, Model } from 'sequelize';
import Books from '../Book/book.model';
import User from '../users/user.model';
import db from '../../DBConfig';

class Reviews extends Model {
  public id!: number;
}

Reviews.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isWithinRange(value) {
          if (value < 0 || value > 5) {
            throw new Error('Rating must be between 0 and 5');
          }
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: 'reviews',
  }
);

User.hasMany(Reviews, {
  foreignKey: 'userId',
});

Reviews.belongsTo(User, {
  foreignKey: 'userId',
});

Books.hasMany(Reviews, {
  foreignKey: 'bookId',
});

Reviews.belongsTo(Books, {
  foreignKey: 'userId',
});

export default Reviews;
