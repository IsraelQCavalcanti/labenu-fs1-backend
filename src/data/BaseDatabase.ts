import knex from "knex";
import Knex from "knex";

export abstract class BaseDatabase {
  // GUARDAR OS NOMES DAS TABELAS UTILIZADAS
  protected tableNames = {
    users: "User_labesound",
    music: "Music_labesound",
    genre: "Genre_labesound",
    musicWithGenreId: "Music_genre_labesound",
  };

  // CASO NÃO EXISTA O .ENV COM AS INFOS NECESSÁRIAS, JOGAR UM ERRO
  private validateSetupData() {
    if (
      !process.env.DB_HOST ||
      !process.env.DB_USER ||
      !process.env.DB_PASSWORD ||
      !process.env.DB_DATABASE_NAME
    ) {
      throw new Error(
        "Estão faltando as credenciais de acesso. Você se lembrou de criar o arquivo .env?"
      );
    }
  }

  private static connection: Knex | null = null;

  // VERIFICAR CONEXÃO COM O BANCO DE DADOS
  protected getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_NAME,
        },
      });
    }

    return BaseDatabase.connection;
  }

  // FINALIZAR A CONEXÃO AUTOMATICAMENTE
  public static async destroyConnection(): Promise<void> {
    if (BaseDatabase.connection) {
      await BaseDatabase.connection.destroy();
      BaseDatabase.connection = null;
    }
  }
}
