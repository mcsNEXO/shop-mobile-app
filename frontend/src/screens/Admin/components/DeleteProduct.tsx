import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import axios from '../../../axios';
import React from 'react';
import DropdownComponent from './Dropdown';
import {
  categoryOptions,
  genderOptions,
  typeOptions,
} from '../../../data/optionsToAddProduct';
import {OrdinaryProduct} from '../../../helpers/typesProducts';
import {IMAGENAME} from '../../../assets/images/shoes/image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeletePopUp from './DeletePopUp';
import Toast from 'react-native-toast-message';
import {errorToast} from '../../../helpers/toasts';

type dropdownType = {
  label: string;
  value: string;
};
type SelectedValues = {
  gender: dropdownType;
  type: dropdownType;
  category: dropdownType;
};

const DeleteProduct = () => {
  const [products, setProducts] = React.useState<OrdinaryProduct[]>();
  const [isOpen, setIsOpen] = React.useState<number>(-1);
  const [name, setName] = React.useState<string>('');
  const [isFocused, setIsFocused] = React.useState<string>('');
  const [isOpenSearchElement, setIsOpenSearchElement] =
    React.useState<boolean>(true);
  const [animation] = React.useState(
    new Animated.Value(isOpenSearchElement ? 1 : 0),
  );
  const [selectedValues, setSelectedValues] = React.useState<SelectedValues>({
    gender: {label: '', value: ''},
    type: {label: '', value: ''},
    category: {label: '', value: ''},
  });

  const findProducts = async () => {
    try {
      const data = {
        type: selectedValues.type.value ? selectedValues.type.value : null,
        category: selectedValues.category.value
          ? selectedValues.category.value
          : null,
        gender: [
          selectedValues.gender.value ? selectedValues.gender.value : null,
        ],
        inputText: name ?? null,
      };
      const res = await axios.post('get-searched-products', data);
      setProducts(res.data.products);
      res.data.product?.length === 0
        ? setIsOpenSearchElement(false)
        : setIsOpenSearchElement(true);
    } catch (e) {}
  };

  const handleValueChange = (item: dropdownType, option: string) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [option]: item,
    }));
  };
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
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpenSearchElement ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpenSearchElement]);

  const searchElementHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 380],
  });

  const handleClear = (id: string) => {
    setProducts(products?.filter(x => x._id !== id));
    setIsOpenSearchElement(true);
    setName('');
    setSelectedValues({
      category: {label: '', value: ''},
      gender: {label: '', value: ''},
      type: {label: '', value: ''},
    });
    errorToast('Product has been deleted');
  };

  return (
    <>
      <View style={{zIndex: 100}}>
        <Toast />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.buttonToggle}
          onPress={() => setIsOpenSearchElement(!isOpenSearchElement)}>
          <Icon
            name={
              isOpenSearchElement ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
        <Animated.View style={{height: searchElementHeight}}>
          <Text style={styles.title}>Delete product</Text>
          <View style={styles.line} />
          <View style={styles.boxValue}>
            <Text style={styles.name}>Name: </Text>
            <TextInput
              style={[
                styles.input,
                {borderColor: isFocused === 'name' ? 'blue' : 'gray'},
              ]}
              onChangeText={val => setName(val)}
              onFocus={() => setIsFocused('name')}
              onBlur={() => setIsFocused('')}
            />
          </View>
          <DropdownComponent
            label="Type"
            options={typeOptions}
            value={selectedValues.type}
            onFocus={() => setIsFocused('type')}
            onChange={item => handleValueChange(item, 'type')}
          />
          <DropdownComponent
            label="Category"
            options={categoryOptions}
            value={selectedValues.category}
            onFocus={() => setIsFocused('category')}
            onChange={item => handleValueChange(item, 'type')}
          />
          <DropdownComponent
            label="Gender"
            options={genderOptions}
            value={selectedValues.gender}
            onFocus={() => setIsFocused('gender')}
            onChange={item => handleValueChange(item, 'type')}
          />
          <TouchableOpacity style={styles.button} onPress={findProducts}>
            <Text style={styles.textBtn}>Search products</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.container}>
          {products?.length !== 0 && (
            <FlatList
              numColumns={2}
              data={products}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    {index === isOpen && (
                      <DeletePopUp
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        item={item}
                        handleClear={handleClear}
                      />
                    )}
                    <TouchableOpacity
                      style={getStyles(index, products?.length)}
                      onPress={() => setIsOpen(index)}>
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
                      </View>
                    </TouchableOpacity>
                  </>
                );
              }}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default DeleteProduct;

const styles = StyleSheet.create({
  title: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 26,
    textAlign: 'center',
    color: 'black',
  },
  line: {
    backgroundColor: 'black',
    height: 1,
  },
  boxValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },
  name: {
    fontSize: 18,
    color: 'black',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 36,
    borderWidth: 0.7,
    borderColor: 'gray',
    borderRadius: 8,
    fontSize: 16,
    padding: 0,
    paddingLeft: 6,
    fontWeight: '600',
    backgroundColor: 'white',
  },
  button: {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 12,
    backgroundColor: '#1677ff',
  },
  textBtn: {
    fontSize: 17,
    color: 'white',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(160, 160, 160, 0.700)',
  },
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
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
  desc: {
    marginTop: 4,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  lastChild: {
    width: Dimensions.get('window').width / 2 - 10,
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  buttonToggle: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    top: 5,
    left: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    zIndex: 5,
    backgroundColor: 'white',
  },
});
