import React from 'react';
import {CategoryProvider} from './context/CategoryContext';
import Navigator from './navigator/Navigator';

const App = () => (
  <CategoryProvider>
    <Navigator />
  </CategoryProvider>
);

export default App;
