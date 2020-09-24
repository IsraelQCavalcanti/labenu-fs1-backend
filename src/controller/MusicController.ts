import { Request, Response } from "express";

import { BaseDatabase } from "../data/BaseDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";

import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

import { GetMusicsBusiness } from "../business/GetMusicsBusiness";
import { GetMusicByIdBusiness } from "../business/GetMusicByIdBusiness";
import { CreateMusicBusiness } from "../business/CreateMusicBusiness";
import { MusicInputDTO } from "../model/Music";

const createMusicBusiness = new CreateMusicBusiness(
  new MusicDatabase(),
  new GenreDatabase(),
  new IdGenerator(),
  new Authenticator()
);

export class MusicController {
  public createMusic = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const input: MusicInputDTO = {
        title: req.body.title,
        file: req.body.file,
        album: req.body.album,
      };
      const genre = req.body.genre;
      const token = req.headers.authorization as string;

      await createMusicBusiness.execute(input, genre, token);

      res.status(200).send("Música criada com sucesso!");
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };

  public getMusics = async (req: Request, res: Response) => {
    try {
      const getMusicsBusiness = new GetMusicsBusiness(
        new MusicDatabase(),
        new Authenticator()
      );

      const token = req.headers.authorization as string;

      const result = await getMusicsBusiness.execute(token);

      res.status(200).send({ result });
    } catch (error) {
      res.send(400).send({ error: error.message });
    }
  };

  public getMusicById = async (req: Request, res: Response): Promise<void> => {
    try {
      const getMusicByIdBusiness = new GetMusicByIdBusiness(
        new MusicDatabase(),
        new Authenticator()
      );

      const id = req.params.id;
      const token = req.headers.authorization as string;

      const result = await getMusicByIdBusiness.execute(id, token);

      res.status(200).send({ result });
    } catch (error) {
      res.send(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}
