import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { LoginInputDTO, User } from "../model/User";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
  public async signup(
    name: string,
    email: string,
    nickname: string,
    password: string
  ): Promise<string> {
    // GERAR UM NOVO ID
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const userDatabase = new UserDatabase();

    await userDatabase.createUser(id, name, email, nickname, password);

    return id;
  }

  // BUSCAR USUÁRIO PELO EMAIL OU NICKANAME:
  public async getUserByEmailOrNickname(input: LoginInputDTO) {
    // BUSCAR NO BANCO O EMAIL PASSADO PELO USUÁRIO, SE BATER, RETORNARÁ TODAS AS INFOS DO USUÁRIO
    const userDatabase = new UserDatabase();
    const user: User = await userDatabase.getUserByEmailorNickname(
      input.emailOrNickname
    );

    // COMPARAR SE A SENHA PASSADA PELO USUÁRIO E A SENHA DO BANCO SÃO IGUAIS:
    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      input.password,
      user.getPassword()
    );

    if (!hashCompare) {
      throw new Error("Senha ou usuário inválido!");
    }

    return user;
  }
}
