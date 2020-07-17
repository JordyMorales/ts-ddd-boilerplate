import { inject, injectable } from "inversify";
import JwtManager from "../security/JwtManager";
import TYPES from "../../domain/constants/types";
import IUserRepository from "../../domain/repositories/UserRepository";

@injectable()
export default class AuthService {
  constructor(
    @inject(TYPES.JwtManager) private jwtManager: JwtManager,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async getAccessToken(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Bad credentials");
    }
    const token = await this.jwtManager.generate({ id: user.id })
    return token;
  }

  verifyAccessToken(accessToken) {
    const decoded = this.jwtManager.decode(accessToken);
    if (!decoded) {
      throw new Error("Invalid access token");
    }
    return decoded;
  }
}
