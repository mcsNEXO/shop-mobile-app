import React from 'react';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';
import axios from '../axios';
import {setAsyncStorage} from '../helpers/asyncStorage';

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

const useCartHook = () => {
  const cartContext = React.useContext(CartContext);
  const authContext = React.useContext(AuthContext);

  const user = authContext.user;
  const cart = cartContext.cart;
  const setCart = async (product: Cart) => {
    if (user) {
      const data = {
        userId: user._id,
        product: product,
        type: 'cart',
      };
      const res = await axios.post('add-product', data);
      cartContext.setCartStorage(res.data.cart);
    }
  };
  return {setCart, cart};
};

export default useCartHook;
