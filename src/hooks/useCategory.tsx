import {useCategoryContext} from '../context/CategoryContext';
import {setAsyncStorage} from '../helpers/asyncStorage';

const useCategory = () => {
  const {category, setStateCategory} = useCategoryContext();

  const setCategory = async (value: string) => {
    setStateCategory(value);
    // await setAsyncStorage('category', value);
  };

  return {setCategory, category};
};

export default useCategory;
