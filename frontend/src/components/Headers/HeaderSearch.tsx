import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

interface IHeaderSearch {
  handleSearchDelayed: (val: string) => void;
  inputText: string;
  onEnterPress: () => void;
}

const HeaderSearch = ({
  handleSearchDelayed,
  onEnterPress,
  inputText,
}: IHeaderSearch) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back"
        size={28}
        color={'black'}
        onPress={() => navigation.goBack()}
      />
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={val => handleSearchDelayed(val)}
        onSubmitEditing={onEnterPress}
        placeholder="Search product"
        placeholderTextColor={'gray'}
      />
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    fontSize: 16,
  },
});
