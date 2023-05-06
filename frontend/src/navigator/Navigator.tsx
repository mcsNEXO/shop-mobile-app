import React from 'react';
import Categories from '../screens/Home/components/Categories/Categories';
import {NavigationContainer} from '@react-navigation/native';
import TypeCategories from '../screens/Home/components/Categories/components/TypeCategories/TypeCategories';
import Product from '../screens/Home/components/Categories/components/Product/Product';
import Products from '../screens/Home/components/Categories/components/Products/Products';
import Account from '../screens/Account/Account';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/Header/Header';
import NavPanel from '../screens/Home/components/NavPanel/NavPanel';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import ImageModal from '../screens/Account/components/Modals/ImageEditor';
import EditProfile from '../screens/Account/components/EditProfile/EditProfile';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen
          options={{
            header: () => (
              <>
                <Header toggleOpened={() => {}} />
                <NavPanel />
              </>
            ),
            headerShown: false,
          }}
          name={'Categories'}
          component={Categories}
        />
        <Stack.Screen
          name={'TypeCategories'}
          component={TypeCategories}
          options={({route}: any) => ({
            title: route.params?.type,
            headerShown: true,
          })}
        />
        <Stack.Screen
          name={'Products'}
          component={Products}
          options={({route}: any) => ({
            title: route.params?.category,
            headerShown: true,
          })}
        />
        <Stack.Screen
          name={'Product'}
          component={Product}
          options={({route}: any) => ({
            title: route.params?.title,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name={'Account'}
          component={Account}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={'ImageEditor'}
          component={ImageModal}
          options={{
            title: 'Confirm image',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={'Register'}
          component={Register}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={'EditProfile'}
          component={EditProfile}
          options={{
            title: 'Edit profile',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
