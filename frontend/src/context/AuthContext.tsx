import React from 'react';
interface IContext {
  user: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

type User = {
  _id: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
};

export const AuthContext = React.createContext<IContext>(null as any);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setAuth] = React.useState<User | null>(null);

  const value = {
    user,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => React.useContext(AuthContext);
