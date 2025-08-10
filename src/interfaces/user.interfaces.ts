export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserGetById {
  id?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserDelete {
  id: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}