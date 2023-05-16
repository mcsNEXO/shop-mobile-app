import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {ParamListBase, NavigationProp} from '@react-navigation/native';
import {useAuthContext} from '../../../../context/AuthContext';
import {AVATAR_IMAGE} from '../../../../assets/images/uploads/avatars';
import validator from 'validator';
import EditPasswordModal from './components/EditPasswordModal';
import axios from '../../../../axios';

type NavigationType = {
  navigation: NavigationProp<ParamListBase>;
};

type FormField = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

interface ErrorWithIndex extends FormField {
  [key: string]: string;
}

const EditProfile = ({navigation}: NavigationType) => {
  const {user} = useAuthContext();
  if (!user) return <View></View>;
  if (!user) navigation.navigate('Login');

  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);
  const [isOpenPasswordModal, setIsOpenPasswordModal] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorWithIndex>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
  });
  const [formFields, setFormFields] = React.useState<FormField>({
    email: user?.email,
    password: '',
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const handleFieldChange = (fieldName: keyof FormField, value: string) => {
    if (fieldName === 'email') return validateEmail(value);
    else if (fieldName === 'password') return validatePassword(value);
    else
      return setFormFields(prevFields => ({...prevFields, [fieldName]: value}));
  };

  const pickImageHandler = async () => {
    try {
      const result: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      navigation.navigate('ImageEditor', {file: result[0]});
    } catch (err: any) {
      console.log(err);
    }
  };

  const validateEmail = (val: string) => {
    //save email state
    setFormFields(prevValue => ({...prevValue, email: val}));

    //if error exist set state email error and clear general error
    setError(prevError => ({
      ...prevError,
      email: validator.isEmail(val)
        ? ''
        : !validator.isLength(val, {min: 6, max: undefined})
        ? 'Email must has min 6 characters'
        : 'Please enter a valid email!',
      error: '',
    }));
  };

  const validatePassword = (val: string) => {
    //save password state
    setFormFields(prevValue => ({...prevValue, password: val}));

    //if error exist set state password error and clear general error
    setError(prevError => ({
      ...prevError,
      password: validator.isEmpty(val)
        ? 'Password cannot be empty!'
        : !validator.isLength(val, {min: 6, max: undefined})
        ? 'Password must has min 6 characters'
        : '',
      error: '',
    }));
  };

  const getColor = React.useMemo(
    () => (inputName: string) => {
      //Setting the color depending on the state of the input
      return error[inputName]
        ? 'red'
        : focusedInput === inputName
        ? 'rgba(32, 32, 228, 0.900)'
        : 'green';
    },
    [error, focusedInput],
  );

  const saveData = async () => {
    const data = {
      _id: user._id,
      email: formFields.email,
      firstName: formFields.firstName,
      lastName: formFields.lastName,
    };
    try {
      const res = await axios.put('edit-data', data);
    } catch (err: any) {
      const errMessage = err?.response?.data?.message?.message;
      if (err?.response?.data?.message?.type === 'email') {
        return setError({...error, email: errMessage});
      }
      return setError({...error, error: errMessage});
    }
  };

  return (
    <>
      <EditPasswordModal
        isOpenPasswordModal={isOpenPasswordModal}
        closeModal={() => setIsOpenPasswordModal(false)}
      />
      <View>
        <Text style={styles.title}>Edit Profile Data</Text>
        <TouchableOpacity style={styles.image} onPress={pickImageHandler}>
          <Image
            style={styles.image}
            source={
              user?.image
                ? AVATAR_IMAGE.defaultAvatar
                : AVATAR_IMAGE.defaultAvatar
            }
          />
        </TouchableOpacity>
        <View style={styles.line} />
        {Object.keys(formFields).map(fieldName => (
          <TouchableOpacity
            key={fieldName}
            style={styles.inputContainer}
            onPress={() =>
              fieldName === 'password' && setIsOpenPasswordModal(true)
            }>
            <Animated.Text
              style={[
                styles.inputText,
                {
                  bottom: 30,
                  color:
                    fieldName !== 'password' ? getColor(fieldName) : 'black',
                },
              ]}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            </Animated.Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    fieldName !== 'password' ? getColor(fieldName) : 'black',
                },
              ]}
              editable={fieldName === 'password' ? false : true}
              onChangeText={value =>
                handleFieldChange(fieldName as keyof typeof formFields, value)
              }
              onFocus={() => setFocusedInput(fieldName)}
              onBlur={() => setFocusedInput(null)}
              value={
                fieldName !== 'password'
                  ? formFields[fieldName as keyof typeof formFields]
                  : 'Click field to edit'
              }
            />
            {error[fieldName] && (
              <Text style={{color: getColor(fieldName), textAlign: 'center'}}>
                {error[fieldName]}
              </Text>
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.saveBtn}
          disabled={
            Object.values(error).some(x => x !== '') ||
            !formFields.email ||
            !formFields.firstName ||
            !formFields.lastName
          }
          onPress={saveData}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  title: {
    marginTop: 6,
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    position: 'relative',
    height: 40,
    marginTop: 28,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: 'black',
    borderRadius: 6,
  },
  inputText: {
    position: 'absolute',
    marginLeft: 10,
    paddingLeft: 4,
    paddingRight: 4,
    zIndex: 10,
    color: 'black',
    backgroundColor: '#f1f1f1',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 6,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 30,
    marginBottom: 15,
  },
  saveText: {
    color: 'white',
    fontSize: 17,
  },
  saveBtn: {
    width: Dimensions.get('window').width * 0.4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    backgroundColor: 'black',
  },
});
