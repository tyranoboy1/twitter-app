import HomePage from "pages/home/HomePage";
import NotificationsPage from "pages/notifications/NotificationsPage";
import PostDetailPage from "pages/post/PostDetailPage";
import PostEditPage from "pages/post/PostEditPage";
import PostListPage from "pages/post/PostListPage";
import PostNewPage from "pages/post/PostNewPage";
import ProfileEditPage from "pages/profile/ProfileEditPage";
import ProfilePage from "pages/profile/ProfilePage";
import SearchPage from "pages/search/SearchPage";
import LoginPage from "pages/users/LoginPage";
import SignUpPage from "pages/users/SignUpPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { IRouterProps } from "components/router/interface/router.interface";

/** 라우팅 컴포넌트 */
const Router = (props: IRouterProps) => {
  /** 로그인 여부에 따라 라우팅 */
  const { isAuthenticated } = props;
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/new" element={<PostNewPage />} />
          <Route path="/posts/edit/:id" element={<PostEditPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate replace to="/users/login" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
