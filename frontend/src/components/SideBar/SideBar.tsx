import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {hambugerData} from '../../data/hamburgerData';
import {useHamburgerContext} from '../../context/HamburgerContext';

export default function SideBar() {
  const {isOpenHamburger, setIsOpenHamburger} = useHamburgerContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const width = Dimensions.get('window').width * 0.65;
  const [index, setIndex] = React.useState(0);

  const [animatedWidth, setAnimatedWidth] = React.useState(
    new Animated.Value(0),
  );
  const [animatedOpacity, setAnimatedOpacity] = React.useState(
    new Animated.Value(0),
  );

  const closeDrawer = () => {
    setIsOpenHamburger(false);
  };
  React.useEffect(() => {
    if (isOpenHamburger) {
      setIndex(1);
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: width,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.75,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsOpenHamburger(false);
        setIndex(0);
      });
    }
  }, [isOpenHamburger]);

  return (
    <>
      <Animated.View
        style={[styles.bg, {opacity: animatedOpacity, zIndex: index}]}>
        <TouchableOpacity style={styles.touch} onPress={closeDrawer} />
      </Animated.View>
      <Animated.ScrollView
        style={[
          styles.container,
          {width: animatedWidth ? animatedWidth : width},
        ]}>
        <View style={styles.hamburger}>
          <TouchableOpacity onPress={() => setIsOpenHamburger(false)}>
            <Icon name="arrow-back" size={23} color={'black'} />
          </TouchableOpacity>
          {hambugerData.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setIsOpenHamburger(false);
                navigation.navigate(`${item.name}`);
              }}
              style={[
                styles.option,
                index === 0 && styles.optionFirstChild,
                item.name === route.name && {backgroundColor: '#d8d8d8ce'},
              ]}
              key={index}>
              <Icon name={item.icon} size={28} color={'black'} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  hamburger: {
    padding: 12,
  },
  option: {
    // width:Dimensions.get('window').width * 0.65,
    minWidth: '100%',
    height: 42,
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 15,
    padding: 6,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(198, 198, 198, 0.7);',
  },
  optionFirstChild: {
    marginTop: 30,
  },
  text: {
    verticalAlign: 'middle',
    fontSize: 18,
    marginLeft: 10,
  },
  bg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
    opacity: 0.75,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  touch: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
