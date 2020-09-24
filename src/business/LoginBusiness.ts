import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class LoginBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager
  ) {}

  public async execute(input: LoginBusinessInput): Promise<string> {
    if (!input) {
      throw new Error("Dados incompletos, verifique novamente!");
    }

    const user = await this.userDatabase.getUserByEmailorNickname(
      input.emailOrNickname
    );

    const isPasswordRight = await this.hashManager.compare(
      input.password,
      user.getPassword() as string
    );

    if (!isPasswordRight) {
      throw new Error("Usuário ou senha inválidos!");
    }

    const id = user.getId();
    const token = new Authenticator().generateToken({ id });

    return token;
  }
}

export interface LoginBusinessInput {
  emailOrNickname: string;
  password: string;
}
