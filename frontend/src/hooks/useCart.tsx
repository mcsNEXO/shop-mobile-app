import React from 'react';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';
import axios from '../axios';
import {ProductCartType} from '../helpers/typesProducts';

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
      try {
        const res = await axios.post('add-product', data);
        cartContext.setCartStorage(res.data.cart);
      } catch (e) {
        console.log(e);
      }
    } else {
      if (cart) {
        const exist = cart?.find(
          x =>
            x._id === product._id &&
            x.colors === product.colors &&
            x.size === product.size,
        );
        if (exist) {
          const newCart = cart.map(x =>
            x._id === product._id && x.size === product.size
              ? {...x, quantity: x.quantity + 1}
              : x,
          );
          cartContext.setCartStorage(newCart);
        } else {
          const newCart = [...cart, {...product, quantity: 1}];
          cartContext.setCartStorage(newCart);
        }
      } else {
        cartContext.setCartStorage([{...product, quantity: 1}]);
      }
    }
  };
  return {addProduct, cart};
};

export default useCartHook;
