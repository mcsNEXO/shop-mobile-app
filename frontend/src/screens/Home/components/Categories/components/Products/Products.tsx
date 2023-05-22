import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from '../../../../../../axios';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IMAGENAME} from '../../../../../../assets/images/shoes/image';
import FilterModal from '../../../../../../components/Modals/FilterModal/FilterModal';
import {
  DefaultFilterValues,
  OrdinaryProduct,
} from '../../../../../../helpers/typesProducts';

const Products = () => {
  const route: any = useRoute();
  const defaultValues = {
    sortedBy: {
      value: 'name',
      sort: 1,
    },
    price: '0',
    toPrice: '1000',
    colors: [],
    genders: [
      route?.params.gender ? route?.params.gender.toLowerCase() : 'woman',
      'man',
    ],
    sizes: [],
  };
  //states
  const [openedFilterModal, setOpendFilterModal] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<OrdinaryProduct[]>();
  const [values, setValues] =
    React.useState<DefaultFilterValues>(defaultValues);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleOpenedFilterModal = () => {
    setOpendFilterModal(!openedFilterModal);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const data = {
        type: route.params.type ? route.params.type.toLowerCase() : null,
        category: route.params.category
          ? route?.params.category.toLowerCase()
          : null,
        gender: [
          route?.params.gender ? route?.params.gender.toLowerCase() : null,
        ],
        inputText: route.params?.inputText ?? null,
      };
      const res = await axios.post('get-searched-products', data);
      return setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log('route', route);

  React.useEffect(() => {
    getData();
  }, []);

  const getStyles = (index: number, productsLength: number | undefined) => {
    if (productsLength === undefined) return;
    if (productsLength === 1) {
      return styles.lastChild;
    } else if (productsLength - 1 === index) {
      if (index % 2 == 0) {
        if (index > 0) {
          return styles.lastChild;
        }
      }
    }
    return styles.box;
  };
  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={getStyles(index, products?.length)}
              onPress={() => {
                navigation.navigate('Product', {
                  title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                  productId: item._id,
                  color: item?.colors[item?.index],
                });
              }}>
              <Image
                source={
                  IMAGENAME[item.name.replace(/\s/g, '')][
                    item.colors[item.index]
                  ]
                }
                style={styles.image}
              />
              <View style={styles.desc}>
                <Text style={styles.text}>{item.name}</Text>
                <Text
                  style={
                    styles.textGender
                  }>{`${item.gender}'s ${item.type}`}</Text>
                <Text style={styles.textPrice}>{item.price}$</Text>
              </View>
              <View style={styles.moreColors}>
                {item.colors.map((color: string, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.color,
                      {
                        backgroundColor: color,
                        borderColor: color === 'white' ? 'black' : color,
                      },
                    ]}></View>
                ))}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {openedFilterModal && (
        <FilterModal
          isOpen={openedFilterModal}
          values={values}
          defaultValues={defaultValues}
          setValues={setValues}
          setProducts={setProducts}
          closeModal={handleOpenedFilterModal}
        />
      )}
      {!openedFilterModal && (
        <View style={styles.iconBox}>
          <TouchableOpacity onPress={handleOpenedFilterModal}>
            <Icon size={40} name="filter-alt" color={'black'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'white',
  },
  box: {
    width: Dimensions.get('window').width / 2 - 10,
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
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
  lastChild: {
    width: Dimensions.get('window').width / 2 - 10,
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
  },
  image: {
    width: Dimensions.get('screen').width / 2 - 10,
    height: 200,
    justifyContent: 'center',
  },
  textGender: {
    color: 'gray',
    textTransform: 'capitalize',
  },
  textPrice: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  desc: {
    marginTop: 4,
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
    width: 16,
    height: 16,
    marginLeft: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
});
