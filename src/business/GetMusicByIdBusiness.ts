import { MusicDatabase } from "../data/MusicDatabase";
import { Music } from "../model/Music";
import { Authenticator } from "../services/Authenticator";

export class GetMusicByIdBusiness {
  constructor(
    private musicDatabase: MusicDatabase,
    private authenticator: Authenticator
  ) {}

  public async execute(id: string, token: string): Promise<Music> {
    if (!id || !token) {
      throw new Error("Id ou Token inválido!");
    }

    const verifyToken = this.authenticator.verifyToken(token);

    if (!verifyToken) {
      throw new Error("Token inválido!");
    }

    const music = await this.musicDatabase.getMusicById(id);

    return music;
  }
}
