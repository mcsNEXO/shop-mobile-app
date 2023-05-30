import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';

type dropdownType = {
  label: string;
  value: string;
};

const DropdownComponent = ({
  label,
  options,
  value,
  onFocus,
  onChange,
}: {
  label: string;
  options: dropdownType[];
  value: dropdownType;
  onFocus: () => void;
  onChange: (item: dropdownType) => void;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  return (
    <View style={styles.boxValue}>
      <Text style={styles.name}>{label}: </Text>
      <Dropdown
        style={[styles.input, {borderColor: isFocused ? 'blue' : 'gray'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.container}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={styles.itemContainer}
        activeColor={'#e6f4ff'}
        data={options}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={`Select ${label.toLowerCase()}`}
        searchPlaceholder={`Search ${label.toLowerCase()}`}
        value={value}
        onBlur={() => setIsFocused(false)}
        onFocus={handleFocus}
        onChange={item => {
          setIsFocused(false);
          onChange(item);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
  },
  container: {
    borderRadius: 12,
    paddingBottom: 8,
  },
  itemTextStyle: {
    color: 'black',
    fontSize: 15,
  },
  itemContainer: {
    width: '90%',
    height: 55,
    borderRadius: 10,
    fontSize: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 12,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
