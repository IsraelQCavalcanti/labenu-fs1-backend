import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {
  // SELECIONAR O ID DO GÊNERO PELO NAME INSERIDO
  public async getGenresIdByName(name: string[]): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("id")
        .from(this.tableNames.genre)
        .whereIn("name", name);

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // INSERIR O GÊNERO E MUSICA NA TABELA QUE JUNTA AMBOS
  public async insertGenreToMusic(musicId: string, genreId: any[]) {
    const musicGenreInsert = genreId.map((genre) => ({
      music_id: musicId,
      genre_id: genre.id,
    }));
    try {
      await this.getConnection()
        .insert(musicGenreInsert)
        .into(this.tableNames.musicWithGenreId);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
