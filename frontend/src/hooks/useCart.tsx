import React from 'react';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';
import axios from '../axios';
import {ProductCartType} from '../helpers/typesProducts';
import {setAsyncStorage} from '../helpers/asyncStorage';

const useCartHook = () => {
  const cartContext = React.useContext(CartContext);
  const authContext = React.useContext(AuthContext);

  const user = authContext.user;
  const cart = cartContext.cart;
  const addProduct = async (product: ProductCartType) => {
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
  return {addProduct, cart};
};

export default useCartHook;
