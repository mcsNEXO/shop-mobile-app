import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import useCategory from '../../../../hooks/useCategory';
import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {categoryData} from '../../../../data/data';
import SideBar from '../../../../components/SideBar/SideBar';
import Header from '../../../../components/Headers/Header';
import NavPanel from '../NavPanel/NavPanel';

const Categories = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {category} = useCategory();
  const type = categoryData?.categoryList?.find(
    e => e?.name === category,
  )?.children;

  return (
    <>
      <SideBar />
      <View style={styles.header}>
        <Header />
        <NavPanel />
      </View>
      <FlatList
        data={type}
        renderItem={({item, index}) => (
          <View style={styles.container} key={index}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => {
                navigation.navigate('TypeCategories', {type: item.name});
              }}>
              <Text style={styles.text}>{item?.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
  },
  header: {
    height: 'auto',
  },
  category: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    shadowColor: 'black',
    borderWidth: 1.2,
    borderRadius: 5,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  option: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  textOption: {
    fontSize: 16,
    color: 'black',
  },
});

export default Categories;
