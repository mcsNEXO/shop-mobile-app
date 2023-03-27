import {useCategoryContext} from '../context/CategoryContext';

const useCategory = () => {
  const {category, setStateCategory} = useCategoryContext();

  const setCategory = async (value: string) => {
    setStateCategory(value);
  };

  return {setCategory, category};
};

export default useCategory;
