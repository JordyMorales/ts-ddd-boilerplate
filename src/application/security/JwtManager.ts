import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";
import {  ITokenManager,  DecodedToken } from "../../domain/security/ITokenManager";

const JWT_SECRET_KEY = "JWT_SECRET_KEY!";

@injectable()
export default class JwtManager implements ITokenManager {
  generate(payload): string {
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    return token;
  }
  decode(token: string): DecodedToken {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    return decodedToken as DecodedToken;
  }
}
