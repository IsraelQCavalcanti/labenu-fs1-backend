import * as jwt from "jsonwebtoken";

export class Authenticator {
  // BUSCAR NO .ENV O TEMPO DE EXPIRAÇÃO DO TOKEN
  private static getExpiresIn(): number {
    return Number();
  }

  // GERAR UM TOKEN
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  // PARA AUTENTICAR UM TOKEN, PRECISAMOS EXTRAIR AS INFOS DELE:
  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

// INTERFACE QUE RECEBE O ID E ROLE DO USUÁRIO
interface AuthenticationData {
  id: string;
  role?: string;
}
