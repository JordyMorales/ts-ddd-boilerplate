import { injectable } from "inversify";
import User from "../../../../domain/entities/User";
import UserRepository from "../../../../domain/repositories/UserRepository";

@injectable()
export default class UserRepositorySQL extends UserRepository {
  model = require("../sequelize").sequelize.model("user");
  constructor() {
    super();
  }
  persist(userEntity: User): Promise<User> {
    return new Promise(async (reslve, reject) => {
      const { firstName, lastName, email, password } = userEntity;
      const createdUser = await this.model.create({ firstName, lastName, email, password });
      await createdUser.save();
      const user = new User(createdUser.firstName, createdUser.lastName, createdUser.email, createdUser.password, createdUser._id)
      reslve(user);
    });
  }
  update(userEntity: User): Promise<User | boolean> {
    return new Promise(async (reslve, reject) => {
      const foundUser = await this.model.findByPk(userEntity.id);

      if (!foundUser) reslve(false);

      const { firstName, lastName, email, password } = userEntity;
      const updatedUser = await foundUser.update({ firstName, lastName, email, password });
      const user = new User(updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.password, updatedUser.id)
      reslve(user);
    });
  }
  remove(userId: string): Promise<boolean> {
    return new Promise(async (reslve, reject) => {
      const seqUser = await this.model.findByPk(userId);
      if (seqUser) {
        return seqUser.destroy();
      }
      return false;
    });
  }
  get(userId: any): Promise<User> {
    return new Promise(async (reslve, reject) => {
      const foundUser = await this.model.findByPk(userId);
      const user = new User(foundUser.firstName, foundUser.lastName, foundUser.email, foundUser.password, foundUser.id)
      reslve(user);
    });
  }
  getByEmail(email: string): Promise<User> {
    return new Promise(async (reslve, reject) => {
      const foundUser = await this.model.findOne({ where: { email } });
      const user = new User(foundUser.firstName, foundUser.lastName, foundUser.email, foundUser.password, foundUser.id)
      reslve(user);
    });
  }
  find(): Promise<User[]> {
    return new Promise(async (reslve, reject) => {
      const seqUsers = await this.model.findAll();
      const users = seqUsers.map((user) => {
        const createdUser = new User(user.firstName, user.lastName, user.email, user.password, user.id)
        return createdUser;
      });
      reslve(users);
    });
  }
}
