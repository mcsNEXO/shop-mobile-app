import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

interface Item {
  title: string;
  isActive: boolean;
  setCategory: () => void;
}

const Item = ({title, isActive, setCategory}: Item) => (
  <TouchableOpacity
    style={[styles.items, isActive && styles.active]}
    onPress={setCategory}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

export default Item;

const styles = StyleSheet.create({
  items: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'white',
    borderBottomColor: 'rgba(150, 150, 150, 0.500)',
    borderBottomWidth: 1,
  },
  active: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
