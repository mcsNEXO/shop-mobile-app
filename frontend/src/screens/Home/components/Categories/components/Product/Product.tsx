import {
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGENAME} from '../../../../../../assets/images/shoes/image';
import axios from '../../../../../../axios';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SizeModal from './SizeModal';
import useCartHook from '../../../../../../hooks/useCart';
import {useFavoriteContext} from '../../../../../../context/FavoriteContext';
import {OrdinaryProduct} from '../../../../../../helpers/typesProducts';

type errorType = {
  error: string;
  errorName: string;
};

const Product = () => {
  //states
  const [product, setProduct] = React.useState<OrdinaryProduct | null>(null);
  const [openedSizeModal, setOpenedSizeModal] = React.useState<boolean>(false);
  const [size, setSize] = React.useState<number | null>(null);
  const [error, setError] = React.useState<errorType>({
    error: '',
    errorName: '',
  });

  //hooks
  const {favorite, addFavorite, deleteFavorite} = useFavoriteContext();
  const {addProduct} = useCartHook();
  const route: any = useRoute();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    fetchProduct();
  }, []);

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

  const addFavProduct = () => {
    if (!product) return;
    size
      ? addFavorite({
          ...product,
          colors: route.params.color,
          image: product.image
            ?.filter(x => x.includes(route.params.color))
            .toString(),
          size: size,
        })
      : addFavorite({
          ...product,
          image: product.image
            ?.filter(x => x.includes(route.params.color))
            .toString(),
          colors: route.params.color,
        });
  };

  const deleteFavProduct = () => {
    if (!product) return;
    deleteFavorite({
      ...product,
      image: product.image
        ?.filter(x => x.includes(route.params.color))
        .toString(),
      colors: route.params.color,
    });
  };

  const handleAddToCart = (product: any) => {
    if (!product || !size)
      return setError({error: 'Select size!', errorName: 'size'});
    addProduct({
      ...product,
      colors: route.params.color,
      size: size,
    });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {product && (
          <Image
            source={
              IMAGENAME[product?.name?.replace(/\s/g, '')][route?.params?.color]
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
                  source={IMAGENAME[product?.name?.replace(/\s/g, '')][color]}
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
          {error.errorName === 'size' && (
            <Text style={styles.error}>{error.error}</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setOpenedSizeModal(true)}>
            <Text style={styles.btnText}>
              {size ? `Selected size: ${size}` : 'Select size'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => handleAddToCart(product)}>
            <Text style={styles.cartBtn}>Add to cart</Text>
          </TouchableOpacity>
          {favorite?.find(
            x =>
              JSON.stringify(x) ===
              JSON.stringify({
                ...product,
                size: x.size,
                image: product?.image
                  ?.filter(x => x.includes(route.params.color))
                  .toString(),
                quantity: 1,
                colors: route.params.color,
              }),
          ) ? (
            <TouchableOpacity style={styles.button} onPress={deleteFavProduct}>
              <Text style={styles.btnText}>
                <Icon name={'favorite'} size={28} />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={addFavProduct}>
              <Text style={styles.btnText}>
                <Icon name={'favorite-border'} size={28} />
              </Text>
            </TouchableOpacity>
          )}
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
      {openedSizeModal && product && (
        <SizeModal
          isOpen={openedSizeModal}
          gender={product.gender}
          type={product.type}
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
  error: {
    marginTop: 5,
    fontSize: 17,
    textAlign: 'center',
    color: 'red',
  },
});
