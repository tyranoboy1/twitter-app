import { IPostProps } from "components/post/interface/post.interface";

export interface ICommentFormProps {
  post: IPostProps | null;
}

export interface ICommentBoxProps {
  data: ICommentProps;
  post: IPostProps;
}

export interface ICommentProps {
  comment: string;
  uid: string;
  email: string;
  createdAt: string;
}
