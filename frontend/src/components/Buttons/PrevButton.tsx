import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

const PrevButton = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
        route.name === 'TypeCategories' &&
          navigation
            .getParent('header' as any)
            ?.setOptions({headerShown: true});
      }}>
      <Icon name="arrow-back" size={25} style={{width: 40}} color="black" />
    </TouchableOpacity>
  );
};

export default PrevButton;
