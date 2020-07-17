import User from "../entities/User";

export default interface IUserService {
  /**
   * Function to add a user record on the database
   * @param userEntity user data object
   */
  createUser(userEntity: User): Promise<User>;

  deleteUser(userId: string): Promise<boolean>;
  getUser(userId: string): Promise<User>;
  listUsers(): Promise<User[]>;
}
