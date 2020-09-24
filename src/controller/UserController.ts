import { Request, Response } from "express";

import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";

import { SignupBusiness } from "../business/SignupBusiness";
import { LoginBusiness } from "../business/LoginBusiness";

import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserController {
  public signup = async (req: Request, res: Response) => {
    try {
      const signupBusiness = new SignupBusiness(
        new UserDatabase(),
        new HashManager(),
        new IdGenerator()
      );

      const input = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
      };

      if (!input.name || !input.email || !input.password || !input.nickname) {
        throw new Error("Verifique se todos dados foram inseridos");
      }

      if (input.password < 6) {
        throw new Error("Sua senha precisa ter pelo menos 6 dígitos!");
      }
      const user = await signupBusiness.execute(input);

      const authenticator = new Authenticator();

      const token = authenticator.generateToken({
        id: user,
      });

      res.status(200).send({ token });

      return token;
    } catch (err) {
      res.status(400).send({ message: err.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const loginBusiness = new LoginBusiness(
        new UserDatabase(),
        new HashManager()
      );
      const input = {
        emailOrNickname: req.body.emailOrNickname,
        password: req.body.password,
      };

      const token = await loginBusiness.execute(input);

      if (!input.emailOrNickname || !input.password) {
        throw new Error("Verifique se todos dados foram inseridos");
      }

      res.status(200).send({ token });
    } catch (err) {
      res.status(err.customErrorCode || 400).send({
        message: err.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}
