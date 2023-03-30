import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import useCategory from '../../../../hooks/useCategory';
import {useNavigation} from '@react-navigation/native';
import {categoryData} from '../../../../data';

const Categories = () => {
  const {category} = useCategory();
  const navigation: any = useNavigation();
  const type = categoryData?.categoryList?.find(
    e => e?.name === category,
  )?.children;

  return (
    <FlatList
      data={type}
      renderItem={({item, index}) => (
        <View style={styles.container} key={index}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => {
              navigation.getParent('header').setOptions({headerShown: false}),
                navigation.navigate('TypeCategories', {type: item.name});
            }}>
            <Text style={styles.text}>{item?.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
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
});

export default Categories;
