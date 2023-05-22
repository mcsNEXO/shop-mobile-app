import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import axios from '../../axios';
import {ProductNames} from '../../helpers/typesProducts';
import HeaderSearch from '../../components/Headers/HeaderSearch';

const SearchProducts = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [inputText, setInputText] = React.useState<string>('');
  const [searchNamesOfProducts, setSearchNameOfProducts] = React.useState<
    ProductNames[]
  >([]);
  const [timeoutState, setTimeoutState] = React.useState<number>();

  const handleSearch = async (val: string) => {
    console.log(val);
    try {
      const response = await axios.post('get-search-product-names', {
        inputText: val,
      });
      setSearchNameOfProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchDelayed = (val: string) => {
    setInputText(val);
    if (timeoutState) {
      clearTimeout(timeoutState);
    }

    const timeoutNow = setTimeout(() => {
      handleSearch(val);
    }, 500);

    setTimeoutState(timeoutNow);
  };

  return (
    <View>
      <HeaderSearch
        handleSearchDelayed={handleSearchDelayed}
        inputText={inputText}
        onEnterPress={() => navigation.navigate('Products', {inputText})}
      />
      {searchNamesOfProducts?.map((el, index) => (
        <View key={index}>
          <TouchableOpacity
            style={styles.nameText}
            onPress={() => navigation.navigate('Products', {inputText})}>
            <Text style={styles.nameText}>{el.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SearchProducts;

const styles = StyleSheet.create({
  nameText: {
    marginTop: 8,
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize',
    backgroundColor: 'white',
  },
});
