import {View, Text, TouchableOpacity} from 'react-native';
import {useAuthContext} from '../../context/AuthContext';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const Settings = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user, setAuth} = useAuthContext();

  const logout = () => {
    setAuth(null);
    navigation.navigate('Search');
  };
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
