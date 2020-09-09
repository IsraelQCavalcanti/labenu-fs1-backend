import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { UserInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  public async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        nickname: req.body.nickname,
        password: req.body.password,
      };

      // PARA GERAR UMA SENHA ENCRIPTADA COM A SENHA ENVIADA:
      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(input.password);

      // GUARDAR AS INFOS NO BANCO DE DADOS:
      const userBusiness = new UserBusiness();
      const userId = await userBusiness.signup(
        input.name,
        input.email,
        input.nickname,
        hashPassword
      );

      // GERAR UM TOKEN PARA O NOVO USUÁRIO:
      const authenticator = new Authenticator();
      const accessToken = authenticator.generateToken({ id: userId });

      res
        .status(200)
        .send("Usuário criado com sucesso!" + { token: accessToken });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}
