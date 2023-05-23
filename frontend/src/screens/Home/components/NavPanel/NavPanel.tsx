import React from 'react';
import useCategory from '../../../../hooks/useCategory';
import {FlatList, StyleSheet} from 'react-native';
import Item from './components/Item';
import {categoryData} from '../../../../data/data';

const NavPanel = () => {
  const {category, setCategory} = useCategory();

  return (
    <FlatList
      data={categoryData.categoryList}
      horizontal
      contentContainerStyle={styles.flatList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => (
        <Item
          title={item.name}
          isActive={item.name === category}
          setCategory={() => {
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
    color: 'black',
  },
});
