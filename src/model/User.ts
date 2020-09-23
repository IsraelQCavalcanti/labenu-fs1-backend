// INTERFACE PARA SIGNUP
export interface UserInputDTO {
  email: string;
  name: string;
  nickname: string;
  password: string;
}

// INTERFACE PARA LOGIN
export interface LoginInputDTO {
  emailOrNickname: string;
  password: string;
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private nickname: string,
    private password: string
  ) {}

  // GETTERS
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getNickname() {
    return this.nickname;
  }

  getPassword() {
    return this.password;
  }

  public static toUserModel(object: any): User {
    return new User(
      object.id,
      object.name,
      object.email,
      object.nickname,
      object.password
    );
  }
}
