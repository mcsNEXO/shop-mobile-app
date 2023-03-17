import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {}
};

export const getAsyncStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {}
};
