import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IPostBoxProps } from "./interface/post.interface";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db, storage } from "firebaseApp";
import { deleteObject, ref } from "firebase/storage";
import FollowingBox from "components/following/FollowingBox";
import useTranslation from "hooks/useTranslation";

/** 게시글 리스트 박스 컴포넌트 */
const PostBox = ({ post }: IPostBoxProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const t = useTranslation();
  /** 게시글 삭제함수 */
  const handleDelete = async () => {
    const confirm = window.confirm("삭제");
    if (confirm) {
      /** 이미지 삭제 */
      const imageRef = ref(storage, post?.imageUrl);
      if (post?.imageUrl) {
        deleteObject(imageRef).catch((error) => {
          console.log(error);
        });
      }
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  /** 좋아요 버튼 함수 */
  const toggleLike = async () => {
    const postRef = doc(db, "posts", post.id);
    /** 사용자가 좋아요를 미리 한경우에 좋아요를 취소한다. */
    if (user?.uid && post?.likes?.includes(user?.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      /** 사용자가 좋아요를 하지 않는 경우에 좋아요를 추가한다. */
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });
    }
  };
  return (
    <div className="post__box" key={post?.id}>
      <div className="post__box-profile">
        <div className="post__flex">
          {post?.profileUrl ? (
            <img
              src={post?.profileUrl}
              alt="profile"
              className="post__box-profile-img"
            />
          ) : (
            <FaUserCircle className="post__box-profile-icon" />
          )}
          <div className="post__flex--between">
            <div className="post__flex">
              <div className="post__email">{post?.email}</div>
              <div className="post__createdAt">{post?.createdAt}</div>
            </div>
            <FollowingBox post={post} />
          </div>
        </div>
        <Link to={`/posts/${post?.id}`}>
          <div className="post__box-content">{post?.content}</div>
          {post?.imageUrl && (
            <div className="post__image-div">
              <img
                src={post?.imageUrl}
                alt="post img"
                className="post__image"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag, index) => (
              <span className="post-form__hashtags-tag" key={index}>
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <div className="post__box-footer">
        {user?.uid === post?.uid && (
          <>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              {t("BUTTON_DELETE")}
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>{t("BUTTON_EDIT")}</Link>
            </button>
          </>
        )}

        <button type="button" className="post__likes" onClick={toggleLike}>
          {user && post?.likes?.includes(user.uid) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
};
export default PostBox;
