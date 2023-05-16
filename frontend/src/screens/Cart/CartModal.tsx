import {
  Modal,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ICartModal {
  isOpenModal: number | null;
  closeModal: () => void;
  updateQuantity: (qt: number) => Promise<void>;
}

const CartModal = ({isOpenModal, closeModal, updateQuantity}: ICartModal) => {
  const data = [{title: 'Quantity', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}];
  return (
    <Modal visible={isOpenModal !== null ? true : false}>
      <View style={styles.containerModal}>
        <View style={styles.header}>
          <Text style={styles.sizes}>Quantity</Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="cancel" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <SectionList
          sections={data}
          keyExtractor={index => index.toString()}
          renderItem={el => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateQuantity(el.item)}>
              <Text style={styles.btnText}>{el.item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  containerModal: {
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
  boxModal: {
    position: 'absolute',
    top: 0,
  },
  btnText: {
    color: 'black',
  },
});
