import {View, Text, TextInput, StyleSheet} from 'react-native';

interface IPriceInputs {
  price: string;
  toPrice: string;
  priceHandler: (text: string, type: string) => void;
  style: any;
}

const PriceInputs = ({price, toPrice, priceHandler, style}: IPriceInputs) => (
  <View style={style}>
    <Text style={styles.title}>Price</Text>
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
);
export default PriceInputs;

const styles = StyleSheet.create({
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
});
