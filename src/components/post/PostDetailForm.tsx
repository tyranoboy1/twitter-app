import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "firebaseApp";
import { IoIosArrowBack } from "react-icons/io";
import { IPostProps } from "./interface/post.interface";
import PostBox from "components/post/PostBox";
import Loader from "components/loading/Loader";

const PostDetailForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPostProps | null>(null);

  /** params.id에 해당 하는 데이터 가져오는 함수 */
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap?.data() as IPostProps), id: docSnap?.id });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className="post">
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
};
export default PostDetailForm;
