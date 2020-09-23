import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

import { MusicBusiness } from "../business/MusicBusiness";
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { MusicInputDTO } from "../model/Music";

export class MusicController {
  private static musicBusiness = new MusicBusiness(
    new MusicDatabase(),
    new GenreDatabase(),
    new IdGenerator(),
    new Authenticator()
  );

  async createMusic(req: Request, res: Response) {
    try {
      const input: MusicInputDTO = {
        title: req.body.title,
        author: req.body.author,
        createdAt: req.body.createdAt,
        file: req.body.file,
        album: req.body.album,
      };
      const genre = req.body.genre;
      const token = req.headers.authorization as string;

      const result = await MusicController.musicBusiness.createMusic(
        input,
        genre,
        token
      );

      res.status(200).send("Música criada com sucesso!");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}
