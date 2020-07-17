import { container } from '../../../ioc/ioc-container'
import { Request, Response, NextFunction } from "express";
import AuthService from "../../../../application/services/AuthService";
import UserService from '../../../../application/services/UserService';
import TYPES from '../../../../domain/constants/types';

export default async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const authService = container.get<AuthService>(TYPES.AuthService);
        const userService = container.get<UserService>(TYPES.UserService);
        const token = req.headers.authorization.replace(/Bearer /, '');

        const decodedToken = await authService.verifyAccessToken(token);
        const user = await userService.getUser(decodedToken.id)
        req["user"] = user;
        next();
    } catch (error) {
        res.status(401).send();
        return;
    }
}