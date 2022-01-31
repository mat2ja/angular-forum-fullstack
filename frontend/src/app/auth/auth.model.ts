export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  repeatedPassword: string;
  name: string;
  email: string;
}

export interface UserData {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface User extends UserData {
  _id: string;
}
