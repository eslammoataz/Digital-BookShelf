import { where } from "sequelize";
import UserData from "./user.interface";
import UserModel from "./user.model";
import * as bcrypt from "bcrypt";

class UserService {
  private User = UserModel;
  public getAllUsers = async () => {
    const users = await this.User.findAll();
    return users;
  };

  public createUser = async (UserData: UserData) => {
    const { password } = UserData;
    const hashedPw = await bcrypt.hash(password, 12);
    UserData.password = hashedPw;
    const newUser = await this.User.create({ ...{ UserData } });
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
    return deletedUser;
  };
}

export default UserService;
