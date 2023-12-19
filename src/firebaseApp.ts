import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/** Firebase 애플리케이션 인스턴스를 저장할 변수 선언 */
export let app: FirebaseApp;

/** Firebase 설정 객체 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

try {
  /** 존재하는 Firebase 앱 인스턴스를 가져온다. */
  app = getApp("app");
} catch (e) {
  /** 존재하는 앱 인스턴스를 못 찾는 경우 제공된 설정으로 새 앱 인스턴스 초기화 */
  app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebase;
