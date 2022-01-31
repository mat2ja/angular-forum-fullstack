export interface PostBase {
  comment: string;
}

export interface Post extends PostBase {
  userId: string;
  timestamp: Date;
  _id: string;
  user?: {
    username: string;
  };
}
