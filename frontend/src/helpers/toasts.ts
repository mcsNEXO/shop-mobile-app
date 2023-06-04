import Toast from 'react-native-toast-message';

export const errorToast = (text: string) => {
  Toast.show({
    type: 'error',
    text1: 'Delete',
    text2: text,
    visibilityTime: 1500,
  });
};

export const successToast = (text: string) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: text,
    visibilityTime: 1500,
  });
};
