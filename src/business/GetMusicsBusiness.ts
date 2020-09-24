import { MusicDatabase } from "../data/MusicDatabase";
import { Music } from "../model/Music";
import { Authenticator } from "../services/Authenticator";

export class GetMusicsBusiness {
  constructor(
    private musicDatabase: MusicDatabase,
    private authenticator: Authenticator
  ) {}

  public async execute(token: string): Promise<any> {
    if (!token) {
      throw new Error("Token inválido");
    }

    const verifyToken = this.authenticator.verifyToken(token);

    if (!verifyToken) {
      throw new Error("Token inválido");
    }

    const allMusics: Music[] = await this.musicDatabase.getAllMusics();

    return allMusics;
  }
}
