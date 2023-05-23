import React from 'react';
import {getAsyncStorage, setAsyncStorage} from '../helpers/asyncStorage';
import axios from '../axios';
import {useAuthContext} from './AuthContext';

interface IContext {
  favorite: ProductFavoriteType[] | null;
  setFavorite: React.Dispatch<
    React.SetStateAction<ProductFavoriteType[] | null>
  >;
  setFavoriteStorage: (product: ProductFavoriteType[] | null) => Promise<void>;
  deleteFavorite: (product: ProductFavoriteType) => Promise<void>;
  addFavorite: (product: ProductFavoriteType) => Promise<void>;
  clearFavorite: () => Promise<void>;
}

export type ProductFavoriteType = {
  _id: string;
  type: string;
  category: string;
  name: string;
  gender: string;
  colors: string | string[];
  size: number | number[];
  price: number;
  quantity: number;
  image: string;
  index: number;
  _v: number;
};

export const FavoriteContext = React.createContext<IContext>(null as any);

export const FavoriteProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [favorite, setFavorite] = React.useState<ProductFavoriteType[] | null>(
    [],
  );
  const {user} = useAuthContext();

  React.useEffect(() => {
    (async () => {
      const data2 = await getAsyncStorage('auth');
      let favoriteData: any;
      if (data2 !== 'null' && data2 !== null && data2) {
        favoriteData = await axios.post('get-fav-product', {
          userId: JSON.parse(data2)._id,
        });
      } else {
        favoriteData = await getAsyncStorage('cart');
      }
      try {
        setFavoriteStorage(
          data2 !== 'null' && data2 !== null && data2
            ? favoriteData?.data.products
            : JSON.parse(favoriteData),
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const deleteFavorite = async (product: ProductFavoriteType) => {
    const res = await axios.post('delete-favorite', {
      userId: user?._id,
      product,
      type: 'favorite',
    });
    setFavoriteStorage(res.data.newFavorites);
  };

  const addFavorite = async (product: ProductFavoriteType) => {
    const res = await axios.post('add-product', {
      userId: user?._id,
      product,
      type: 'favorite',
    });
    console.log(res.data.cart);
    setFavoriteStorage(res.data.cart);
  };

  const setFavoriteStorage = async (product: ProductFavoriteType[] | null) => {
    setFavorite(product);
    setAsyncStorage('favorite', product);
  };

  const clearFavorite = async () => {
    setFavorite(null);
    setAsyncStorage('favorite', null);
  };

  const value = {
    clearFavorite,
    favorite,
    setFavorite,
    deleteFavorite,
    addFavorite,
    setFavoriteStorage,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => React.useContext(FavoriteContext);
