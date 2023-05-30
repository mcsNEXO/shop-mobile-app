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

const AdminPanel = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.colorText}>Add product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.colorText}>Delete product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.6,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 12,
  },
  colorText: {
    fontSize: 16,
    color: 'black',
  },
});
