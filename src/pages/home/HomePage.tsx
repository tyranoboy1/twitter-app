import PostForm from "components/post/PostForm";
import PostBox from "components/post/PostBox";
import { IPostProps } from "components/post/interface/post.interface";

const posts: IPostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "2",
    email: "test@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "3",
    email: "test@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "4",
    email: "test@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "5",
    email: "test@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "6",
    email: "test@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123123",
  },
];
/** 홈 화면 컴포넌트 */
const HomePage = () => {
  const handleFileUpload = () => {};
  const handleDelete = () => {};

  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
