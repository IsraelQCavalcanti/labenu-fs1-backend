import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {
  public static TABLE_NAME = "music_labesound";

  public async createMusic(
    id: string,
    title: string,
    author: string,
    createdAt: Date,
    file: string,
    album: string,
    userId: string
  ) {
    try {
      await this.getConnection()
        .insert({
          id: id,
          title: title,
          author: author,
          createdAt: new Date(createdAt),
          file: file,
          album: album,
          user_id: userId,
        })
        .into(MusicDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
