import React from "react";
import { FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}
const posts: PostProps[] = [
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
const HomePage = () => {
  const handleFileUpload = () => {};
  const handleDelete = () => {};

  return (
    <div className="home">
      <div className="home_title">Home</div>
      <div className="home_tabs">
        <div className="home__tab home__tab--active">For you</div>
        <div className="home__tab">For you</div>
      </div>
      <form className="post-form">
        <textarea
          className="post-from__textarea"
          required
          name="content"
          id="content"
          placeholder="입력해주세요"
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
          <input
            type="submit"
            value="Tweet"
            className="post-form__submit-btn"
          />
        </div>
      </form>
      <div className="post">
        {posts?.map((item) => (
          <div className="post__box" key={item.id}>
            <Link to={`/posts/${item.id}`}>
              <div className="post__box-profile">
                <div className="post__flex">
                  {item?.profileUrl ? (
                    <img
                      src={item?.profileUrl}
                      alt="profile"
                      className="post__box-profile-img"
                    />
                  ) : (
                    <FaUserCircle className="post__box-profile-icon" />
                  )}
                  <div className="post__email">{item?.email}</div>
                  <div className="post__createdAt">{item?.createdAt}</div>
                </div>
                <div className="post__box-content">{item?.content}</div>
              </div>
            </Link>
            <div className="post__box-footer">
              <>
                <button
                  type="button"
                  className="post__delete"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button type="button" className="post__edit">
                  <Link to={`/posts/edit/${item?.id}`}>Edit</Link>
                </button>
              </>
              <button
                type="button"
                className="post__likes"
                onClick={handleDelete}
              >
                <FaHeart />
                {item?.likeCount || 0}
              </button>
              <button type="button" className="post__comments">
                <FaRegComment />
                {item?.comments?.length || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
