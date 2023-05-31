import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Categories from '../screens/Home/components/Categories/Categories';
import TypeCategories from '../screens/Home/components/Categories/components/TypeCategories/TypeCategories';
import Product from '../screens/Home/components/Categories/components/Product/Product';
import Products from '../screens/Home/components/Categories/components/Products/Products';
import Account from '../screens/Account/Account';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import Cart from '../screens/Cart/Cart';
import Settings from '../screens/Settings/Settings';
import EditProfile from '../screens/Account/components/EditProfile/EditProfile';
import ImageModal from '../screens/Account/components/Modals/ImageEditor';
import Favorite from '../screens/Favorite/Favorite';
import SearchProducts from '../screens/SearchProducts/SearchProducts';
import HeaderRightProducts from '../components/Headers/HeaderRightProducts';
import AdminPanel from '../screens/Admin/AdminPanel';
import AddProduct from '../screens/Admin/components/AddProduct';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'Search'}
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
            headerRight: () => <HeaderRightProducts />,
          })}
        />
        <Stack.Screen
          name={'Product'}
          component={Product}
          options={({route}: any) => ({
            title: route.params?.title,
            headerShown: true,
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
        <Stack.Screen
          name={'Cart'}
          component={Cart}
          options={{
            title: 'Cart',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Favorite'}
          component={Favorite}
          options={{
            title: 'Favorite',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Settings'}
          component={Settings}
          options={{
            title: 'Settings',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="SearchProducts"
          component={SearchProducts}
          options={{title: 'Search products', headerShown: false}}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name={'AdminPanel'}
          component={AdminPanel}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name={'AddProduct'}
          component={AddProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
