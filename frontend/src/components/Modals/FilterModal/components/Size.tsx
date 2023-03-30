import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import useCategory from '../../../../hooks/useCategory';
import {sizesGenders} from '../../../../filterData';

interface ISize {
  style: any;
  sizes: number[];
  sizesHandler: (size: number) => void;
}

const Size = ({style, sizes, sizesHandler}: ISize) => {
  const {category} = useCategory();
  const arrOfSizes = (sizesGenders as any)[category.toLowerCase()];
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Select size</Text>
      <View style={styles.another}>
        {arrOfSizes?.map((size: number, index: number) => {
          return (
            <TouchableOpacity
              style={[
                styles.sizeBox,
                {borderWidth: sizes.indexOf(size) > -1 ? 2 : 1},
              ]}
              key={index}
              onPress={() => sizesHandler(size)}>
              <Text>{size}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Size;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    marginTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    color: 'black',
  },
  another: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 25,
    gap: 5,
  },
  sizeBox: {
    width: '15%',
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgb(240, 240, 240)',
  },
});
