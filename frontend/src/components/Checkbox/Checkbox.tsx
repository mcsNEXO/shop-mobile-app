import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ICheckBox {
  value: boolean;
  label: string;
  setIsChecked: () => void;
}

const Checkbox = ({value, label, setIsChecked}: ICheckBox) => {
  return (
    <View style={styles.checkbox}>
      <TouchableOpacity onPress={setIsChecked}>
        {value ? (
          <Icon name="check-box" size={24} color="black" />
        ) : (
          <Icon name="check-box-outline-blank" size={24} color="black" />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginLeft: 6,
  },
});
