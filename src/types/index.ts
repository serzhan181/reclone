export interface IUser {
  username: string;
  email: string;
  id: string | null;
  profile_picture_urn: string | null;
}

export interface AuthenticationMeta {
  access_token: string;
  user: IUser;
}

export interface IMe {
  authenticated: boolean;
  user?: IUser;
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
  id: string;
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
    body: string;
    id: string;

    userVote: number;
    voteScore: number;

    user: Pick<IUser, "username" | "profile_picture_urn">;
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
  id: string;

  subImgUrl: string;
}

export interface GetSubsPopular {
  id: string;
  name: string;
  subImgUrl: string;

  isUserSubscribed: boolean;
}

export interface GetSubMinimal {
  name: string;
  title: string;

  subImgUrl: string;
}

export interface GetSub extends GetSubMinimal {
  description: string;

  bannerImgUrl: string;
  createdAt: string;
  creator_name: string;

  isUserSubscribed: boolean;
  subsribersCount: number;
}

export interface CreateSubInput {
  name: string;
  description: string;
  title: string;
  subImg?: File;
  bannerImg?: File;
}

export interface CreateCommentOnPost {
  identifier: string;
  slug: string;
  body: string;
}
