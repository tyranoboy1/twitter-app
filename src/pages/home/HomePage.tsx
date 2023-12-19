import PostForm from "components/post/PostForm";
import PostBox from "components/post/PostBox";
import { IPostProps } from "components/post/interface/post.interface";
import React, { useContext } from "react";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";

/** 홈 화면 컴포넌트 */
const HomePage = () => {
  /** 게시글 데이터를 저장하는 상태 */
  const [posts, setPosts] = React.useState<IPostProps[]>([]);
  const { user } = useContext(AuthContext);
  const handleFileUpload = () => {};
  const handleDelete = () => {};
  /** 파이어베이스에 저장된 게시글 가져오기 */
  React.useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as IPostProps[]);
      });
    }
  });

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div className="home__tab home__tab--active">For You</div>
          <div className="home__tab">Following</div>
        </div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">게시글이 존재하지 않습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
