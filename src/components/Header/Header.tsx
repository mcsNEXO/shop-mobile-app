import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  return (
    <View style={styles.header}>
      <Icon name="menu" size={20} color={'black'} style={styles.hamburger} />
      <Text style={styles.title}>Shop</Text>
      <Icon name="search" size={20} color={'black'} style={styles.search} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  hamburger: {
    marginLeft: 4,
  },
  search: {
    marginRight: 4,
  },
});

export default Header;
