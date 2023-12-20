import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import React from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IPostProps } from "./interface/post.interface";

/** 게시글 입력 컴포넌트 */
const PostEditForm = () => {
  const params = useParams();
  const [post, setPost] = React.useState<IPostProps | null>(null);
  const [content, setContent] = React.useState<string>();
  const handleFileUpload = () => {};
  const navigate = useNavigate();

  /** parms.id에 따라 데이터 가져오는 함수 */
  const getPost = React.useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as IPostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  /** 게시글 생성 */
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
        });
        navigate(`/posts/${post?.id}`);
        toast.success("게시글을 수정하였습니다.");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  /** textArea onChange 함수 */
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name == "content") {
      setContent(value);
    }
  };

  /** params.id가 있을때 getPost 함수 실행 */
  React.useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost]);
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
};
export default PostEditForm;
