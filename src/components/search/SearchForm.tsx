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

/** 검색 화면 컴포넌트 */
const SearchForm = () => {
  const [posts, setPosts] = React.useState<IPostProps[]>([]);
  const [tagQuery, setTagQuery] = React.useState("");
  const { user } = useContext(AuthContext);

  const onChange = (e: any) => {
    setTagQuery(e?.target?.value?.trim());
  };
  React.useEffect(() => {
    if (user) {
      let postRef = collection(db, "posts");
      let postsQuery = query(
        postRef,
        where("hashTags", "array-contains-any", [tagQuery]),
        orderBy("createdAt", "desc")
      );
      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot?.docs?.map((doc) => ({
          ...doc?.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as IPostProps[]);
      });
    }
  }, [tagQuery, user]);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Search</div>
        </div>
        <div className="home__search-div">
          <input
            className="home__search"
            placeholder="해시태그 검색"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
