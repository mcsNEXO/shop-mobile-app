import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-radio-buttons-group';

interface ISortBy {
  sortedBy: {value: string; sort: number; label?: string};
  setSortedBy: React.Dispatch<
    React.SetStateAction<{
      value: string;
      sort: number;
      label?: string;
    }>
  >;
  style: any;
}

const SortBy = ({sortedBy, setSortedBy, style}: ISortBy) => {
  const radioButtons = [
    {
      id: '1',
      label: 'Featured',
      value: 'name',
      sort: 1,
      selected: false,
    },
    {
      id: '2',
      label: 'Newest',
      value: 'date',
      sort: 1,
      selected: false,
    },
    {
      id: '3',
      label: 'Price: High-Low',
      value: 'high-low',
      sort: -1,
      selected: false,
    },
    {
      id: '4',
      label: 'Price: Low-High',
      value: 'low-high',
      sort: 1,
      selected: false,
    },
  ];
  const handler = (value: string, sort: number) => {
    if (value === 'high-low') {
      setSortedBy({value: 'price', sort, label: 'high-low'});
    } else if (value === 'low-high') {
      setSortedBy({value: 'price', sort, label: 'low-high'});
    } else {
      const obj = {
        value: value,
        sort: sort,
      };
      setSortedBy(obj);
    }
    console.log(value, sort);
  };
  return (
    <View style={style}>
      <Text style={styles.title}>Sort by</Text>
      {radioButtons.map(value => (
        <RadioButton
          id={value.id}
          key={value.id}
          label={value.label}
          value={value.value}
          selected={
            value.value === sortedBy.value || value.value === sortedBy.label
          }
          size={22}
          labelStyle={styles.itemSort}
          onPress={(vl: string) => {
            handler(radioButtons[Number(vl) - 1].value, value.sort);
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
