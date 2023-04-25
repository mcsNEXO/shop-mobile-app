import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {shoesSize} from '../../../../../../filterData';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface ISizeModal {
  gender: string;
  type: string;
  closeModal: () => void;
  setSize: React.Dispatch<React.SetStateAction<number | null>>;
}

const SizeModal = ({gender, type, closeModal, setSize}: ISizeModal) => {
  const handleSize = (size: number) => {
    setSize(size);
    closeModal();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sizes}>Sizes</Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="cancel" size={35} color="black" />
        </TouchableOpacity>
      </View>
      {shoesSize[gender]?.map((size: number, index: number) => {
        return (
          <TouchableOpacity
            style={styles.button}
            key={index}
            onPress={() => handleSize(size)}>
            <Text style={styles.text}>{size}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default SizeModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    top: 0,
    height: Dimensions.get('window').height,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  sizes: {
    fontSize: 26,
  },
  button: {
    width: Dimensions.get('window').width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
