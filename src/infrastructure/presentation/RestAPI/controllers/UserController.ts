import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost,httpGet } from "inversify-express-utils";
import TYPES from "../../../../domain/constants/types";
import UserService from "../../../../application/services/UserService";
import AuthService from "../../../../application/services/AuthService";
import User from "../../../../domain/entities/User";
import authMiddleware from '../middlewares/auth.middleware'
@controller("/user")
export default class UserController {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  @httpPost("/login")
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const creds = await this.authService.getAccessToken(email, password);
    return res.send(creds);
  }

  @httpGet("/profile", authMiddleware)
  public async getProfile(req: Request, res: Response) {
     return res.send(req["user"]);
  }

  @httpGet("/", authMiddleware)
  public async getUsers(req: Request, res: Response) {
    const users = await this.userService.listUsers()
     return res.send(users);
  }

  @httpPost("/")
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, password } = req.body;
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    const userCreated = await this.userService.createUser(user as User);

    return res.status(201).send(userCreated);
  }
}
