import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetail} from '../store/action/getUserDetail';
import {useEffect} from 'react';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [async, setAsync] = useState('');
  const [password, setPassword] = useState('');
  const data = useSelector(state => state.userDetail);

  const onPressLogin = async () => {
    if (email.length < 1) {
      alert('Enter Email address');
    } else if (password.length < 1) {
      alert('Enter Password');
    } else {
      try {
        const response = await axios.post(
          'https://dev.dotminds.in/dotminds-api/api/login.php',
          {user_email_id: email, user_password: password},
        );
        if (response.data.status) {
          const {email_id, id, name} = response.data.data;
          dispatch(
            getUserDetail({
              email: email_id,
              id: id,
              userName: name,
              type: 'getUserDetail',
            }),
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    const stringData = `AsyncStorage >> Email : ${data.email} , Username : ${data.userName}, ID : ${data.id}`;
    try {
      await AsyncStorage.setItem('key', JSON.stringify(stringData));
    } catch (error) {}
    try {
      const value = await AsyncStorage.getItem('key');
      if (data.email.length > 1) {
        setAsync(value);
        console.log(value);
      }
    } catch (error) {}
    if (data.email.length > 1) {
      console.log('ReduxStorage >>', data);
    }
  };

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('key');
  //     if (value !== null) {
  //       alert(value);
  //     }
  //   } catch (error) {}
  // };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../logo.png')} />
      <Text style={styles.text}>Log In</Text>
      <TextInput
        placeholder="Email address"
        style={styles.input}
        placeholderTextColor="black"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="black"
        value={password}
        onChangeText={e => setPassword(e)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.otp} onPress={onPressLogin}>
        <Text style={styles.otpText}>Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.otp} onPress={getData}>
        <Text style={styles.otpText}>Login</Text>
      </TouchableOpacity> */}
      <View style={styles.row}>
        <Text style={styles.signUp}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.textSignup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2ebda',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 70,
  },
  input: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    padding: 12,
    marginTop: 30,
    alignSelf: 'flex-end',
  },
  image: {
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 40,
  },
  otp: {
    marginTop: 30,
    backgroundColor: '#0f974f',
    borderRadius: 10,
    width: '85%',
    alignSelf: 'flex-end',
  },
  otpText: {
    fontSize: 16,
    padding: 12,
    textAlign: 'center',
    color: 'white',
  },
  signUp: {
    marginLeft: 70,
    marginTop: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  textSignup: {
    color: '#0f974f',
    fontSize: 16,
    marginTop: 15,
    marginLeft: 5,
  },
});

export default Login;
