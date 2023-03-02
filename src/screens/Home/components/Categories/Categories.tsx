import {categoriesData} from './categoriesData';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Categories = () => {
  return (
    <View style={styles.container}>
      {categoriesData.map(
        (el: {label: string; value: string}, index: number) => {
          return (
            <TouchableOpacity style={styles.category} key={index}>
              <Text>{el.label}</Text>
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
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 5,
    borderRadius: 5,
    padding: 10,
  },
});

export default Categories;
