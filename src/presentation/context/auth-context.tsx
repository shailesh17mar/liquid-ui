import React, {
  createContext,
  PropsWithChildren,
  ReactChildren,
  useEffect,
  useState,
} from "react";
import { QueryCache } from "react-query";
import { Auth } from "aws-amplify";

export interface User {
  id: string;
  name: string;
  email: string;
  tenant: string;
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
    let isUnmounted = false;
    async function setCurrentUser() {
      const currentSession = await Auth.currentSession();
      const userInfo = await Auth.currentUserInfo();
      const cognitoGroups =
        currentSession.getAccessToken().payload["cognito:groups"];
      const tenant = cognitoGroups[1];
      !isUnmounted &&
        setUser({
          name: userInfo.attributes.name,
          email: userInfo.attributes.email,
          id: userInfo.id,
          tenant,
        } as User);
    }
    if (!isUnmounted) {
      setCurrentUser();
    }
    return () => {
      isUnmounted = true;
    };
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
