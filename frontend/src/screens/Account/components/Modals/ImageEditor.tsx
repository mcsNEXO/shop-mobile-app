import {
  useRoute,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useAuthContext} from '../../../../context/AuthContext';
import axios from '../../../../axios';

type LoginProps = {
  navigation: NavigationProp<ParamListBase>;
};

const ImageModal = ({navigation}: LoginProps) => {
  const route: any = useRoute();
  const {user, setAuth} = useAuthContext();
  const [imageUri, setImageUri] = React.useState<string>(
    route.params?.file.uri,
  );

  const saveImage = async () => {
    if (user === null) return;
    const formData = new FormData();
    formData.append('_id', user._id);
    formData.append('avatar', user.image);
    formData.append('image', route.params?.file);
    try {
      const res = await axios.post('image-mobile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAuth(res.data.user);
      navigation.navigate('Account');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.container}></View>
      <View style={styles.center}>
        <View style={styles.box}>
          <View style={styles.border}>
            <Image source={{uri: imageUri}} style={styles.image} />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Account')}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={saveImage}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    opacity: 0.6,
    backgroundColor: 'black',
  },
  center: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.6,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 200,
    borderColor: 'black',
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
  },
  border: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.6)',
  },
  button: {
    width: 100,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#0051ff',
  },
  btnText: {
    fontSize: 16,
    color: 'whitesmoke',
    fontWeight: '600',
  },
});
