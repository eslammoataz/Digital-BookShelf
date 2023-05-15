
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../../v1/interfaces/dataStoredInToken.interface';
import AuthenticationTokenMissingException from '../../v1/exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../../v1/exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../users/user.model';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const secret = "process.env.JWT_SECRET";
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findByPk(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;