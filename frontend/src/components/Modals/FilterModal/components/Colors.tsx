import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colorsData} from '../../../../data/filterData';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IColors {
  colorsHandler: (color: string) => void;
  colors: string[];
  style: any;
}

const Colors = ({colorsHandler, colors, style}: IColors) => {
  return (
    <View style={[style]}>
      <Text style={styles.title}>Filter by colors</Text>
      <View style={styles.colorContainer}>
        {colorsData?.map(color => (
          <View
            key={color}
            style={{
              width: '20%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              key={color}
              onPress={() => colorsHandler(color)}
              style={[
                styles.color,
                {
                  backgroundColor: color,
                  borderColor: color === 'white' ? 'black' : color,
                },
              ]}>
              {colors.indexOf(color) > -1 && (
                <Icon
                  name="check"
                  size={24}
                  color={color === 'black' ? 'white' : 'black'}
                />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Colors;

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
  },
  colorContainer: {
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
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
