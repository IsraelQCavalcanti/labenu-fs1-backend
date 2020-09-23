import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  // CRIAR UM NOVO USUÁRIO:
  public async createUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
  ) {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          nickname,
          password,
        })
        .into(this.tableNames.users);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // BUSCAR USUÁRIO PELO EMAIL OU NICKNAME (P/ VERIFICAR QUANDO HOUVER LOGIN):
  public async getUserByEmailorNickname(
    emailOrNickname: string
  ): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.users)
        .where({ email: emailOrNickname })
        .orWhere({ nickname: emailOrNickname });

      return User.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
