import {View, Text, StyleSheet} from 'react-native';
import Checkbox from '../../../Checkbox/Checkbox';

interface ICheckBoxes {
  genders: string[];
  setGenderHandler: (gender: string) => void;
  style: any;
}

const CheckBoxes = ({genders, setGenderHandler, style}: ICheckBoxes) => (
  <View style={style}>
    <Text style={styles.title}>Select gender: </Text>
    <Checkbox
      value={genders.includes('man')}
      label="Man"
      setIsChecked={() => setGenderHandler('man')}
    />
    <Checkbox
      value={genders.includes('woman')}
      label="Woman"
      setIsChecked={() => setGenderHandler('woman')}
    />
    <Checkbox
      value={genders.includes('kids')}
      label="Kids"
      setIsChecked={() => setGenderHandler('kids')}
    />
  </View>
);

export default CheckBoxes;

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
  },
});
