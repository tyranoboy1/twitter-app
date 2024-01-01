import AuthContext from "context/AuthContext";
import { useCallback, useContext, useEffect } from "react";
import { IFollowingProps, IUserProps } from "./interface/following.interface";
import { db } from "firebaseApp";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import React from "react";

/** 팔로잉 박스 컴포넌트 */
const FollowingBox = (props: IFollowingProps) => {
  const { post } = props;
  const { user } = useContext(AuthContext);
  const [postFollowers, setPostFollowers] = React.useState<any>([]);

  /** 팔로우 클릭 함수 */
  const onClickFollow = async (e: any) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        // 내가 주체가 되어 '팔로잉' 컬렉션 생성 or 업데이트
        const followingRef = doc(db, "following", user?.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: post?.uid }),
          },
          { merge: true }
        );

        // 팔로우 당하는 사람이 주체가 되어 '팔로우' 컬렉션 생성 or 업데이트
        const followerRef = doc(db, "follower", post?.uid);

        await setDoc(
          followerRef,
          { users: arrayUnion({ id: user?.uid }) },
          { merge: true }
        );

        toast.success("팔로우를 했습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** 팔로우 취소 함수 */
  const onClickDeleteFollow = async (e: any) => {
    e.preventDefault();
    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user?.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: post?.uid }),
        });

        const followerRef = doc(db, "follower", post?.uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user.uid }),
        });

        toast.success("팔로우를 취소했습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getFollowers = useCallback(async () => {
    if (post.uid) {
      const ref = doc(db, "follower", post.uid);
      onSnapshot(ref, (doc) => {
        setPostFollowers([]);
        doc
          ?.data()
          ?.users?.map((user: IUserProps) =>
            setPostFollowers((prev: IUserProps[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [post.uid]);
  useEffect(() => {
    if (post.uid) getFollowers();
  }, [getFollowers, post.uid]);
  return (
    <>
      {user?.uid !== post?.uid && postFollowers?.includes(user?.uid) ? (
        <button
          type="button"
          className="post__following-btn"
          onClick={onClickDeleteFollow}
        >
          Following
        </button>
      ) : (
        <button
          type="button"
          className="post__follow-btn"
          onClick={onClickFollow}
        >
          Follower
        </button>
      )}
    </>
  );
};

export default FollowingBox;
