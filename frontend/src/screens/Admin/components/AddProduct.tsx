import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {sizesGenders} from '../../../data/filterData';
import DropdownComponent from './Dropdown';
import MultiSelectComponent from './MultiSelect';
import {
  categoryOptions,
  colorsOptions,
  genderOptions,
  sizeClothes,
  typeOptions,
} from '../../../data/optionsToAddProduct';
import axios from '../../../axios';

type dropdownType = {
  label: string;
  value: string;
};
type SelectedValues = {
  gender: dropdownType;
  type: dropdownType;
  category: dropdownType;
};

const AddProduct = () => {
  const [selectedValues, setSelectedValues] = React.useState<SelectedValues>({
    gender: {label: '', value: ''},
    type: {label: '', value: ''},
    category: {label: '', value: ''},
  });
  const [name, setName] = React.useState<string>('');
  const [colorsValue, setColorsValue] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<number>();
  const [sizesValue, setSizesValue] = React.useState<string[]>([]);
  const [sizesData, setSizesData] = React.useState<dropdownType[]>([]);
  const [isFocused, setIsFocused] = React.useState<string>('');

  React.useEffect(() => {
    const {gender, type} = selectedValues;
    gender && handleSizeOptions(gender.value);
  }, [selectedValues.type, selectedValues.gender]);

  const handleSizeOptions = (genderValue: string) => {
    if (!selectedValues.type) {
      return 'Select type';
    } else if (selectedValues.type.value === 'shoes') {
      if (genderValue === '') return 'Select gender';
      else {
        console.log(genderValue);
        console.log(sizesGenders['woman']);
        const transformedArray = sizesGenders[genderValue]?.map(
          (value: number) => ({
            value: value.toString(),
            label: value.toString(),
          }),
        );
        setSizesValue(null as any);
        return setSizesData(transformedArray);
      }
    } else if (selectedValues.type.value === 'clothes') {
      setSizesValue(null as any);
      return setSizesData(sizeClothes);
    }
  };

  const handleTypeChange = (item: dropdownType) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      type: item,
    }));
    handleSizeOptions(selectedValues.gender?.value);
  };

  const handleGenderChange = (item: dropdownType) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      gender: item,
    }));
    handleSizeOptions(item.value);
  };

  const handleCategoryChange = (item: dropdownType) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      category: item,
    }));
  };

  const addProduct = async () => {
    try {
      const res = await axios.post('add-product-db', {
        gender: selectedValues.gender.value,
        nameProduct: name,
        colors: colorsValue,
        price: price,
        size: sizesValue,
        type: selectedValues.type.value,
        category: selectedValues.category.value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Add new product</Text>
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
        onChange={handleTypeChange}
      />
      <DropdownComponent
        label="Category"
        options={categoryOptions}
        value={selectedValues.category}
        onFocus={() => setIsFocused('category')}
        onChange={handleCategoryChange}
      />
      <DropdownComponent
        label="Gender"
        options={genderOptions}
        value={selectedValues.gender}
        onFocus={() => setIsFocused('gender')}
        onChange={handleGenderChange}
      />
      <MultiSelectComponent
        label="Colors"
        options={colorsOptions}
        value={colorsValue}
        onFocus={() => setIsFocused('colors')}
        onChange={setColorsValue}
      />
      <View style={styles.boxValue}>
        <Text style={styles.name}>Price ($): </Text>
        <TextInput
          style={[
            styles.input,
            {borderColor: isFocused === 'price' ? 'blue' : 'gray'},
          ]}
          onFocus={() => setIsFocused('price')}
          onBlur={() => setIsFocused('')}
          inputMode="numeric"
          onChangeText={val => setPrice(Number(val))}
        />
      </View>

      {!selectedValues.gender || !selectedValues.type || !sizesData.length ? (
        <View style={styles.boxValue}>
          <Text style={styles.name}>Sizes: </Text>
          <Text style={{fontSize: 18, color: '#cd201f'}}>
            Select gender & type!
          </Text>
        </View>
      ) : (
        <MultiSelectComponent
          label="Sizes"
          options={sizesData}
          value={sizesValue}
          onFocus={() => setIsFocused('sizes')}
          onChange={setSizesValue}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        disabled={
          sizesValue?.length === 0 ||
          !sizesValue ||
          colorsValue?.length === 0 ||
          !price ||
          !selectedValues.type.value ||
          !selectedValues.gender.value ||
          !selectedValues.category.value
            ? true
            : false
        }
        onPress={addProduct}>
        <Text style={styles.textBtn}>Add product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;

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
});
