import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IMAGENAME} from '../../../assets/images/shoes/image';
import {OrdinaryProduct} from '../../../helpers/typesProducts';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../../../axios';
import {
  ParamListBase,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

const DeletePopUp = ({
  item,
  isOpen,
  setIsOpen,
  handleClear,
}: {
  item: OrdinaryProduct;
  isOpen: number;
  setIsOpen: React.Dispatch<React.SetStateAction<number>>;
  handleClear: (id: string) => void;
}) => {
  const [error, setError] = React.useState<string>('');
  const [animatedHeight, setAnimatedWidth] = React.useState(
    new Animated.Value(0),
  );
  const [animatedOpacity, setAnimatedOpacity] = React.useState(
    new Animated.Value(0),
  );

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const height = Dimensions.get('window').height * 0.4;

  React.useEffect(() => {
    if (isOpen > -1) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: height,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.75,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setIsOpen(-1));
    }
  }, [isOpen]);

  const handleDelete = async (item: OrdinaryProduct) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await axios.post('delete-product-db', {
                productId: item._id,
              });
              setIsOpen(-1);
              handleClear(item._id);
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleMoveToProduct = (item: OrdinaryProduct) => {
    navigation.navigate('Product', {
      title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      productId: item._id,
      color: item?.colors[0],
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={isOpen > -1 ? true : false}
      transparent={true}>
      <Animated.View style={[styles.bg, {opacity: isOpen > -1 ? 0.75 : 0}]}>
        <TouchableOpacity style={styles.touch} onPress={() => setIsOpen(-1)} />
      </Animated.View>
      <Animated.ScrollView
        style={[
          styles.container,
          {height: animatedHeight ? animatedHeight : height},
        ]}>
        <View style={styles.hamburger}>
          <View style={styles.firstPart}>
            <Image
              source={
                IMAGENAME[item?.name?.split(' ').join('')][item.colors[0]]
              }
              style={styles.image}
            />
            <View style={styles.desc}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.gender}>
                {`${item.gender}'s`} {item.type}
              </Text>
              <Text style={styles.price}>{item.price}$</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsOpen(-1)}
              style={styles.close}>
              <Icon name="close" size={24} color={'black'} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          {error && (
            <Text style={{color: 'red', textAlign: 'center', fontSize: 16}}>
              {error}
            </Text>
          )}
          <View style={styles.secondPart}>
            <TouchableOpacity
              style={[styles.openBtn, styles.btn]}
              onPress={() => handleMoveToProduct(item)}>
              <Icon name="open-in-new" size={24} color={'blue'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteBtn, styles.btn]}
              onPress={() => handleDelete(item)}>
              <Icon name="delete-outline" size={24} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </Modal>
  );
};

export default DeletePopUp;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  image: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  hamburger: {
    padding: 20,
  },
  option: {
    // width:Dimensions.get('window').width * 0.65,
    minWidth: '100%',
    height: 42,
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 15,
    padding: 6,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(198, 198, 198, 0.7);',
  },
  optionFirstChild: {
    marginTop: 30,
  },
  text: {
    verticalAlign: 'middle',
    fontSize: 18,
    marginLeft: 10,
  },
  bg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
    opacity: 0.75,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  touch: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  firstPart: {
    flexDirection: 'row',
  },
  desc: {
    width:
      Dimensions.get('window').width -
      Dimensions.get('window').width / 2.5 -
      60,
    padding: 20,
    paddingTop: 4,
    gap: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
    textTransform: 'capitalize',
  },
  gender: {
    fontSize: 15,
    color: 'gray',
    textTransform: 'capitalize',
  },
  price: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  line: {
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  sizes: {
    height: 65,
    padding: 12,
  },
  sizeBtn: {
    width: 80,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
  },
  textSize: {
    fontSize: 16,
    color: 'black',
  },
  secondPart: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    padding: 20,
  },
  openBtn: {
    borderColor: '#0051ff',
  },
  addBtn: {
    borderColor: 'green',
  },
  deleteBtn: {
    borderColor: 'red',
  },
  btn: {
    height: 34,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  close: {
    width: 100,
  },
  closeText: {
    color: 'black',
  },
});
