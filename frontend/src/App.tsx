import React from 'react';
import {CategoryProvider} from './context/CategoryContext';
import Navigator from './navigator/Navigator';
import {AuthProvider} from './context/AuthContext';
import {HamburgerProvider} from './context/HamburgerContext';
import {CartProvider} from './context/CartContext';
import {FavoriteProvider} from './context/FavoriteContext';

const App = () => (
  <CategoryProvider>
    <HamburgerProvider>
      <CartProvider>
        <AuthProvider>
          <FavoriteProvider>
            <Navigator />
          </FavoriteProvider>
        </AuthProvider>
      </CartProvider>
    </HamburgerProvider>
  </CategoryProvider>
);

export default App;
