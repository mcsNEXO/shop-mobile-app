import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import SortBy from './components/SortBy';
import CheckBoxes from './components/CheckBoxes';
import PriceInputs from './components/PriceInputs';
import Colors from './components/Colors';
import Header from './components/Header';
import BottomButtons from './components/BottomButtons';
import axios from '../../../axios';
import Size from './components/Size';

interface IdefaultValues {
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
}

interface IFilterModal {
  closeModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  values: any;
  setValues: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  defaultValues: IdefaultValues;
}

const FilterModal = ({
  closeModal,
  setProducts,
  values,
  setValues,
  defaultValues,
}: IFilterModal) => {
  const ALLOW_NUMBERS = '0123456789';
  const [sortedBy, setSortedBy] = React.useState<{
    value: string;
    sort: number;
  }>(values.sortedBy);
  const [price, setPrice] = React.useState<string>(values.price);
  const [toPrice, setToPrice] = React.useState<string>(values.toPrice);
  const [colors, setColors] = React.useState<string[]>(values.colors);
  const [genders, setGenders] = React.useState<string[]>(values.genders);
  const [sizes, setSizes] = React.useState<number[]>(values.sizes);

  const resetValues = () => {
    setSortedBy(defaultValues.sortedBy);
    setPrice(defaultValues.price);
    setToPrice(defaultValues.toPrice);
    setColors(defaultValues.colors);
    setGenders(defaultValues.genders);
    setSizes(defaultValues.sizes);
    setValues(defaultValues);
  };

  const priceHandler = (text: string, type: string) => {
    let newPrice = '';
    for (let i = 0; i < text.length; i++) {
      if (ALLOW_NUMBERS.indexOf(text[i]) > -1) {
        newPrice = newPrice + text[i];
      } else {
        return;
      }
    }
    type === 'toPrice' ? setToPrice(newPrice) : setPrice(newPrice);
  };

  const sizesHandler = (size: number) => {
    if (sizes.length === 0) {
      let newSizes = [size];
      setSizes(newSizes);
    } else {
      const index = sizes.indexOf(size);
      if (index !== -1) {
        sizes.splice(index, 1);
        setSizes([...sizes]);
      } else {
        let newSizes = [...sizes, size];
        setSizes(newSizes);
      }
    }
  };

  const colorsHandler = (color: string) => {
    if (colors.length === 0) {
      let newColors = [color];
      setColors(newColors);
    } else {
      const index = colors.indexOf(color);
      if (index !== -1) {
        colors.splice(index, 1);
        setColors([...colors]);
      } else {
        let newColors = [...colors, color];
        setColors(newColors);
      }
    }
  };

  const setGenderHandler = (gender: string) => {
    if (genders.length === 0) {
      let genderArr = [gender];
      setGenders(genderArr);
    } else {
      const index = genders.indexOf(gender);
      if (index !== -1) {
        genders.splice(index, 1);
        setGenders([...genders]);
      } else {
        let genderArr = [...genders, gender];
        setGenders(genderArr);
      }
    }
  };
  const checkIsEmptyInput = () => {
    if (toPrice === '') {
      setToPrice('1000');
    }
    if (price === '') {
      setPrice('0');
    }
  };
  const saveFiltersData = async () => {
    setValues({sortedBy, price, toPrice, colors, genders, sizes});
    if (!price || !toPrice) checkIsEmptyInput();
    const url = {
      colors: colors.length > 0 ? colors : null,
      size: [].length > 0 ? colors : null,
      sort: sortedBy,
      gender: genders,
      price: `${price ? price : '0'}-${toPrice ? toPrice : '1000'}`,
      sizes: sizes.length > 0 ? sizes : null,
    };
    const res = await axios.post('get-shoes', {url});
    setProducts(res.data.shoes);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header closeModal={closeModal} />
        <SortBy
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
          style={styles.component}
        />
        <CheckBoxes
          genders={genders}
          setGenderHandler={setGenderHandler}
          style={styles.component}
        />
        <PriceInputs
          price={price}
          toPrice={toPrice}
          priceHandler={priceHandler}
          style={styles.component}
        />
        <Colors
          colorsHandler={colorsHandler}
          colors={colors}
          style={styles.component}
        />
        <Size
          style={styles.component}
          sizes={sizes}
          sizesHandler={sizesHandler}
        />
      </ScrollView>
      {/* <BottomButtons /> */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomBtn} onPress={resetValues}>
          <Text style={styles.textBtn}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={saveFiltersData}>
          <Text style={styles.textBtn}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  component: {
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    marginTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  saveButton: {
    width: 80,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  bottomButtons: {
    width: Dimensions.get('window').width,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: 'white',
  },
  bottomBtn: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'black',
  },
  textBtn: {
    fontSize: 17,
    color: 'white',
  },
});
