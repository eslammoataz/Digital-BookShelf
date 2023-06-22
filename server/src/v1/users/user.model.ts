import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  Model,
} from "sequelize";
import db from "../../DBConfig";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public token!: string;
  public passwordResetExpire!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}
User.init(
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
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.USER,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    passwordResetExpire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "User",
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["createdAt"],
      },
    ],
  }
);

export default User;
export { UserRole };
