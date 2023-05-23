import React from 'react';
import {getAsyncStorage, setAsyncStorage} from '../helpers/asyncStorage';
import axios from '../axios';

interface IContext {
  cart: ProductCartType[] | null;
  setCart: React.Dispatch<React.SetStateAction<ProductCartType[] | null>>;
  setCartStorage: (cart: ProductCartType[]) => void;
  clearCart: () => Promise<void>;
}

export type ProductCartType = {
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
  const [cart, setCart] = React.useState<ProductCartType[] | null>(null);

  React.useEffect(() => {
    (async () => {
      const data = await getAsyncStorage('auth');
      let cartData: any;
      if (data !== 'null' && data !== null && data) {
        cartData = await axios.post('get-product', {
          userId: JSON.parse(data)._id,
        });
      } else {
        cartData = await getAsyncStorage('cart');
      }
      try {
        setCartStorage(
          data !== 'null' && data !== null && data
            ? cartData.data.cart
            : JSON.parse(cartData),
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const setCartStorage = (cart: ProductCartType[]) => {
    setCart(cart);
    setAsyncStorage('cart', cart);
  };

  const clearCart = async () => {
    setCart(null);
    setAsyncStorage('cart', null);
  };

  const value = {
    clearCart,
    cart,
    setCart,
    setCartStorage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => React.useContext(CartContext);
