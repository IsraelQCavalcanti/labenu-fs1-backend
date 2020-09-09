import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";

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

    await userDatabase.signup(id, name, email, nickname, password);

    return id;
  }
}
