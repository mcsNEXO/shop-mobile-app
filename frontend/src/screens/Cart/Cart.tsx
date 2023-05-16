import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import React from 'react';
import {ParamListBase, NavigationProp} from '@react-navigation/native';
import SideBar from '../../components/SideBar/SideBar';
import HeaderCart from '../../components/Headers/HeaderCart';
import CartModal from './CartModal';
import axios from '../../axios';
import {useCartContext} from '../../context/CartContext';
import {useAuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {IMAGENAME} from '../../assets/images/shoes/image';
import {emptyCart} from '../../assets/images/svg/img';
import {SvgXml} from 'react-native-svg';
import {ProductCartType} from '../../context/CartContext';

type NavigationType = {
  navigation: NavigationProp<ParamListBase>;
};

const Cart = ({navigation}: NavigationType) => {
  //contexts
  const {cart, setCartStorage} = useCartContext();
  const {user} = useAuthContext();

  //states
  const [promoCode, setPromoCode] = React.useState<string>('');
  const [discount, setDiscount] = React.useState<number>(0);
  const [deliveryCost, setDeliveryCost] = React.useState<number>(2);
  const [isOpenModal, setIsOpenModal] = React.useState<number | null>(null);
  const [isOpenPromoCode, setIsOpenPromoCode] = React.useState<boolean>(false);

  //refs
  const height = React.useRef<any>(new Animated.Value(60)).current;

  //variables
  const totalPrice = cart?.reduce((acc, product) => {
    return ((acc + product.price * product.quantity) * (100 - discount)) / 100;
  }, deliveryCost);

  const productsPrice = cart?.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const updateQuantity = async (value: number, item: ProductCartType) => {
    if (user) {
      const res = await axios.post('update-product', {
        userId: user._id,
        product: item,
        quantity: value,
      });
      setCartStorage(res.data.cart);
    } else {
      cart &&
        setCartStorage(
          cart.map(x =>
            x._id === item._id &&
            x.colors === item.colors &&
            x.size === item.size
              ? {...x, quantity: value}
              : x,
          ),
        );
    }
    setIsOpenModal(null);
  };

  const confirmPromoCode = async () => {
    try {
      const res = await axios.post('get-promocode', {code: promoCode});
      setDiscount(res?.data?.precent);
    } catch (err: any) {
      setDiscount(0);
      Alert.alert('Error', 'This code does not exist!', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const toggleAnimation = () => {
    setIsOpenPromoCode(!isOpenPromoCode);
    const finalValue = isOpenPromoCode ? 60 : 140;

    Animated.timing(height, {
      toValue: finalValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const deleteProduct = async (product: ProductCartType) => {
    if (user) {
      const res = await axios.post('delete-product', {
        userId: user._id,
        product: product,
      });
      setCartStorage(res.data.cart);
    } else {
      if (cart === null) return;
      setCartStorage(
        cart.filter(x => JSON.stringify(x) !== JSON.stringify(product)),
      );
    }
  };

  return (
    <>
      <SideBar />
      <HeaderCart />
      <ScrollView>
        {cart === null || cart.length === 0 ? (
          <View>
            <SvgXml
              xml={emptyCart}
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.6}
            />
            <Text style={{fontSize: 30, color: 'black', textAlign: 'center'}}>
              Your cart is empty.
            </Text>
            <TouchableOpacity
              style={{
                width: Dimensions.get('window').width * 0.6,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 16,
                backgroundColor: 'black',
              }}
              onPress={() => navigation.navigate('Search')}>
              <Text style={{color: 'white', fontSize: 20}}>
                Search products
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cart?.map((item, index) => {
              return (
                <View key={index}>
                  {index === isOpenModal && (
                    <CartModal
                      isOpenModal={isOpenModal}
                      closeModal={() => setIsOpenModal(null)}
                      updateQuantity={qt => updateQuantity(qt, item)}
                    />
                  )}
                  <View style={styles.box}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Product', {
                          title:
                            item.name.charAt(0).toUpperCase() +
                            item.name.slice(1),
                          productId: item._id,
                          color: item?.colors,
                        });
                      }}>
                      <Image
                        source={
                          IMAGENAME[item?.name?.split(' ').join('')][
                            item.colors
                          ]
                        }
                        style={styles.image}
                      />
                    </TouchableOpacity>
                    <View style={styles.desc}>
                      <Text style={styles.text}>{item.name}</Text>
                      <Text
                        style={
                          styles.textGender
                        }>{`${item.gender}'s ${item.type}`}</Text>
                      <Text style={styles.color}>Color: {item.colors}</Text>
                      <Text>Size: {item.size}</Text>

                      <TouchableOpacity
                        style={styles.quantity}
                        onPress={() => setIsOpenModal(index)}>
                        <Text style={styles.btnText}>
                          {`Quantity: ${item.quantity}`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.other}>
                      <Text style={styles.textPrice}>{item.price}$</Text>
                      <TouchableOpacity
                        style={styles.trash}
                        onPress={() => deleteProduct(item)}>
                        <Icon name="trash" color="red" size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
            <Text style={styles.summary}>Cart summary</Text>
            <Animated.View style={[styles.conPromoCode, {height: height}]}>
              <TouchableOpacity
                style={styles.promoCode}
                onPress={toggleAnimation}>
                <Text style={styles.promoCodeText}>
                  Click to enter promo code!
                </Text>
                <Text>
                  <Icon
                    name={`arrow-${isOpenPromoCode ? 'up' : 'down'}`}
                    size={30}
                    color={'black'}
                  />
                </Text>
              </TouchableOpacity>
              <View style={styles.boxPromoCode}>
                <TextInput
                  style={styles.input}
                  onChangeText={val => setPromoCode(val)}
                />
                <TouchableOpacity
                  style={styles.btnConfirm}
                  onPress={confirmPromoCode}>
                  <Text style={styles.textConfirm}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            <View style={styles.priceCon}>
              <View style={styles.justify}>
                <Text style={styles.otherPrice}>Products price:</Text>
                <Text style={styles.otherPrice}>{productsPrice}</Text>
              </View>
              <View style={styles.justify}>
                <Text style={styles.otherPrice}>Delivery: </Text>
                <Text style={styles.otherPrice}>{deliveryCost}$</Text>
              </View>
              {discount > 0 && (
                <View style={styles.justify}>
                  <Text style={styles.discount}>Discount: </Text>
                  <Text style={styles.discount}>-{discount}%</Text>
                </View>
              )}

              <View style={styles.justify}>
                <Text style={styles.totalPrice}>Total price: </Text>
                <Text style={styles.totalPrice}>{totalPrice}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Go to checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'white',
  },
  box: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 0,
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 10,
    borderColor: 'black',
    borderRadius: 50,
    elevation: 8,
    backgroundColor: 'whitesmoke',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  image: {
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').width / 2.5,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  textGender: {
    color: 'gray',
    textTransform: 'capitalize',
  },
  btnText: {
    color: 'black',
    // fontSize: 16,
  },
  textPrice: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  desc: {
    marginTop: 4,
    padding: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  moreColors: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 6,
  },
  color: {
    textTransform: 'capitalize',
  },
  trash: {
    marginTop: 10,
  },
  quantity: {
    marginTop: 10,
    padding: 5,
    borderWidth: 0.6,
    borderColor: 'black',
    borderRadius: 5,
  },
  other: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  promoCode: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  promoCodeText: {
    fontSize: 17,
    color: 'black',
  },
  conPromoCode: {
    height: 50,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
  },
  boxPromoCode: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  input: {
    width: Dimensions.get('window').width * 0.5,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
  btnConfirm: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'black',
  },
  textConfirm: {
    fontSize: 17,
    color: 'white',
  },
  summary: {
    marginBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
    borderTopWidth: 0.9,
    borderColor: 'black',
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  priceCon: {
    marginTop: 10,
    padding: 10,
  },
  otherPrice: {
    fontSize: 17,
    color: 'gray',
  },
  totalPrice: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  checkoutBtn: {
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 18,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  checkoutText: {
    fontSize: 20,
    color: 'white',
  },
  justify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  discount: {
    fontSize: 17,
    fontWeight: '600',
    color: 'red',
  },
});
