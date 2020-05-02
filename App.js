import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

function App() {
  const [screenName, setScreenName] = useState('login');

  return <>{screenName === 'login' && <Login />}</>;
}

function Login() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: 16,
            color: 'white',
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
        }}>
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

export default App;
