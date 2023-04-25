import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useAuthContext} from '../../context/AuthContext';
import {AVATAR_IMAGE} from '../../assets/images/uploads/avatars';
import React from 'react';

const Account = () => {
  const {navigate}: any = useNavigation();
  const {user} = useAuthContext();
  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome on your profile!</Text>
          <Image style={styles.image} source={AVATAR_IMAGE.defaultAvatar} />
          <Text style={styles.firstName}>{user.firstName}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>WHAT BENEFITS ?</Text>
            <Text style={styles.desc}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Register')}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Login')}>
              <Text style={styles.text}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  desc: {
    fontSize: 16,
    paddingLeft: 5,
    color: 'black',
  },
  buttons: {
    position: 'absolute',
    width: Dimensions.get('window').width,
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
  welcomeText: {
    fontSize: 25,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 12,
  },
  firstName: {
    marginTop: 20,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
