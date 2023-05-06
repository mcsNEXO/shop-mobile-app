import React from 'react';
import {CategoryProvider} from './context/CategoryContext';
import Navigator from './navigator/Navigator';
import {AuthProvider} from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <CategoryProvider>
      <Navigator />
    </CategoryProvider>
  </AuthProvider>
);

export default App;
