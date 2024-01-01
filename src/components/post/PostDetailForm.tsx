import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "firebaseApp";
import { IPostProps } from "./interface/post.interface";
import PostBox from "components/post/PostBox";
import Loader from "components/loading/Loader";
import PostHeader from "components/layout/PostHeader";
import CommentForm from "components/comments/CommentForm";
import { ICommentProps } from "components/comments/interface/comments.interface";
import CommentBox from "components/comments/CommentBox";

const PostDetailForm = () => {
  const params = useParams();
  const [post, setPost] = useState<IPostProps | null>(null);

  /** params.id에 해당 하는 데이터 가져오는 함수 */
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      onSnapshot(docRef, (doc) => {
        setPost({ ...(doc?.data() as IPostProps), id: doc?.id });
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className="post">
      <PostHeader />
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post?.comments
            ?.slice(0)
            ?.reverse()
            ?.map((data: ICommentProps, index: number) => (
              <CommentBox data={data} post={post} key={index} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default PostDetailForm;
