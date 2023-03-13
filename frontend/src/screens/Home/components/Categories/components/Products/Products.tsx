import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {Dimensions} from 'react-native';
import axios from '../../../../../../axios';
import React from 'react';
import {IMAGENAME} from '../../../../../../assets/images/shoes/image';
import {useRoute} from '@react-navigation/native';

const Products = () => {
  const route: any = useRoute();

  const [products, setProducts] = React.useState();

  const getData = async () => {
    try {
      const data = {
        type: route.params.type.toLowerCase(),
        category: route?.params.category.toLowerCase(),
        gender: route?.params.gender.toLowerCase(),
      };
      const res = await axios.post('get-searched-products', data);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({item}: any) => {
          return (
            <View style={styles.box}>
              <Image source={IMAGENAME.airforce.white} style={styles.image} />
              {/* <Text style={{color: 'white'}}>{item.name}</Text> */}
              <View style={styles.desc}>
                <Text style={styles.text}>{item.name}</Text>
                <Text
                  style={
                    styles.textGender
                  }>{`${item.gender}'s ${item.type}`}</Text>
                <Text style={styles.textPrice}>{item.price}$</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  box: {
    width: Dimensions.get('window').width / 2 - 10,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  image: {
    height: 200,
    backgroundColor: 'transparent',
    width: Dimensions.get('screen').width / 2 - 10,
    justifyContent: 'center',
  },
  textGender: {
    color: 'gray',
    textTransform: 'capitalize',
  },
  textPrice: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  desc: {
    marginTop: 4,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
