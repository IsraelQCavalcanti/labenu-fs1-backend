import * as jwt from "jsonwebtoken";

export class Authenticator {
  // GERAR UM TOKEN:
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id: input.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  // PARA AUTENTICAR UM TOKEN, PRECISAMOS EXTRAIR AS INFOS DELE:
  public verifyToken(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return { id: payload.id };
  }
}

// INTERFACE QUE RECEBE O ID DO USUÁRIO:
export interface AuthenticationData {
  id: string;
}
