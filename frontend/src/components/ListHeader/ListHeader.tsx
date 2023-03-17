import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const ListHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Icon name="menu" size={20} color={'black'} style={styles.hamburger} />
      <Text style={styles.title}>{navigation.getId()}</Text>
      <Icon name="search" size={20} color={'black'} style={styles.search} />
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
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
