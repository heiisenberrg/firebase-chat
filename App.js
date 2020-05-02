import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

function App() {
  const [screenName, setScreenName] = useState('login');
  const [user, setUser] = useState();

  console.warn('USER OBJ===>>>>>', user);
  function onAuthStateChanged(userObj) {
    setUser(userObj);
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const changeScreen = name => {
    setScreenName(name);
  };

  return (
    <>
      {screenName === 'login' && (
        <Login changeScreen={name => changeScreen(name)} />
      )}
      {screenName === 'ChatList' && <ChatList />}
    </>
  );
}

function Login(props) {
  const login = () => {
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

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User signed out!'));
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
        onPress={() => login()}>
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
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 10,
          width: '50%',
          borderWidth: 2,
          backgroundColor: 'white',
          borderColor: '#6960EC',
          borderRadius: 5,
        }}
        onPress={() => signout()}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 16,
            color: '#6960EC',
            textAlign: 'center',
          }}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ChatList() {
  return (
    <View style={{backgroundColor: 'red'}}>
      <Text>Chat list</Text>
    </View>
  );
}

export default App;
