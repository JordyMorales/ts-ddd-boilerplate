import { Container } from "inversify";
import TYPES from "../../domain/constants/types";
import JwtManager from "../../application/security/JwtManager";
import UserService from "../../application/services/UserService";
import UserRepositorySQL from "../data_access/sequelize/repositories/UserRepositorySQL";
import UserRepositoryNoSQL from "../data_access/mongoose/repositories/UserRepositoryNoSQL";
import environment from "../config/environment";
import constants from "../config/constants";
import AuthService from "../../application/services/AuthService";

const container = new Container();

container.bind<JwtManager>(TYPES.JwtManager).to(JwtManager).inSingletonScope();

container
  .bind<AuthService>(TYPES.AuthService)
  .to(AuthService)

container
  .bind<UserService>(TYPES.UserService)
  .to(UserService)

container
  .bind(TYPES.UserRepositoryNoSQL)
  .to(UserRepositoryNoSQL)
  .inSingletonScope();

container
  .bind(TYPES.UserRepositorySQL)
  .to(UserRepositorySQL)
  .inSingletonScope();

container.bind(TYPES.UserRepository).toFactory(() => {
  if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    return container.get(TYPES.UserRepositoryNoSQL);
  }
  return container.get(TYPES.UserRepositorySQL);
});

export { container };
