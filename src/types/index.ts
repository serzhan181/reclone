export interface IUser {
  username: string;
  email: string;
  id: number | null;
  profile_picture_urn: string | null;
}

export interface AuthenticationMeta {
  access_token: string;
  user: IUser;
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

export interface GetPost {
  id: number;
  identifier: string;
  title: string;
  createdAt: string;
  subName: string;
  voteScore: number;
  commentCount: number;
  userVote: number;
  slug: string;

  postImgUrl?: string;
  subImgUrl: string;

  user: {
    username: string;
  };
}

export interface GetPostDetailed extends GetPost {
  body: string;
}

export interface GetPostComments {
  comments: {
    createdAt: string;
    username: string;
    body: string;
    id: number;

    userVote: number;
    voteScore: number;
  }[];
}

export interface CreatePostInput {
  title: string;
  body?: string;
  file?: File;
}

export interface GetSubsForDropdown {
  name: string;
  title: string;
  id: number;
}

export interface GetSub {
  description: string;
  title: string;

  bannerUrn: string;
  subImgUrn: string;
  createdAt: string;
  creator_name: string;
}

export interface CreateCommentOnPost {
  identifier: string;
  slug: string;
  body: string;
}
