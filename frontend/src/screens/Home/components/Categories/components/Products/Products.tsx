import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from '../../../../../../axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IMAGENAME} from '../../../../../../assets/images/shoes/image';
import FilterModal from '../../../../../../components/Modals/FilterModal/FilterModal';
import PrevButton from '../../../../../../components/Buttons/PrevButton';

const Products = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const defaultValues = {
    sortedBy: {
      value: 'name',
      sort: 1,
    },
    price: '0',
    toPrice: '1000',
    colors: [],
    genders: [route?.params.gender.toLowerCase()],
    sizes: [],
  };

  const [products, setProducts] = React.useState<any[]>();
  const [values, setValues] = React.useState<{
    sortedBy: {
      value: string;
      sort: number;
      label?: string;
    };
    price: string;
    toPrice: string;
    colors: string[];
    genders: any[];
    sizes: number[];
  }>(defaultValues);
  const [openedFilterModal, setOpendFilterModal] =
    React.useState<boolean>(false);
  const handleOpenedFilterModal = (value: boolean) => {
    setOpendFilterModal(!openedFilterModal);
  };

  const getData = async () => {
    console.log('s');
    try {
      const data = {
        type: route.params.type.toLowerCase(),
        category: route?.params.category.toLowerCase(),
        gender: [route?.params.gender.toLowerCase()],
      };
      const res = await axios.post('get-searched-products', data);
      return setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <PrevButton
          openedFilterModal={openedFilterModal}
          setOpenedFilterModal={setOpendFilterModal}
        />
      ),
    });
  }, [openedFilterModal]);

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

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <View style={getStyles(index, products?.length)}>
              <Image source={IMAGENAME.airforce.white} style={styles.image} />
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
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.color,
                      {
                        backgroundColor: color,
                        borderColor: color === 'white' ? 'black' : color,
                      },
                    ]}></TouchableOpacity>
                ))}
              </View>
            </View>
          );
        }}
      />
      {openedFilterModal && (
        <FilterModal
          values={values}
          defaultValues={defaultValues}
          setValues={setValues}
          setProducts={setProducts}
          closeModal={() => handleOpenedFilterModal(false)}
        />
      )}
      {!openedFilterModal && (
        <View style={styles.iconBox}>
          <TouchableOpacity onPress={() => handleOpenedFilterModal(true)}>
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
