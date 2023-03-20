import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-radio-buttons-group';
import Checkbox from '../../Checkbox/Checkbox';
import {colorsData} from '../../../data';
interface IFilterModal {
  closeModal: () => void;
}

const FilterModal = ({closeModal}: IFilterModal) => {
  const [sortedBy, setSortedBy] = React.useState<string>('1');
  const [price, setPrice] = React.useState<string>('');
  const [toPrice, setToPrice] = React.useState<string>('');
  const [isChecked, setIsChecked] = React.useState<{
    man: boolean;
    woman: boolean;
    kids: boolean;
  }>({
    man: false,
    woman: false,
    kids: false,
  });

  const radioButtons = [
    {
      id: '1',
      label: 'Featured',
      value: 'featured',
      selected: false,
    },
    {
      id: '2',
      label: 'Newest',
      value: 'newest',
      selected: false,
    },
    {
      id: '3',
      label: 'Price: High-Low',
      value: 'high-low',
      selected: false,
    },
    {
      id: '4',
      label: 'Price: Low-High',
      value: 'low-high',
      selected: false,
    },
  ];
  const ALLOW_NUMBERS = '0123456789';

  const priceHandler = (text: string, type: string) => {
    let newPrice = '';
    for (var i = 0; i < text.length; i++) {
      if (ALLOW_NUMBERS.indexOf(text[i]) > -1) {
        newPrice = newPrice + text[i];
      } else {
        return;
      }
    }
    type === 'toPrice' ? setToPrice(newPrice) : setPrice(newPrice);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sort and filter</Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="close" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Sort by</Text>
        {radioButtons.map(value => (
          <RadioButton
            id={value.id}
            key={value.id}
            label={value.label}
            value={value.value}
            selected={value.id === sortedBy}
            size={22}
            labelStyle={styles.itemSort}
            onPress={value => {
              setSortedBy(value);
            }}
          />
        ))}
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Select gender: </Text>
        <Checkbox
          value={isChecked.man}
          label="Man"
          setIsChecked={() => setIsChecked({...isChecked, man: !isChecked.man})}
        />
        <Checkbox
          value={isChecked.woman}
          label="Woman"
          setIsChecked={() =>
            setIsChecked({...isChecked, woman: !isChecked.woman})
          }
        />
        <Checkbox
          value={isChecked.kids}
          label="Kids"
          setIsChecked={() =>
            setIsChecked({...isChecked, kids: !isChecked.kids})
          }
        />
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Price</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <View style={styles.priceBox}>
              <Text style={styles.textWidth}>From</Text>
              <TextInput
                keyboardType="numeric"
                value={price}
                style={styles.numericInput}
                onChangeText={value => priceHandler(value, 'price')}
              />
              <Text style={styles.dolar}>$</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.textWidth}>To</Text>
              <TextInput
                keyboardType="numeric"
                value={toPrice}
                style={styles.numericInput}
                onChangeText={value => priceHandler(value, 'toPrice')}
              />
              <Text style={styles.dolar}>$</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text
              style={{
                color: 'white',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Filter by colors</Text>
        <View style={styles.colorContainer}>
          {colorsData?.map(color => (
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <TouchableOpacity
                key={color}
                style={[
                  styles.color,
                  {
                    backgroundColor: color,
                    borderColor: color === 'white' ? 'black' : color,
                  },
                ]}></TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'black',
  },
  headerText: {
    fontSize: 22,
    color: 'black',
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
  itemSort: {
    alignItems: 'flex-start',
    fontSize: 16,
    color: 'black',
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
  },
  numericInput: {
    position: 'relative',
    width: 200,
    height: 40,
    paddingRight: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 16,
  },
  priceBox: {
    marginTop: 5,
    marginLeft: 10,
  },
  textWidth: {
    width: 50,
    marginBottom: 5,
    fontSize: 17,
    color: 'black',
  },
  dolar: {
    position: 'absolute',
    top: 33,
    right: 6,
    padding: 5,
    borderRadius: 100,
    color: 'black',
    backgroundColor: 'rgb(221, 220, 220);',
  },
  colorContainer: {
    width: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  color: {
    width: 35,
    height: 35,
    flexWrap: 'wrap',
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 100,
  },
  saveButton: {
    width: 80,
    height: 26,
    borderRadius: 10,
    marginLeft: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
