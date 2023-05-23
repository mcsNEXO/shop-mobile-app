import React from 'react';
import {getAsyncStorage, setAsyncStorage} from '../helpers/asyncStorage';
import {useCartContext} from './CartContext';
import axios from '../axios';
import useCartHook from '../hooks/useCart';

interface IContext {
  user: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthStorage: (user: User) => void;
  clearAuth: () => Promise<void>;
}

type User = {
  _id: string;
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
  const {setCartStorage} = useCartContext();

  React.useEffect(() => {
    (async () => {
      const data: string | null | undefined = await getAsyncStorage('auth');
      if (!data) return;
      try {
        setAuth(JSON.parse(data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const setAuthStorage = async (user: User) => {
    console.log(user);
    setAuth(user);
    setAsyncStorage('auth', user);
    const data2 = {
      userId: user?._id,
    };
    const res = await axios.post('get-product', data2);
    setCartStorage(res.data.cart);
  };

  const clearAuth = async () => {
    setAuth(null);
    setAsyncStorage('auth', null);
  };

  const value = {
    user,
    setAuth,
    setAuthStorage,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => React.useContext(AuthContext);
