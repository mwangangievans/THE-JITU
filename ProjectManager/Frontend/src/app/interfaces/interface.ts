export interface userLoginInterface {
  email:string;
  password:string;
}

export interface loginResponce {
  message:string;
  token:string
}

export interface role{
  name: string,
  role: string,
  email: string
}
