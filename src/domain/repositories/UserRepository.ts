import User from "../entities/User";
import { injectable } from "inversify";

@injectable()
export default abstract class UserRepository {
  persist(userEntity: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(userEntity: User): Promise<User | boolean> {
    throw new Error("Method not implemented.");
  }
  remove(userId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  get(userId): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
