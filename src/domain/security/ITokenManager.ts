export interface DecodedToken {
  id: string;
  iat: number;
}

export interface ITokenManager {
  generate(payload): string;
  decode(accessToken: string): DecodedToken;
}
