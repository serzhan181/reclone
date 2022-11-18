export interface IUser {
  username: string;
  email: string;
  id: number | null;
  profile_picture_urn: string | null;
}

export interface IMe {
  authenticated: boolean;
  user: IUser;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserSignUp {
  username: string;
  password: string;
  email: string;
}

export interface IPostMinimal {
  id: number;
  identifier: string;
  title: string;
  postImgUrn?: string;
  createdAt: string;
  subName: string;
  voteScore: number;
  commentCount: number;
  userVote: number;
  user: {
    username: string;
  };
}

export interface CreatePostInput {
  title: string;
  body?: string;
  file?: File;
}
