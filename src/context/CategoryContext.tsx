import React from 'react';
import {categoryData} from '../data';

interface IContext {
  category: string;
  setStateCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryContext = React.createContext<IContext>(null as any);

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [category, setStateCategory] = React.useState<string>('Man');

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
