import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHamburgerContext} from '../../context/HamburgerContext';

const HeaderFavorite = () => {
  const {isOpenHamburger, setIsOpenHamburger} = useHamburgerContext();
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Icon
          name="menu"
          size={24}
          color={'black'}
          style={styles.hamburger}
          onPress={() => setIsOpenHamburger(!isOpenHamburger)}
        />
        <Text style={styles.title}>Favorite</Text>
      </View>
    </View>
  );
};

export default HeaderFavorite;

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    color: 'black',
    marginLeft: 10,
  },
  hamburger: {
    marginLeft: 4,
  },
  search: {
    marginRight: 4,
  },
});
