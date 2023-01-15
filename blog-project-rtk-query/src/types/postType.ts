import { ErrorType, IdType } from ".";

export interface IReaction {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export type ReactionType = keyof IReaction;

export interface IPost {
  id: IdType;
  title: string;
  body: string;
  datetime: Date;
  userId: IdType;
  reactions: IReaction;
}

export enum PostValue {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export type PostState = {
  posts: IPost[];
  value: PostValue;
  error: ErrorType;
  count: Number;
};
