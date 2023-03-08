import {useCategoryContext} from '../context/CategoryContext';

const useCategory = () => {
  const {category, setStateCategory, type, setType} = useCategoryContext();

  const setCategory = async (value: string) => {
    setStateCategory(value);
  };

  return {setCategory, category, type, setType};
};

export default useCategory;
