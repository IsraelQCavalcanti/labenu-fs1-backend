import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { Music, MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class CreateMusicBusiness {
  constructor(
    private musicDatabase: MusicDatabase,
    private genreDatabase: GenreDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  // CRIAR MÚSICA
  public async execute(
    musicInputDatas: MusicInputDTO,
    musicGenresName: string[],
    token: string
  ) {
    // CASO NÃO HOUVER UM DOS DADOS, ATIRAR ERRO:
    if (
      !musicInputDatas.title ||
      !musicInputDatas.file ||
      !musicInputDatas.album
    ) {
      throw new Error("Verifique se todos valores estão sendo inseridos");
    }

    // PEGAR O ID DO GÊNERO COM O NAME:
    const genreId = await this.genreDatabase.getGenresIdByName(musicGenresName);

    if (genreId.length < 1) {
      throw new Error("Esse gênero não existe");
    }

    // SE NÃO HOUVER TOKEN, ATIRAR ERRO:
    if (!token) {
      throw new Error(
        "Você necessita de um token para realizar esta operação!"
      );
    }

    // PRECISAMOS VERIFICAR O TOKEN PARA VALIDAR O ID:
    const verifyToken = this.authenticator.verifyToken(token);

    if (!verifyToken.id) {
      throw new Error("Id inválido!");
    }

    // SE O GÊNERO FOR INVÁLIDO, ATIRAR ERRO:
    if (!genreId) {
      throw new Error("Gênero inválido");
    }

    // GERAR UM ID PARA A MÚSICA:
    const musicId = this.idGenerator.generate();

    // CONTATO COM O DATABASE:
    await this.musicDatabase.createMusic(
      new Music(
        musicId,
        musicInputDatas.title,
        verifyToken.id,
        musicInputDatas.file,
        musicInputDatas.album
      )
    );

    // INSERIR OS DADOS NA TABELA DE GENERO_MUSICA
    await this.genreDatabase.insertGenreToMusic(musicId, genreId);
  }
}
