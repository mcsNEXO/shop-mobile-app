import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {SvgXml} from 'react-native-svg';
import React from 'react';
import {loginImage} from '../../assets/images/svg/img';
import validator from 'validator';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import axios from '../../axios';
import {useAuthContext} from '../../context/AuthContext';

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

const Login = ({navigation}: LoginProps) => {
  //states
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPass, setShowPass] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);
  const [error, setError] = React.useState<ErrorWithIndex>({
    email: '',
    password: '',
    error: '',
  });
  const {user, setAuth} = useAuthContext();

  //functions
  const validateEmail = (val: string) => {
    //save email state
    setEmail(val);

    //if error exist set state email error and clear general error
    setError(prevError => ({
      ...prevError,
      email: validator.isEmail(val) ? '' : 'Please enter a valid email!',
      error: '',
    }));
  };

  const validatePassword = (val: string) => {
    //save password state
    setPassword(val);

    //if error exist set state password error and clear general error
    setError(prevError => ({
      ...prevError,
      password: validator.isEmpty(val) ? 'Password cannot be empty!' : '',
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

  const login = async () => {
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post('sign-in', data);
      setAuth(res.data.user);
      navigation.navigate('Account');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{height: Dimensions.get('screen').height * 0.72}}>
          <View style={styles.image}>
            <SvgXml
              xml={loginImage}
              width={Dimensions.get('window').width * 0.85}
              height={Dimensions.get('window').height * 0.4}
              onPress={() => console.log(user)}
            />
          </View>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.underTitle}>Welcome again!</Text>
          {error.error && <Text style={styles.error}>{error.error}</Text>}
          <View
            style={[
              styles.containerPassword,
              {borderColor: getColor('email')},
            ]}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.text}>You don't have account? Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={login}
            touchSoundDisabled={true}
            disabled={
              Object.values(error).some(x => x !== '') || !email || !password
            }>
            <Text style={styles.btnText}>Sign in!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
    marginTop: 2,
    color: 'red',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
