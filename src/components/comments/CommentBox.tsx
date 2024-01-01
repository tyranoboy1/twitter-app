import React, { useContext } from "react";
import { ICommentBoxProps } from "./interface/comments.interface";
import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import styles from "components/comments/styles/comment.module.scss";

/** 댓글 상자 컴포넌트 */
const CommentBox = (props: ICommentBoxProps) => {
  const { data, post } = props;
  const { user } = useContext(AuthContext);
  /** 댓글 삭제 함수 */
  const handleDeleteComment = async () => {
    if (post) {
      try {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast.success("댓글을 삭제했습니다");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div key={data?.createdAt} className={styles.comment}>
      <div className={styles.comment__borderBox}>
        <div className={styles.comment__imgBox}>
          <div className={styles.comment__flexBox}>
            <img src={`/logo192.png`} alt="profile" />
            <div className={styles.comment__email}>{data?.email}</div>
            <div className={styles.comment__createdAt}>{data?.createdAt}</div>
          </div>
        </div>
        <div className={styles.comment__content}>{data?.comment}</div>
        <div className={styles.comment__submitDiv}>
          {data?.uid === user?.uid && (
            <button
              type="button"
              className="comment__delete-btn"
              onClick={handleDeleteComment}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
