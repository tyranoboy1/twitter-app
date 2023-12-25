import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "firebaseApp";
import { IPostProps } from "./interface/post.interface";
import PostBox from "components/post/PostBox";
import Loader from "components/loading/Loader";
import PostHeader from "components/layout/PostHeader";

const PostDetailForm = () => {
  const params = useParams();
  const [post, setPost] = useState<IPostProps | null>(null);

  /** params.id에 해당 하는 데이터 가져오는 함수 */
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      console.log("db", db);
      setPost({ ...(docSnap?.data() as IPostProps), id: docSnap?.id });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className="post">
      <PostHeader />
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
};
export default PostDetailForm;
