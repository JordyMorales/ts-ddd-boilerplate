import { injectable } from "inversify";
import UserModel from "../schemas/User";
import User from "../../../../domain/entities/User";
import UserRepository from "../../../../domain/repositories/UserRepository";

@injectable()
export default class UserRepositoryNoSQL extends UserRepository {
  constructor() {
    super();
  }
  persist(userEntity: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const { firstName, lastName, email, password } = userEntity;
      const createdUser = new UserModel({ firstName, lastName, email, password });
      await createdUser.save();
      const user = new User(createdUser.firstName, createdUser.lastName, createdUser.email, createdUser.password, createdUser.id)
      resolve(user);
    });
  }
  update(userEntity: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { id, firstName, lastName, email, password } = userEntity;
      const mongooseUser = UserModel.findByIdAndUpdate(id, { firstName, lastName, email, password });
      if (!mongooseUser) resolve(false);
      resolve(true);
    });
  }
  remove(userId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await UserModel.findOneAndDelete({ id: userId })
      resolve(true);
    });
  }
  get(userId: any): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const foundUser = await UserModel.findById(userId);
      if (foundUser) {
        const user = new User(foundUser.firstName, foundUser.lastName, foundUser.email, foundUser.password, foundUser.id)
        resolve(user);
      }
    });
  }
  getByEmail(email: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const foundUser = await UserModel.findOne({ email });
      if (foundUser) {
        const user = new User(foundUser.firstName, foundUser.lastName, foundUser.email, foundUser.password, foundUser.id)
        resolve(user);
      }
    });
  }
  find(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      const foundUsers = await UserModel.find();
      const users = foundUsers.map((user) => {
        const createdUser = new User(user.firstName, user.lastName, user.email, user.password, user.id)
        return createdUser;
      });
      resolve(users);
    });
  }
}