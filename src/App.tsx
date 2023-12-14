import Layout from "components/layout/Layout";
import Loader from "components/loading/Loader";
import Router from "components/router/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  /** Firebase 유저 정보 데이터 가져옴 */
  const auth = getAuth(app);
  /** 로그인 여부 상태 */
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    !!auth?.currentUser
  );
  const [init, setInit] = React.useState<boolean>(false);
  /** onAuthStateChanged 실시간 로그인 유무 확인*/
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <Layout>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  );
};

export default App;
