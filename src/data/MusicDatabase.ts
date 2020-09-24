import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {
  // CRIAR UMA NOVA MÚSICA
  public async createMusic(music: Music): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: music.getId(),
          title: music.getTitle(),
          author: music.getAuthor(),
          file: music.getFile(),
          album: music.getAlbum(),
        })

        .into(this.tableNames.music);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // BUSCAR TODAS MUSICAS EXISTENTES
  public async getAllMusics(): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.music);

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // BUSCAR MÚSICA PELO ID
  public async getMusicById(id: string): Promise<Music> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.music)
        .where({ id });

      return Music.toMusicModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
