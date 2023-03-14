import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from './components/Categories/Categories';
import TypeCategories from '../../screens/Home/components/Categories/components/TypeCategories/TypeCategories';
import PrevButton from '../../components/Buttons/PrevButton';
import Products from './components/Categories/components/Products/Products';

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerLeft: () => <PrevButton />,
      }}>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="TypeCategories"
        component={TypeCategories}
        options={({route}: any) => ({
          title: route.params?.type,
        })}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={({route}: any) => ({
          title: route.params?.category,
        })}
      />
    </Stack.Navigator>
  );
};

export default Home;
