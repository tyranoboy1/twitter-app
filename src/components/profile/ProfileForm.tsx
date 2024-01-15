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
import { languageState } from "atom";
import { useRecoilState } from "recoil";
import useTranslation from "hooks/useTranslation";

const PROFILE_DEFAULT_URL = "/logo512.png";

/** 프로필 폼 컴포넌트 */
const ProfileForm = () => {
  const [activeTab, setActiveTab] = React.useState<TabType>("my");
  const [myPosts, setMyPosts] = React.useState<IPostProps[]>([]);
  const [likePosts, setLikePosts] = React.useState<IPostProps[]>([]);
  const navigate = useNavigate();
  const [language, setLanguage] = useRecoilState(languageState);
  const { user } = useContext(AuthContext);
  const t = useTranslation();
  /** 한영 변환 눌렀을때 함수 */
  const onClickLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
    localStorage.setItem("language", language === "ko" ? "en" : "ko");
  };

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
          <div className="profile__flex">
            <button
              type="button"
              className="profile__btn"
              onClick={() => navigate("/profile/edit")}
            >
              {t("BUTTON_EDIT_PROFILE")}
            </button>
            <button
              type="button"
              className="profile__btn--language"
              onClick={onClickLanguage}
            >
              {language === "ko" ? "한국어" : "English"}
            </button>
          </div>
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
            {t("TAB_ALL")}
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("like")}
          >
            {t("TAB_LIKES")}
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
