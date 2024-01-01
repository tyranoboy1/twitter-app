import PostBox from "components/post/PostBox";
import { IPostProps } from "components/post/interface/post.interface";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TabType } from "components/profile/interface/profile.interface";

const PROFILE_DEFAULT_URL = "/logo512.png";

const ProfileForm = () => {
  const [activeTab, setActiveTab] = React.useState<TabType>("my");
  const [myPosts, setMyPosts] = React.useState<IPostProps[]>([]);
  const [likePosts, setLikePosts] = React.useState<IPostProps[]>([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      const myPostQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const likePostQuery = query(
        postsRef,
        where("likes", "array-contains", user.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(myPostQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setMyPosts(dataObj as IPostProps[]);
      });
      onSnapshot(likePostQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setLikePosts(dataObj as IPostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Profile</div>
        <div className="profile">
          <img
            src={user?.photoURL || PROFILE_DEFAULT_URL}
            alt="profile"
            className="profile__image"
            width={100}
            height={100}
          />
          <button
            type="button"
            className="profile__btn"
            onClick={() => navigate("/profile/edit")}
          >
            프로필 수정
          </button>
        </div>
        <div className="profile__text">
          <div className="profile__name">{user?.displayName || "사용자님"}</div>
          <div className="profile__email">{user?.email}</div>
        </div>
        <div className="home__tabs">
          <div
            className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
            onClick={() => setActiveTab("my")}
          >
            For You
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("like")}
          >
            Likes
          </div>
        </div>
        {activeTab === "my" && (
          <div className="post">
            {myPosts?.length > 0 ? (
              myPosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="post__text">게시글이 없습니다.</div>
              </div>
            )}
          </div>
        )}
        {activeTab === "like" && (
          <div className="post">
            {likePosts?.length > 0 ? (
              likePosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="post__text">게시글이 없습니다.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileForm;
