import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import React from 'react';
import {registerImage} from '../../assets/images/svg/img';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import validator from 'validator';
import axios from '../../axios';

interface ErrorWithIndex extends Error {
  [key: string]: string;
}

type Error = {
  email: string;
  password: string;
  error: string;
};

type LoginProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Register = ({navigation}: LoginProps) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [showPass, setShowPass] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);
  const [error, setError] = React.useState<ErrorWithIndex>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
  });
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

  const validateEmail = (val: string) => {
    //save email state
    setEmail(val);

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
    setPassword(val);

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

  const validateFirstName = (val: string) => {
    //save firstName state
    setFirstName(val);

    //if error exist set state firstName error and clear general error
    setError(prevError => ({
      ...prevError,
      firstName: validator.isEmpty(val) ? 'First name is empty!' : '',
      error: '',
    }));
  };

  const validateLastName = (val: string) => {
    //save lastName state
    setLastName(val);

    //if error exist set state lastName error and clear general error
    setError(prevError => ({
      ...prevError,
      lastName: validator.isEmpty(val) ? 'Last name is empty!' : '',
      error: '',
    }));
  };

  const register = async () => {
    const data = {
      email,
      password,
      firstName,
      lastName,
    };
    try {
      const res = await axios.post('sign-up', data);
    } catch (err: any) {
      const errMessage = err?.response?.data?.message?.message;
      if (err?.response?.data?.message?.type === 'email') {
        return setError({...error, email: errMessage});
      }
      return setError({...error, error: errMessage});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.image}>
          <SvgXml
            xml={registerImage}
            width={Dimensions.get('window').width * 0.85}
            height={Dimensions.get('window').height * 0.4}
          />
        </View>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.underTitle}>Create new account</Text>
        {error.error && <Text style={styles.error}>{error.error}</Text>}
        <View
          style={[styles.containerPassword, {borderColor: getColor('email')}]}>
          <MaterialIcon
            name={'mail-outline'}
            size={20}
            color={getColor('email')}
          />
          <TextInput
            style={[
              styles.passwordInput,
              {
                color: getColor('email'),
              },
            ]}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={val => validateEmail(val)}
            autoCapitalize="none"
            onFocus={() => {
              setFocusedInput('email');
            }}
            onBlur={() => {
              setFocusedInput(null);
            }}
          />
        </View>
        {error.email && <Text style={styles.error}>{error.email}</Text>}
        <View
          style={[
            styles.containerPassword,
            {
              borderColor: getColor('password'),
            },
          ]}>
          <IoniconsIcon
            name={'lock-closed-outline'}
            size={20}
            color={getColor('password')}
            onPress={() => setShowPass(!showPass)}
          />
          <TextInput
            style={[
              styles.passwordInput,
              {width: '70%', color: getColor('password')},
            ]}
            value={password}
            secureTextEntry={!showPass}
            placeholder="Password"
            onChangeText={val => validatePassword(val)}
            onFocus={() => {
              setFocusedInput('password');
            }}
            onBlur={() => {
              setFocusedInput(null);
            }}
          />
          <IoniconsIcon
            name={showPass ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="black"
            onPress={() => setShowPass(!showPass)}
          />
        </View>
        {error.password && <Text style={styles.error}>{error.password}</Text>}
        <View
          style={[
            styles.containerPassword,
            {borderColor: getColor('firstName')},
          ]}>
          <MaterialIcon
            name={'person-outline'}
            size={20}
            color={getColor('firstName')}
          />
          <TextInput
            style={[styles.passwordInput, {color: getColor('firstName')}]}
            value={firstName}
            placeholder="First Name"
            onChangeText={val => validateFirstName(val)}
            onFocus={() => {
              setFocusedInput('firstName');
            }}
            onBlur={() => {
              setFocusedInput(null);
            }}
          />
        </View>
        {error.firstName && <Text style={styles.error}>{error.firstName}</Text>}
        <View
          style={[
            styles.containerPassword,
            {borderColor: getColor('lastName')},
          ]}>
          <IoniconsIcon
            name={'person-circle-outline'}
            size={20}
            color={getColor('lastName')}
          />
          <TextInput
            style={[styles.passwordInput, {color: getColor('lastName')}]}
            value={lastName}
            placeholder="Last Name"
            onChangeText={val => validateLastName(val)}
            onFocus={() => {
              setFocusedInput('lastName');
            }}
            onBlur={() => {
              setFocusedInput(null);
            }}
          />
        </View>
        {error.lastName && <Text style={styles.error}>{error.lastName}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>You have account? Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={register}
          disabled={
            Object.values(error).some(x => x !== '') ||
            !email ||
            !password ||
            !firstName ||
            !lastName
          }>
          <Text style={styles.btnText}>Sign up!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  image: {
    alignItems: 'center',
  },
  containerPassword: {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },
  passwordInput: {
    width: '80%',
    height: 40,
    flexDirection: 'row',
    borderWidth: 0,
    borderEndColor: 'white',
    borderBottomColor: 'white',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  underTitle: {
    marginBottom: 10,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    backgroundColor: '#0051ff',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  text: {
    width: Dimensions.get('window').width * 0.8,
    marginTop: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 10,
    fontSize: 12,
    textAlign: 'right',
  },
  error: {
    color: 'red',
    marginTop: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
