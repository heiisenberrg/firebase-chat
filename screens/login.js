import React from 'react';
import firebase from 'react-native-firebase';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

function login(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (props.user && Object.keys(props.user).length > 0) {
      props.changeScreen('ChatList');
    }
  }, [props]);

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('ajaykkumar@gmail.com', 'test123')
      .then(() => {
        props.changeScreen('ChatList');
        console.warn('signed in successfully');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9f9cb2',
      }}>
      <View style={{margin: 5}}>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            fontWeight: 'bold',
            lineHeight: 16,
            color: 'black',
            textAlign: 'center',
          }}>
          Firebase Chat Application
        </Text>
      </View>
      <TextInput
        placeholder="Email Id"
        style={{padding: 10, margin: 10, width: '50%', borderBottomWidth: 0.5}}
      />
      <TextInput
        placeholder="Password"
        style={{padding: 10, margin: 10, width: '50%', borderBottomWidth: 0.5}}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 10,
          width: '50%',
          borderWidth: 0.5,
          backgroundColor: '#6960EC',
          borderColor: '#6960EC',
          borderRadius: 5,
        }}
        onPress={() => signIn()}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 16,
            color: 'white',
            textAlign: 'center',
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default login;
