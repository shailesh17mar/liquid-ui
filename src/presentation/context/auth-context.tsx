import React, {
  createContext,
  PropsWithChildren,
  ReactChildren,
  useEffect,
  useState,
} from "react";
import { QueryCache } from "react-query";
import { Auth } from "aws-amplify";

interface User {
  id: string;
  name: string;
  email: string;
}
interface ContextType {
  user: User;
  signOut: () => void;
}
const AuthContext = React.createContext<ContextType | undefined>(undefined);
const queryCache = new QueryCache();

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    async function setCurrentUser() {
      const userInfo = await Auth.currentUserInfo();
      setUser({
        name: userInfo.attributes.name,
        email: userInfo.attributes.email,
        id: userInfo.id,
      } as User);
    }
    setCurrentUser();
  }, []);

  const signOut = () => {
    Auth.signOut();
    queryCache.clear();
    setUser(null);
  };
  const value = { signOut, user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
