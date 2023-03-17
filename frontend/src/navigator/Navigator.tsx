import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import NavPanel from '../screens/Home/components/NavPanel/NavPanel';
import React from 'react';
import Header from '../components/Header/Header';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="header"
        screenOptions={{
          header: () => (
            <>
              <Header />
              <NavPanel />
            </>
          ),
          headerShown: true,
        }}>
        <Stack.Screen name={'Home'} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
