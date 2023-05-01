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
import DocumentPicker from 'react-native-document-picker';

const Account = () => {
  const {navigate}: any = useNavigation();
  const {user} = useAuthContext();
  const [newImage, setNewImage] = React.useState(null);

  const pickImageHandler = async () => {
    try {
      const result: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      navigate('ImageEditor', {file: result[0]});
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome on your profile!</Text>
          <TouchableOpacity style={styles.image} onPress={pickImageHandler}>
            <Image
              style={styles.image}
              source={
                user.image
                  ? require('../../public/uploads/' + user.image)
                  : AVATAR_IMAGE.defaultAvatar
              }
            />
          </TouchableOpacity>
          <Text style={styles.firstName}>
            {user.firstName} {user.lastName}
          </Text>
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
    width: Dimensions.get('window').width,
    position: 'absolute',
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
    marginTop: 6,
  },
  firstName: {
    marginTop: 20,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
