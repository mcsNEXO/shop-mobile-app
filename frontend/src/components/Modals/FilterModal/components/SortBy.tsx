import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-radio-buttons-group';

interface ISortBy {
  sortedBy: string;
  setSortedBy: (arr: string) => void;
  style: any;
}

const SortBy = ({sortedBy, setSortedBy, style}: ISortBy) => {
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
    <View style={style}>
      <Text style={styles.title}>Sort by</Text>
      {radioButtons.map(value => (
        <RadioButton
          id={value.id}
          key={value.id}
          label={value.label}
          value={value.value}
          selected={value.value === sortedBy}
          size={22}
          labelStyle={styles.itemSort}
          onPress={(value: string) => {
            setSortedBy(radioButtons[Number(value) - 1].value);
          }}
        />
      ))}
    </View>
  );
};

export default SortBy;

const styles = StyleSheet.create({
  itemSort: {
    alignItems: 'flex-start',
    fontSize: 16,
    color: 'black',
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
  },
});
