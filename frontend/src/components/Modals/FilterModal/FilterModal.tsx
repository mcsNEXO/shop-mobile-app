import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import SortBy from './components/SortBy';
import CheckBoxes from './components/CheckBoxes';
import PriceInputs from './components/PriceInputs';
import Colors from './components/Colors';
import Header from './components/Header';
import BottomButtons from './components/BottomButtons';
import axios from '../../../axios';
import useCategory from '../../../hooks/useCategory';
interface IFilterModal {
  closeModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  products: any;
}

const FilterModal = ({closeModal, setProducts, products}: IFilterModal) => {
  const {category} = useCategory();
  const ALLOW_NUMBERS = '0123456789';

  const [sortedBy, setSortedBy] = React.useState<string>('featured');
  const [price, setPrice] = React.useState<string>('0');
  const [toPrice, setToPrice] = React.useState<string>('1000');
  const [colors, setColors] = React.useState<string[]>([]);
  const [genders, setGenders] = React.useState([category.toLowerCase()]);

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
    if (!price || !toPrice) checkIsEmptyInput();
    const url = {
      colors: colors.length > 0 ? colors : null,
      size: [].length > 0 ? colors : null,
      sort: sortedBy,
      gender: genders,
      price: `${price ? price : '0'}-${toPrice ? toPrice : '1000'}`,
    };
    const res = await axios.post('get-shoes', {url});
    setProducts(res.data.shoes);
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
      </ScrollView>
      {/* <BottomButtons /> */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.textBtn}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={saveFiltersData}>
          <Text style={styles.textBtn} onPress={saveFiltersData}>
            Save
          </Text>
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
