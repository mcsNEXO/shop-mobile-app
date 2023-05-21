import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
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
import NotLogged from '../../components/NotLogged/NotLogged';

const Account = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useAuthContext();
  const [newImage, setNewImage] = React.useState(null);

  const pickImageHandler = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      navigation.navigate('ImageEditor', {file: result[0]});
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
                  ? AVATAR_IMAGE.defaultAvatar
                  : AVATAR_IMAGE.defaultAvatar
              }
            />
          </TouchableOpacity>
          <Text style={styles.firstName}>
            {user.firstName} {user.lastName}
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editText}>Edit profile data</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <NotLogged />
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
  editBtn: {
    width: Dimensions.get('window').width * 0.4,
    alignItems: 'center',
    marginTop: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
  },
  editText: {
    color: 'black',
  },
});
