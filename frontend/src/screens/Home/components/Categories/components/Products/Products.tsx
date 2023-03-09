import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {Dimensions} from 'react-native';
import axios from '../../../../../../axios';
import React from 'react';
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
    <View style={styles.cos}>
      <FlatList
        // style={styles.container}
        numColumns={2}
        data={products}
        renderItem={({item}: any) => {
          return (
            <View style={styles.box}>
              <Text style={{color: 'white'}}>{item.name}</Text>
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
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    height: '100%',
  },
  box: {
    width: Dimensions.get('window').width / 2,
    borderColor: 'white',
    borderWidth: 1,
    height: 100,
    marginTop: 10,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
