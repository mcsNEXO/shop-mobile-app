import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useCartContext} from '../../context/CartContext';
import {useFavoriteContext} from '../../context/FavoriteContext';
import {useAuthContext} from '../../context/AuthContext';
import {settingsData} from '../../data/settingsData';

const Settings = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {clearCart} = useCartContext();
  const {clearFavorite} = useFavoriteContext();
  const {clearAuth, user} = useAuthContext();

  const logout = async () => {
    clearCart();
    clearFavorite();
    clearAuth();
    navigation.navigate('Search');
  };
  return (
    <View>
      {settingsData.map(({group, data}) => (
        <>
          {data.map(({name}) => (
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>{name}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.blank} />
        </>
      ))}
      {user ? (
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  btn: {
    height: 40,
    justifyContent: 'center',
    marginTop: 2,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  logout: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'red',
  },
  btnText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: 'black',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
  blank: {
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'lightgray',
  },
});
