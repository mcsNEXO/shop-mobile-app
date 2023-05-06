import {
  View,
  Text,
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect} from 'react';
import validator from 'validator';
import axios from '../../../../../axios';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IEditPasswordModal {
  isOpenPasswordModal: boolean;
  closeModal: () => void;
}

interface ErrorWithIndex extends FormField {
  [key: string]: string;
}

type FormField = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const EditPasswordModal = ({
  isOpenPasswordModal,
  closeModal,
}: IEditPasswordModal) => {
  const {user} = useAuthContext();
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);
  const [formFields, setFormFields] = React.useState<FormField>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = React.useState<ErrorWithIndex>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleFieldChange = (fieldName: keyof FormField, value: string) => {
    return validatePassword(value, fieldName);
  };

  const validatePassword = (val: string, fieldName: string) => {
    //save password state
    setFormFields(prevValue => ({...prevValue, [fieldName]: val}));

    //if error exist set state password error and clear general error
    setError(prevError => ({
      ...prevError,
      [fieldName]: validator.isEmpty(val)
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
        : 'black';
    },
    [error, focusedInput],
  );

  useEffect(() => {
    setFocusedInput(null);
    setFormFields({currentPassword: '', newPassword: '', confirmPassword: ''});
    setError({currentPassword: '', newPassword: '', confirmPassword: ''});
  }, [isOpenPasswordModal]);

  const savePassword = async () => {
    if (!user) return;
    const data = {
      _id: user._id,
      currentPassword: formFields.currentPassword,
      newPassword: formFields.newPassword,
      confirmPassword: formFields.confirmPassword,
    };
    try {
      const res = await axios.put('edit-password', data);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal transparent={true} visible={isOpenPasswordModal}>
      <TouchableOpacity style={styles.containerModal} onPress={closeModal} />
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.title}>Edit password</Text>
          <MaterialIcon
            name="cancel"
            size={35}
            onPress={closeModal}
            style={styles.icon}
          />
        </View>
        {Object.keys(formFields).map(fieldName => (
          <View key={fieldName} style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.inputText,
                {
                  bottom: 30,
                  color: getColor(fieldName),
                },
              ]}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            </Animated.Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  borderColor: getColor(fieldName),
                },
              ]}
              onChangeText={value =>
                handleFieldChange(fieldName as keyof typeof formFields, value)
              }
              onFocus={() => setFocusedInput(fieldName)}
              onBlur={() => setFocusedInput(null)}
              value={formFields[fieldName as keyof typeof formFields]}
            />
            {error[fieldName] && (
              <Text style={{color: 'red', textAlign: 'center'}}>
                {error[fieldName]}
              </Text>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={styles.saveBtn}
          disabled={
            Object.values(error).some(x => x !== '') ||
            !formFields.currentPassword ||
            !formFields.newPassword ||
            !formFields.confirmPassword
          }
          onPress={savePassword}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditPasswordModal;
const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width * 0.7,
  },
  containerModal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
  },
  box: {
    width: 300,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
  row: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    width: 250,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 6,
  },
  inputContainer: {
    position: 'relative',
    height: 40,
    marginTop: 28,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputText: {
    position: 'absolute',
    marginLeft: 10,
    paddingLeft: 4,
    paddingRight: 4,
    zIndex: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  saveText: {
    color: 'white',
    fontSize: 17,
  },
  saveBtn: {
    width: 150,
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
