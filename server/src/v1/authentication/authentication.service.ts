
import db from '../../DBConfig';
import UserModel from '../../v1/users/user.model';
import * as crypto from "crypto";
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

import resetPasswordDto from './dto/resetPasswordDto';
class AuthenticationService {
    private User = UserModel;

    public generateToken = async () => {
        const reset = crypto.randomBytes(32).toString('hex');

        const tokenDatabase = crypto
            .createHash('sha256')
            .update(reset)
            .digest('hex');
        const passwordResetExpire = Date.now() + 10 * 60 * 1000;
        const date = new Date(passwordResetExpire);

        return { tokenDatabase, reset, date };
    }

    public saveTokenToUserAccount = (async (emailUser: string) => {

        let user, resetToken;
        await db.transaction(async (t) => {
            user = await this.User.findOne({
                where: { email: emailUser },
                transaction: t,
                lock: true
            });
            if (user) {
                user.password = undefined;
                const { reset, tokenDatabase, date } = await this.generateToken();
                resetToken = reset;
                await this.User.update({ token: tokenDatabase, passwordResetExpire: date }, { where: { id: user.id }, transaction: t });
            }
        });
        await user;
        return { user, resetToken }
    })

    public checkTokenIsCorrect = async (token: string) => {
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        const user = await this.User.findOne({
            where: { token: hashedToken, passwordResetExpire: { [Op.gt]: new Date() } },
        });
        return user;
    }
    public saveNewPassword = async (newPassword: resetPasswordDto, user: UserModel) => {
        if (newPassword.password !== newPassword.passwordConfirm) return false
        const hashedPassword = await bcrypt.hash(newPassword.password, 10);

        const updatedUser = await this.User.update({ password: hashedPassword, token: null, passwordResetExpire: null }, { where: { id: user.id } });

        return updatedUser;
    }
}

export default AuthenticationService;