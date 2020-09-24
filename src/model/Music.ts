// INTERFACE PARA CRIAR MUSICA
export interface MusicInputDTO {
  title: string;
  // author: string; QUEM ESTIVER LOGADO, SERÁ O AUTHOR
  // createdAt: Date; NÃO PRECISA POIS A TABELA CRIARÁ SOZINHA
  file: string;
  album: string;
}

// INTERFACE PARA O GÊNERO
export interface GenreInpuDTO {
  id: string;
  name: GenreName[];
}

// ENUM PARA ESCOLHA DO GÊNERO
export enum GenreName {
  AXÉ = "AXÉ",
  BLUES = "BLUES",
  CLASSICA = "CLÁSSICA",
  COUNTRY = "COUNTRY",
  ELETRONICA = "ELETRÔNICA",
  FORRÓ = "FORRÓ",
  FUNK = "FUNK",
  GOSPEL = "GOSPEL",
  GROOVE = "GROOVE",
  HIPHOP = "HIP HOP",
  JAZZ = "JAZZ",
  MPB = "MPB",
  OUTRO = "OUTRO",
  PAGODE = "PAGODE",
  POP = "POP",
  RAP = "RAP",
  REGGAE = "REGGAE",
  ROCK = "ROCK",
  SAMBA = "SAMBA",
  SERTANEJO = "SERTANEJO",
}

export class Music {
  constructor(
    private id: string,
    private title: string,
    private author: string,
    //private createdAt: Date, NÃO PRECISA POIS A TABELA CRIARÁ SOZINHA
    private file: string,
    private album: string
  ) {}

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.title;
  }

  public getAuthor() {
    return this.author;
  }

  public getFile() {
    return this.file;
  }
  public getAlbum() {
    return this.album;
  }

  static toMusicModel(music: any): Music {
    return new Music(
      music.id,
      music.title,
      music.author,
      music.file,
      music.album
    );
  }
}
