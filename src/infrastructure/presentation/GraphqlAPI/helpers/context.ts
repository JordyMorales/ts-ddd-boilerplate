import "reflect-metadata";
import { Container, inject, injectable } from "inversify";

import User from "../../../../domain/entities/User";
import TYPES from "../../../../domain/constants/types";
import AuthService from "../../../../application/services/AuthService";
import UserService from "../../../../application/services/UserService";

export const Type = Symbol.for('ContextProvider');

export interface IContextProvider {
  authService: AuthService;
  userService: UserService;
}

export interface IContext {
  authService: AuthService;
  userService: UserService;
  headers: { authorization?: string };
  user?: User;
}

@injectable()
class ContextProvider implements IContextProvider {
  @inject(TYPES.AuthService)
  public authService: AuthService;

  @inject(TYPES.UserService)
  public userService: UserService;
}

export default {
  bind(container: Container): void {
    container.bind<IContextProvider>(Type).to(ContextProvider).inRequestScope();
  }
}
