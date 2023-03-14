import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IFilterModal {
  closeModal: () => void;
}

const FilterModal = ({closeModal}: IFilterModal) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sort and filter</Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="close" color="black" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'black',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
  },
});
