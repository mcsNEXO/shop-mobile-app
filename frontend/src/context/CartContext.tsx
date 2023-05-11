import React from 'react';
import {getAsyncStorage, setAsyncStorage} from '../helpers/asyncStorage';
import {AuthContext} from './AuthContext';

interface IContext {
  cart: Cart[] | null;
  setCart: React.Dispatch<React.SetStateAction<Cart[] | null>>;
  setCartStorage: (cart: Cart[]) => void;
}

type Cart = {
  _id: string;
  type: string;
  category: string;
  name: string;
  gender: string;
  colors: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
  index: number;
  _v: number;
};

export const CartContext = React.createContext<IContext>(null as any);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<Cart[] | null>(null);

  React.useEffect(() => {
    (async () => {
      const data = await getAsyncStorage('cart');
      if (!data) return;
      try {
        setCart(JSON.parse(data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const setCartStorage = (cart: Cart[]) => {
    setCart(cart);
    setAsyncStorage('cart', cart);
  };

  const value = {
    cart,
    setCart,
    setCartStorage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => React.useContext(CartContext);
