import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useCategory from '../../../../../../hooks/useCategory';
import {useNavigation, useRoute} from '@react-navigation/native';
import {categoryData} from '../../../../../../data';

const TypeCategories = (props: any) => {
  //hooks
  const {category} = useCategory();
  const route: any = useRoute();
  const {navigate}: any = useNavigation();

  //variables
  const type = route.params?.type;
  const data = categoryData.categoryList
    .find(x => x.name === category)
    ?.children.find(x => x.name === type)?.children;
  if (!data) return <Text>Problem occured. Try again!</Text>;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.category}
              onPress={() =>
                navigate('Products', {
                  gender: category,
                  type: type,
                  category: item.name,
                })
              }>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TypeCategories;

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
    borderColor: 'black',
    shadowColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});
