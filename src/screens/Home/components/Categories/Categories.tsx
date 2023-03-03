import {categoriesData} from './categoriesData';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useCategory from '../../../../hooks/useCategory';
import {useNavigation} from '@react-navigation/native';

const Categories = () => {
  const {category} = useCategory();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {categoriesData.map(
        (el: {label: string; value: string}, index: number) => {
          return (
            <TouchableOpacity style={styles.category} key={index}>
              <Text style={styles.label}>{el.label}</Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14.5,
    color: 'black',
  },
});

export default Categories;
