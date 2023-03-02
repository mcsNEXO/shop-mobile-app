import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Item from './components/Item';
import {data} from '../../../temporary-data';

const NavPanel = () => {
  const [selectedGender, setSelectedGender] = React.useState<number | null>(0);
  console.log(selectedGender);
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={styles.flatList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => (
        <Item
          title={item.label}
          isActive={index === selectedGender}
          setSelectedGender={() => setSelectedGender(index)}
        />
      )}
    />
  );
};

export default NavPanel;

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
});
