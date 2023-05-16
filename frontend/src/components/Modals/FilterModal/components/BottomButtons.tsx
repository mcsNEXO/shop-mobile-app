import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const BottomButtons = ({saveFiltersData}: {saveFiltersData: () => void}) => (
  <View style={styles.bottomButtons}>
    <TouchableOpacity style={styles.bottomBtn}>
      <Text style={styles.textBtn}>Reset</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomBtn} onPress={saveFiltersData}>
      <Text style={styles.textBtn}>Save</Text>
    </TouchableOpacity>
  </View>
);

export default BottomButtons;

const styles = StyleSheet.create({
  saveButton: {
    width: 80,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  bottomButtons: {
    width: Dimensions.get('window').width,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: 'white',
  },
  bottomBtn: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'black',
  },
  textBtn: {
    fontSize: 17,
    color: 'white',
  },
});
