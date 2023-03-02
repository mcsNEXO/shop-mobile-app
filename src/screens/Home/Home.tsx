import {Text, View} from 'react-native';
import NavPanel from './components/NavPanel/NavPanel';
import {categoriesData} from './components/Categories/categoriesData';
import Categories from './components/Categories/Categories';

const Home = () => {
  return (
    <View>
      <NavPanel />
      <Categories />
    </View>
  );
};

export default Home;
