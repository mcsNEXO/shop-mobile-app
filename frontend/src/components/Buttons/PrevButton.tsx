import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

interface IPrevButton {
  openedFilterModal?: boolean;
  setOpenedFilterModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrevButton = ({openedFilterModal, setOpenedFilterModal}: IPrevButton) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <TouchableOpacity
      onPress={() => {
        if (openedFilterModal === true) {
          if (setOpenedFilterModal) return setOpenedFilterModal(false);
        }
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
