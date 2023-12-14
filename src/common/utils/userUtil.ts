import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

/** 사용자 공통 유틸 함수 분리 */
/** 소셜 로그인 함수  */
export const onClickSocialLogin = async (e: any) => {
  const {
    target: { name },
  } = e;
  let provider;
  const auth = getAuth(app);
  if (name === "google") {
    provider = new GoogleAuthProvider();
  }
  if (name === "github") {
    provider = new GithubAuthProvider();
  }
  await signInWithPopup(
    auth,
    provider as GithubAuthProvider | GoogleAuthProvider
  )
    .then((result) => {
      toast.success("로그인 되었습니다.");
    })
    .catch((error) => {
      const errorMessage = error?.message;
      toast?.error(errorMessage);
    });
};
