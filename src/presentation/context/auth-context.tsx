import React, { useCallback, useEffect, useState } from "react";
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
  getToken: () => Promise<string>;
}
const AuthContext = React.createContext<ContextType | undefined>(undefined);
const queryCache = new QueryCache();

interface Props {
  children: React.ReactNode;
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string>();
  useEffect(() => {
    let isUnmounted = false;
    async function setCurrentUser() {
      const currentSession = await Auth.currentSession();
      const userInfo = await Auth.currentUserInfo();
      const token = currentSession.getIdToken().getJwtToken();
      // const cognitoGroups =
      // currentSession.getAccessToken().payload["cognito:groups"];
      const tenant = userInfo.attributes.email.split("@")[1];
      !isUnmounted &&
        setUser({
          name: userInfo.attributes.name,
          email: userInfo.attributes.email,
          id: userInfo.id,
          token,
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

  const getToken = async (): Promise<string> => {
    const currentSession = await Auth.currentSession();
    const token = currentSession.getAccessToken().getJwtToken();
    return token;
  };

  const signOut = () => {
    Auth.signOut();
    queryCache.clear();
    setUser(null);
  };

  const value = { signOut, user, getToken };
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
