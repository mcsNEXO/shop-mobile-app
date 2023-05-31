import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HeaderFavorite from '../../components/Headers/HeaderFavorite';
import SideBar from '../../components/SideBar/SideBar';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useFavoriteContext} from '../../context/FavoriteContext';
import {IMAGENAME} from '../../assets/images/shoes/image';
import {SvgXml} from 'react-native-svg';
import FavoritePopUp from './FavoritePopUp';
import {emptyFavorite} from '../../assets/images/svg/img';
import {useAuthContext} from '../../context/AuthContext';
import NotLogged from '../../components/NotLogged/NotLogged';

type TypeNavigationProp = {
  navigation: NavigationProp<ParamListBase>;
};

const Favorite = ({navigation}: TypeNavigationProp) => {
  const {favorite} = useFavoriteContext();
  const {user} = useAuthContext();
  const [isOpen, setIsOpen] = React.useState<number>(-1);

  return (
    <>
      <SideBar />
      <HeaderFavorite />
      {user && favorite ? (
        favorite?.length > 0 ? (
          <FlatList
            numColumns={2}
            data={favorite}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <>
                  {index === isOpen && (
                    <FavoritePopUp
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      item={item}
                    />
                  )}
                  <TouchableOpacity
                    style={[
                      styles.box,
                      {
                        marginLeft:
                          index === favorite.length - 1
                            ? index % 2 == 1
                              ? 'auto'
                              : 20
                            : 'auto',
                      },
                    ]}
                    onPress={() => setIsOpen(index)}>
                    <View>
                      <Image
                        source={
                          IMAGENAME[item?.name?.split(' ').join('')][
                            item.colors as string
                          ]
                        }
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.desc}>
                      <Text style={styles.text}>{item.name}</Text>
                      <Text
                        style={
                          styles.textGender
                        }>{`${item.gender}'s ${item.type}`}</Text>
                      <Text style={styles.color}>Color: {item.colors}</Text>
                    </View>
                    <View style={styles.other}>
                      <Text style={styles.textPrice}>{item.price}$</Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        ) : (
          <>
            <SvgXml
              xml={emptyFavorite}
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.6}
            />
            <Text style={styles.empty}>You don't have favorite products</Text>
          </>
        )
      ) : (
        <NotLogged />
      )}
    </>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 10,
    flex: 1,
  },
  box: {
    width: Dimensions.get('window').width / 2.5,
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  image: {
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').width / 2.5,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  textGender: {
    color: 'gray',
    textTransform: 'capitalize',
  },
  btnText: {
    color: 'black',
  },
  textPrice: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  desc: {
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  color: {
    textTransform: 'capitalize',
  },
  other: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
});
