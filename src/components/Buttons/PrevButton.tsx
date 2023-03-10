import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const PrevButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
        navigation.getParent('header' as any)?.setOptions({headerShown: true});
      }}>
      <Icon name="arrow-left" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default PrevButton;
