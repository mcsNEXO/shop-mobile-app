import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-radio-buttons-group';
import Checkbox from '../../Checkbox/Checkbox';
interface IFilterModal {
  closeModal: () => void;
}

const FilterModal = ({closeModal}: IFilterModal) => {
  const [sortedBy, setSortedBy] = React.useState<string>('1');
  const [isChecked, setIsChecked] = React.useState({
    man: false,
    woman: false,
    kids: false,
  });

  const radioButtons = [
    {
      id: '1',
      label: 'Featured',
      value: 'featured',
      selected: false,
    },
    {
      id: '2',
      label: 'Newest',
      value: 'newest',
      selected: false,
    },
    {
      id: '3',
      label: 'Price: High-Low',
      value: 'high-low',
      selected: false,
    },
    {
      id: '4',
      label: 'Price: Low-High',
      value: 'low-high',
      selected: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sort and filter</Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="close" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.sort}>
        <Text style={styles.sortText}>Sort by</Text>
        {radioButtons.map(value => (
          <RadioButton
            id={value.id}
            key={value.id}
            label={value.label}
            value={value.value}
            selected={value.id === sortedBy}
            size={22}
            labelStyle={styles.itemSort}
            onPress={value => {
              setSortedBy(value);
            }}
          />
        ))}
      </View>
      <View style={styles.sort}>
        <Text style={styles.sortText}>Select gender: </Text>
        <Checkbox
          value={isChecked.man}
          label="Man"
          setIsChecked={() => setIsChecked({...isChecked, man: !isChecked.man})}
        />
        <Checkbox
          value={isChecked.woman}
          label="Woman"
          setIsChecked={() =>
            setIsChecked({...isChecked, woman: !isChecked.woman})
          }
        />
        <Checkbox
          value={isChecked.kids}
          label="Kids"
          setIsChecked={() =>
            setIsChecked({...isChecked, kids: !isChecked.kids})
          }
        />
      </View>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'black',
  },
  headerText: {
    fontSize: 22,
    color: 'black',
  },
  sort: {
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    marginTop: 16,
    paddingLeft: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemSort: {
    alignItems: 'flex-start',
    color: 'black',
    fontSize: 16,
  },
  sortText: {
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
  },
  gender: {},
});
