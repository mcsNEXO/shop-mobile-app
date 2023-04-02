import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGENAME} from '../../../../../../assets/images/shoes/image';
import axios from '../../../../../../axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SizeModal from './SizeModal';

const Product = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [product, setProduct] = React.useState<any>(null);
  const [openedSizeModal, setOpenedSizeModal] = React.useState<boolean>(false);
  const [size, setSize] = React.useState<number | null>(null);
  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (openedSizeModal) {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      navigation.setOptions({
        headerShown: true,
      });
    }
  }, [openedSizeModal]);

  const fetchProduct = async () => {
    const data = {
      productId: route.params.productId,
    };
    try {
      const res = await axios.post('fetch-product', data);
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {product && (
          <Image
            source={
              IMAGENAME[product?.name?.replaceAll(' ', '')][
                route?.params?.color
              ]
            }
            style={styles.image}
          />
        )}
        <ScrollView style={styles.imagesContainer} horizontal>
          {product?.colors.map((color: string, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.underImage}
                onPress={() => {
                  navigation.navigate('Product', {
                    title:
                      product.name.charAt(0).toUpperCase() +
                      product.name.slice(1),
                    productId: product._id,
                    color: color,
                  });
                }}>
                <Image
                  style={styles.imageOption}
                  source={IMAGENAME[product?.name?.replaceAll(' ', '')][color]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ScrollView style={styles.descContainer}>
          <Text style={styles.genderText}>
            {`${product?.gender}'s ${product?.type}`}
          </Text>
          <Text style={styles.title}>{product?.name}</Text>
          <Text style={styles.color}>Color: {route.params.color}</Text>
          <Text style={styles.price}>{product?.price}$</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setOpenedSizeModal(true)}>
            <Text style={styles.btnText}>
              {size ? `Selected size: ${size}` : 'Select size'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]}>
            <Text style={styles.cartBtn}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>
              <Icon name="favorite-border" size={28} />
            </Text>
          </TouchableOpacity>
          <Text style={styles.descText}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Text>
        </ScrollView>
      </ScrollView>
      {openedSizeModal && (
        <SizeModal
          gender={product?.gender}
          type={product?.type}
          closeModal={() => setOpenedSizeModal(false)}
          setSize={setSize}
        />
      )}
    </>
  );
};
export default Product;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  imagesContainer: {
    marginBottom: 40,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width + 100,
    maxHeight: 450,
  },
  underImage: {
    width: 80,
    height: 80,
    marginLeft: 5,
    backgroundColor: 'black',
  },
  imageOption: {
    width: 80,
    height: 80,
  },
  genderText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: 'gray',
    textAlign: 'center',
  },
  descContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: 'black',
    fontSize: 35,
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  price: {
    marginTop: 6,
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  color: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  descText: {
    marginTop: 30,
    fontSize: 17,
    color: 'black',
  },
  button: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  btnText: {
    fontSize: 18,
    color: 'black',
  },
  cartBtn: {
    color: 'white',
    fontSize: 18,
  },
});
