import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import useCategory from '../../../../hooks/useCategory';
import {categoriesData} from './categoriesData';

const Demo = () => {
  const {category} = useCategory();
  const navigation = useNavigation();
  return (
    <View>
      {categoriesData.map(
        (el: {label: string; value: string}, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log('ds');
                navigation
                  .getParent('headers')
                  ?.setOptions({headerShown: false});
                navigation.navigate(`${category}List` as never);
              }}>
              <Text>{el.label}</Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default Demo;
