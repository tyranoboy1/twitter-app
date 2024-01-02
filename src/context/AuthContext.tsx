import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import React, { ReactNode } from "react";

interface IAuthProps {
  children: ReactNode;
}
const AuthContext = React.createContext({
  user: null as User | null,
});

/** user 정보 컨텍스트 */
export const AuthContextProvider = ({ children }: IAuthProps) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const auth = getAuth(app);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
