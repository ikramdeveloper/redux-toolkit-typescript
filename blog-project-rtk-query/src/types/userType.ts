import { IdType } from ".";

export interface IUser {
  id: IdType;
  name: string;
}

export interface UserState {
  users: IUser[];
}
