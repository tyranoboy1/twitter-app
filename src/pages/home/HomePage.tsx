import PostForm from "components/post/PostForm";
import PostBox from "components/post/PostBox";
import { IPostProps, tabType } from "components/post/interface/post.interface";
import React, { useContext } from "react";
import AuthContext from "context/AuthContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { IUserProps } from "components/following/interface/following.interface";

/** 홈 화면 페이지 컴포넌트 */
const HomePage = () => {
  /** 게시글 데이터를 저장하는 상태 */
  const [posts, setPosts] = React.useState<IPostProps[]>([]);
  const { user } = useContext(AuthContext);
  /** 활성화된 탭을 보여주는 상태 */
  const [activeTab, setActiveTab] = React.useState<tabType>("all");
  const [followingPosts, setFollowingPosts] = React.useState<IPostProps[]>([]);
  const [followingIds, setFollowingIds] = React.useState<string[]>([""]);

  /** 실시간 동기화로 user의 팔로우 아이디를 배열로 가지고 오는 함수 */
  const getFollowingIds = React.useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, "following", user?.uid);
      onSnapshot(ref, (doc) => {
        setFollowingIds([""]);
        doc
          ?.data()
          ?.users?.map((user: IUserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  /** 파이어베이스에 저장된 게시글 가져오기 */
  React.useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
      let followingQuery = query(
        postsRef,
        where("uid", "in", followingIds),
        orderBy("createdAt", "desc")
      );

      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as IPostProps[]);
      });

      onSnapshot(followingQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollowingPosts(dataObj as IPostProps[]);
      });
    }
  }, [followingIds, user]);

  React.useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds, user?.uid]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div
            className={`home__tab ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          <div
            className={`home__tab ${
              activeTab === "following" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </div>
        </div>
      </div>
      <PostForm />
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 존재하지 않습니다.</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "following" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 존재하지 않습니다.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
