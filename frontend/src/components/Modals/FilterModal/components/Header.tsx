import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const Header = ({closeModal}: {closeModal: () => void}) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Sort and filter</Text>
    <TouchableOpacity onPress={closeModal}>
      <Icon name="close" color="black" size={30} />
    </TouchableOpacity>
  </View>
);

export default Header;

const styles = StyleSheet.create({
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
});
