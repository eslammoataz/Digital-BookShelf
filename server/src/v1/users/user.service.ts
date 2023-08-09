import { where } from "sequelize";
import UserData from "./user.interface";
import UserModel from "./user.model";
import * as bcrypt from "bcrypt";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";

class UserService {
  private User = UserModel;
  public getAllUsers = async () => {
    const users = await this.User.findAll();
    return users;
  };

  public createUser = async (UserData: UserData) => {
    const { password } = UserData;
    const { email } = UserData;
    const userExist = await this.User.findOne({ where: { email } });
    if (userExist) {
      throw new UserWithThatEmailAlreadyExistsException(UserData.email);
    }
    const hashedPw = await bcrypt.hash(password, 12);
    UserData.password = hashedPw;
    const newUser = await this.User.create(UserData as any);
    return newUser;
  };

  public editUser = async (id, updateUserData: UserData) => {
    const updatedUser = await this.User.update(updateUserData, {
      where: { id: id },
    });
    return updatedUser;
  };

  public deleteUser = async (id) => {
    const deletedUser = await this.User.destroy({
      where: { id: id },
    });
    // send user a notification that his account was deleted
    return deletedUser;
  };
}

export default UserService;
