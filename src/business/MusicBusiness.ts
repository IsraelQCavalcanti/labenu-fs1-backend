import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicBusiness {
  constructor(
    private musicDatabase: MusicDatabase,
    private genreDatabase: GenreDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}
  // CRIAR MÚSICA
  async createMusic(input: MusicInputDTO, genreName: string, token: string) {
    // CASO NÃO HOUVER UM DOS DADOS, ATIRAR ERRO:
    if (
      !input.title ||
      !input.author ||
      !input.createdAt ||
      !input.album ||
      !input.file ||
      !genreName
    ) {
      throw new Error("Verifique se todos valores estão sendo inseridos");
    }

    // SE NÃO HOUVER TOKEN, ATIRAR ERRO:
    if (!token) {
      throw new Error(
        "Você necessita de um token para realizar esta operação!"
      );
    }

    // AUTENTICAR O TOKEN:
    const authenticationData = this.authenticator.getData(token);

    // SE O TOKEN NÃO FOR AUTENTICADO COM O ID, ATIRAR ERRO:
    if (!authenticationData.id) {
      throw new Error("Você necessita de um token válido!");
    }

    // PEGAR O ID DO GÊNERO COM O NAME:
    const genreId = await this.genreDatabase.getGenreByName(genreName);

    // SE O GÊNERO FOR INVÁLIDO, ATIRAR ERRO:
    if (!genreId) {
      throw new Error("Gênero inválido");
    }

    // GERAR UM ID PARA A MÚSICA:
    const musicId = this.idGenerator.generate();

    // CONTATO COM O DATABASE:
    await this.musicDatabase.createMusic(
      musicId,
      input.title,
      input.author,
      input.createdAt,
      input.file,
      input.album,
      authenticationData.id
    );

    // INSERIR OS DADOS NA TABELA DE GENERO_MUSICA
    await this.genreDatabase.insertGenreToMusic(musicId, genreId);
  }
}
