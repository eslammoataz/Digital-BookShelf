import { NextFunction, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import NotAllowedToDoThisAction from '../../v1/exceptions/NotAllowedToDoThisAction';
import RequestWithUser from '../../v1/interfaces/requestWithUser.interface';

const restrictTo = (...roles: any[]) =>
    expressAsyncHandler(async (request: RequestWithUser, response: Response, next: NextFunction) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(request.user.role)) {
            return next(
                new NotAllowedToDoThisAction()
            );
        }
        next();
    });

export default restrictTo;