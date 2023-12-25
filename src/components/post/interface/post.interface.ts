/** 게시물 인터페이스 */
export interface IPostBoxProps {
  post: IPostProps;
}

export interface IPostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
  hashTags?: string[];
  imageUrl?: string;
}
