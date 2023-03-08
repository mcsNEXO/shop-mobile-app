import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from './components/Categories/Categories';
import TypeCategories from '../../screens/Home/components/Categories/TypeCategories/TypeCategories';
import PrevButton from '../../components/Buttons/PrevButton';

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
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="TypeCategories"
        component={TypeCategories}
        options={({route}: any) => ({
          title: route.params?.type,
        })}
      />
    </Stack.Navigator>
  );
};

export default Home;
