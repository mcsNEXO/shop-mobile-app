import React from 'react';
import {getAsyncStorage, setAsyncStorage} from '../helpers/asyncStorage';
import axios from '../axios';
import {useAuthContext} from './AuthContext';

interface IContext {
  favorite: ProductFavoriteType[];
  setFavorite: React.Dispatch<React.SetStateAction<ProductFavoriteType[]>>;
  setFavoriteStorage: (product: ProductFavoriteType[]) => Promise<void>;
  deleteFavorite: (product: ProductFavoriteType) => Promise<void>;
  addFavorite: (product: ProductFavoriteType) => Promise<void>;
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
  const [favorite, setFavorite] = React.useState<ProductFavoriteType[]>([]);
  const {user} = useAuthContext();

  React.useEffect(() => {
    (async () => {
      const data2 = await getAsyncStorage('auth');
      let favoriteData: any;
      if (data2) {
        favoriteData = await axios.post('get-fav-product', {
          userId: JSON.parse(data2)._id,
        });
      } else {
        favoriteData = await getAsyncStorage('cart');
        if (!favoriteData) return;
      }
      try {
        setFavoriteStorage(
          data2 ? favoriteData?.data.products : JSON.parse(favoriteData),
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

  const setFavoriteStorage = async (product: ProductFavoriteType[]) => {
    setFavorite(product);
    setAsyncStorage('favorite', product);
  };

  const value = {
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
