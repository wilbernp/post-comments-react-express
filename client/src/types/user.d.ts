export interface IUser {
    email: string;
    username: string;
    isAuth:boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token:string;
}

