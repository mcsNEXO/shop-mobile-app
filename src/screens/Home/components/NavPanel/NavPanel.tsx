import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Item from './components/Item';
import useCategory from '../../../../hooks/useCategory';
import {categoryData} from '../../../../data';

const NavPanel = () => {
  const {category, setCategory} = useCategory();

  return (
    <FlatList
      data={categoryData.categoryList}
      horizontal
      contentContainerStyle={styles.flatList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => (
        <Item
          title={item.name}
          isActive={item.name === category}
          onPress={() => {
            setCategory(item.name);
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
