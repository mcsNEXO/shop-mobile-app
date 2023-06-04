import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  FlatList,
} from 'react-native';
import {IMAGENAME} from '../../assets/images/shoes/image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {sizesGenders} from '../../data/filterData';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useFavoriteContext} from '../../context/FavoriteContext';
import useCartHook from '../../hooks/useCart';
import {ProductFavoriteType} from '../../context/FavoriteContext';
import {ProductCartType} from '../../context/CartContext';

const FavoritePopUp = ({
  item,
  isOpen,
  setIsOpen,
  successToast,
  errorToast,
}: {
  item: ProductFavoriteType;
  isOpen: number;
  setIsOpen: React.Dispatch<React.SetStateAction<number>>;
  successToast: () => void;
  errorToast: () => void;
}) => {
  //states
  const [index, setIndex] = React.useState<number>(0);
  const [error, setError] = React.useState<string>('');
  const [size, setSize] = React.useState<number | null>(
    typeof item.size === 'number' ? item.size : null,
  );
  const [animatedHeight, setAnimatedWidth] = React.useState(
    new Animated.Value(0),
  );
  const [animatedOpacity, setAnimatedOpacity] = React.useState(
    new Animated.Value(0),
  );

  //hooks
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {deleteFavorite} = useFavoriteContext();
  const {addProduct} = useCartHook();

  //variables
  const height = Dimensions.get('window').height * 0.5;

  const handleSize = (size: number) => {
    setSize(size);
    setError('');
  };

  const handleMoveToProduct = (item: ProductFavoriteType) => {
    setIsOpen(-1);
    navigation.navigate('Product', {
      title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      productId: item._id,
      color: item?.colors,
    });
  };

  const handleAddProductToCart = (item: ProductFavoriteType) => {
    if (!size) return setError('Select size!');
    try {
      addProduct({...item, size: size} as ProductCartType);
      successToast();
    } catch (e) {
      console.log(e);
    }
    setIsOpen(-1);
  };

  const handleDeleteFavProduct = (item: ProductFavoriteType) => {
    try {
      deleteFavorite(item);
      errorToast();
    } catch (e) {
      console.log(e);
    }
    setIsOpen(-1);
  };

  React.useEffect(() => {
    if (isOpen > -1) {
      setIndex(1);
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
      ]).start(() => {
        setIsOpen(-1);
        setIndex(0);
      });
    }
  }, [isOpen]);

  return (
    <Modal
      animationType="slide"
      visible={isOpen > -1 ? true : false}
      transparent={true}>
      <Animated.View
        style={[styles.bg, {opacity: isOpen > -1 ? 0.75 : 0, zIndex: index}]}>
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
                IMAGENAME[item?.name?.split(' ').join('')][
                  item.colors as string
                ]
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
          <View style={styles.sizes}>
            <FlatList
              data={sizesGenders[item.gender]}
              horizontal
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => handleSize(item)}
                  style={[
                    styles.sizeBtn,
                    {
                      marginLeft: index === 0 ? 0 : 12,
                      borderWidth: size === item ? 2 : 1,
                    },
                  ]}>
                  <Text style={styles.textSize}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.secondPart}>
            <TouchableOpacity
              style={[styles.openBtn, styles.btn]}
              onPress={() => handleMoveToProduct(item)}>
              <Icon name="open-in-new" size={24} color={'blue'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addBtn, styles.btn]}
              onPress={() => handleAddProductToCart(item)}>
              <Icon name="add-shopping-cart" size={24} color={'green'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteBtn, styles.btn]}
              onPress={() => handleDeleteFavProduct(item)}>
              <Icon name="delete-outline" size={24} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </Modal>
  );
};

export default FavoritePopUp;

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
