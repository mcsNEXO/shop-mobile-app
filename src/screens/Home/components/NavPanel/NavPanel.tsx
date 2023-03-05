import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Item from './components/Item';
import {data} from '../../../../temporary-data';
import useCategory from '../../../../hooks/useCategory';

const NavPanel = () => {
  const {category, setCategory} = useCategory();

  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={styles.flatList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => (
        <Item
          title={item.value}
          isActive={item.value === category}
          onPress={() => {
            setCategory(item.value);
          }}
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
