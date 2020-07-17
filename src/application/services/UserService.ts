import User from "../../domain/entities/User";
import { inject, injectable } from "inversify";
import TYPES from "../../domain/constants/types";
import IUserService from "../../domain/services/IUserService";
import IUserRepository from "../../domain/repositories/UserRepository";

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  createUser(userEntity: User): Promise<User> {
    return this.userRepository.persist(userEntity);
  }
  deleteUser(userId: string): Promise<boolean> {
    return this.userRepository.remove(userId);
  }
  getUser(userId: string): Promise<User> {
    return this.userRepository.get(userId);
  }
  listUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
