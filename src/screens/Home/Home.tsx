import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManList from './components/ManList/ManList';
import Categories from './components/Categories/Categories';
import PrevButton from '../../components/Buttons/PrevButton';

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator id="Home">
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="ManList"
        component={ManList}
        options={({route}) => ({
          title: route?.params?.name,
          headerShown: true,
          headerLeft: () => <PrevButton />,
        })}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Home;
