import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderRightProducts = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <>
      <Icon
        name="search-outline"
        color={'black'}
        size={28}
        style={{marginRight: 10}}
        onPress={() => navigation.navigate('SearchProducts')}
      />
      <Icon
        name="basket-outline"
        color={'black'}
        size={28}
        onPress={() => navigation.navigate('Cart')}
      />
    </>
  );
};

export default HeaderRightProducts;
