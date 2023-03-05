import React from 'react';
import {getAsyncStorage} from '../helpers/asyncStorage';
interface IContext {
  category: string;
  setStateCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryContext = React.createContext<IContext>(null as any);

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [category, setStateCategory] = React.useState<string>('Man');

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await getAsyncStorage('category');
  //       setStateCategory(data ? data : 'Man');
  //     } catch (err) {}
  //   })();
  // }, []);

  const value = {
    category,
    setStateCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => React.useContext(CategoryContext);
