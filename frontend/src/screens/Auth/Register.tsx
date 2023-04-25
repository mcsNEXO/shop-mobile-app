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
import {img} from './img';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import validator from 'validator';
import axios from '../../axios';

const Register = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [showPass, setShowPass] = React.useState(false);
  const [activeInput, setActiveInput] = React.useState<string | null>(null);
  const [error, setError] = React.useState<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    error: string;
  }>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
  });
  const navigation: any = useNavigation();

  const getTextColor = (inputName: string) => {
    if (error[inputName]) {
      return 'red';
    }
    return activeInput === inputName ? 'rgba(32, 32, 228, 0.900);' : 'black';
  };
  const handleEmail = (val: string) => {
    setEmail(val);
    setError({...error, email: ''});
    if (!validator.isEmail(val)) {
      setError({...error, email: 'Please enter a valid email!'});
    }
  };
  const handlePassword = (val: string) => {
    setPassword(val);
    setError({...error, password: ''});
    if (validator.isEmpty(val)) {
      setError({...error, password: 'Password is empty!'});
    } else if (!validator.isLength(val, {min: 6, max: undefined})) {
      setError({...error, password: 'Password must has min 6 characters!'});
    }
  };

  const handleFirstName = (val: string) => {
    setFirstName(val);
    if (validator.isEmpty(val)) {
      setError({...error, firstName: 'First name is empty!'});
    }
  };

  const handleLastName = (val: string) => {
    setLastName(val);
    if (validator.isEmpty(val)) {
      setError({...error, lastName: 'Last name is empty!'});
    }
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
            xml={img}
            width={Dimensions.get('window').width * 0.85}
            height={Dimensions.get('window').height * 0.4}
          />
        </View>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.underTitle}>Create new account</Text>
        {error.error && <Text style={styles.error}>{error.error}</Text>}
        <View
          style={[
            styles.containerPassword,
            {borderColor: getTextColor('email')},
          ]}>
          <MaterialIcon
            name={'mail-outline'}
            size={20}
            color={getTextColor('email')}
          />
          <TextInput
            style={[
              styles.passwordInput,
              {
                color: getTextColor('email'),
              },
            ]}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={val => handleEmail(val)}
            autoCapitalize="none"
            onFocus={() => {
              setActiveInput('email');
            }}
            onBlur={() => {
              setActiveInput(null);
            }}
          />
        </View>
        {error.email && <Text style={styles.error}>{error.email}</Text>}
        <View
          style={[
            styles.containerPassword,
            {
              borderColor: getTextColor('password'),
            },
          ]}>
          <IoniconsIcon
            name={'lock-closed-outline'}
            size={20}
            color={getTextColor('password')}
            onPress={() => setShowPass(!showPass)}
          />
          <TextInput
            style={[
              styles.passwordInput,
              {width: '70%', color: getTextColor('password')},
            ]}
            value={password}
            secureTextEntry={!showPass}
            placeholder="Password"
            onChangeText={val => handlePassword(val)}
            onFocus={() => {
              setActiveInput('password');
            }}
            onBlur={() => {
              setActiveInput(null);
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
            {borderColor: getTextColor('firstName')},
          ]}>
          <MaterialIcon
            name={'person-outline'}
            size={20}
            color={getTextColor('firstName')}
          />
          <TextInput
            style={[styles.passwordInput, {color: getTextColor('firstName')}]}
            value={firstName}
            placeholder="First Name"
            onChangeText={val => handleFirstName(val)}
            onFocus={() => {
              setActiveInput('firstName');
            }}
            onBlur={() => {
              setActiveInput(null);
            }}
          />
        </View>
        {error.firstName && <Text style={styles.error}>{error.firstName}</Text>}
        <View
          style={[
            styles.containerPassword,
            {borderColor: getTextColor('lastName')},
          ]}>
          <IoniconsIcon
            name={'person-circle-outline'}
            size={20}
            color={getTextColor('lastName')}
          />
          <TextInput
            style={[styles.passwordInput, {color: getTextColor('lastName')}]}
            value={lastName}
            placeholder="Last Name"
            onChangeText={val => handleLastName(val)}
            onFocus={() => {
              setActiveInput('lastName');
            }}
            onBlur={() => {
              setActiveInput(null);
            }}
          />
        </View>
        {error.lastName && <Text style={styles.error}>{error.lastName}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>You have account? Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={register}>
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
