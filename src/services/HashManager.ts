import * as bcrypt from "bcryptjs";

export class HashManager {
  // PARA ENCRIPTAR A SENHA ANTES DE ENVIAR PARA O BANCO DE DADOS
  public async hash(text: string): Promise<string> {
    const rounds = 12;
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(text, salt);
    return result;
  }

  // COMPARAR O PASSWORD ENVIADO NO LOGIN COM O DO BANCO DE DADOS
  public async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
