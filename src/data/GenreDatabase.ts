import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {
  public static TABLE_GENRE = "genre_labesound";
  public static TABLE_MUSIC_GENRE = "music_genre_labesound";

  // SELECIONAR O ID DO GÊNERO PELO NAME INSERIDO
  public async getGenre(name: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("id")
        .from(GenreDatabase.TABLE_MUSIC_GENRE)
        .where({ name });
      return result[0].id;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // INSERIR O GÊNERO E MUSICA NA TABELA QUE JUNTA AMBOS
  public async insertGenreToMusic(musicId: string, genreId: string) {
    try {
      console.log("Music id: " + musicId);
      console.log("Genre id: " + genreId);
      await this.getConnection()
        .insert({
          music_id: musicId,
          genre_id: genreId,
        })
        .into(GenreDatabase.TABLE_MUSIC_GENRE);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
