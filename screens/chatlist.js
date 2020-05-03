import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

function chatList(props) {
  const navHeader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 90,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey',
        }}>
        <View
          style={{
            top: 20,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => signout()}>
            <Text style={{textDecorationLine: 'underline', color: 'white'}}>
              Signout
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              bottom: 5,
              // textTransform: 'uppercase',
              fontSize: 22,
              textAlign: 'center',
            }}>
            Chats
          </Text>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => props.changeScreen('Contacts')}>
            <Text
              style={{
                color: 'white',
                textDecorationLine: 'underline',
                textAlign: 'right',
              }}>
              Contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {navHeader()}
      <Text>Chat list</Text>
    </View>
  );
}

export default chatList;
