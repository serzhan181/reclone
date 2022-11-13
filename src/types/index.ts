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
  identifier: string;
  title: string;
  postImgUrn?: string;
  createdAt: string;
  user: {
    username: string;
  };
}
