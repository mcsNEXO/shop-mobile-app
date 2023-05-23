import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const NotLogged = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>WHAT BENEFITS ?</Text>
        <Text style={styles.desc}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotLogged;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  desc: {
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  buttons: {
    bottom: 0,
  },
  button: {
    width: Dimensions.get('window').width * 0.7,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'black',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
