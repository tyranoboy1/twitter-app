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

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/new" element={<PostNewPage />} />
      <Route path="/posts/edit/:id" element={<PostEditPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<ProfileEditPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="/users/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
