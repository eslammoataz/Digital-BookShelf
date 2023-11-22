import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../../v1/interfaces/dataStoredInToken.interface';
import AuthenticationTokenMissingException from '../../v1/exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../../v1/exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../users/user.model';
import expressAsyncHandler = require('express-async-handler');

const authMiddleware = expressAsyncHandler(
  async (request: RequestWithUser, response: Response, next: NextFunction) => {
    const cookies = request.cookies;
    let token: string;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1];
    } else if (cookies && cookies.Authorization) {
      token = cookies.Authorization;
    }
    console.log(token);
    if (!token) {
      next(new AuthenticationTokenMissingException());
    }

    const secret = process.env.JWT_SECRET_KEY;
    const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
    console.log(verificationResponse);
    const id = verificationResponse._id;
    const user = await userModel.findByPk(id);
    if (!user) {
      next(new WrongAuthenticationTokenException());
    }

    request.user = user;
    next();
  }
);

export default authMiddleware;
