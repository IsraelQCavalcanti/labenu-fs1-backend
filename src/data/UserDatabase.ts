import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "User_labesound";

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
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // BUSCAR USUÁRIO PELO EMAIL (P/ VERIFICAR QUANDO HOUVER LOGIN):
  public async getUserByEmailorNickname(
    emailOrNickname: string
  ): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email: emailOrNickname })
        .orWhere({ nickname: emailOrNickname });

      return User.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
