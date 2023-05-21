import React from 'react';
import {StyleSheet, Text, View, DrawerLayoutAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHamburgerContext} from '../../context/HamburgerContext';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const Header = () => {
  const {isOpenHamburger, setIsOpenHamburger} = useHamburgerContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <View style={styles.header}>
      <Icon
        name="menu"
        size={25}
        color={'black'}
        style={styles.hamburger}
        onPress={() => setIsOpenHamburger(!isOpenHamburger)}
      />
      <Text style={styles.title}>Shop</Text>
      <Icon
        name="search"
        size={25}
        color={'black'}
        style={styles.search}
        onPress={() => navigation.navigate('SearchProducts')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  hamburger: {
    marginLeft: 4,
  },
  search: {
    marginRight: 4,
  },
});

export default Header;
