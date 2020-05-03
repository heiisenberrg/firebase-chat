import React, {useState} from 'react';
import firebase from 'react-native-firebase';
import Login from './screens/login';
import ChatList from './screens/chatlist';
import Contacts from './screens/addressbook';

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
        <Login changeScreen={name => changeScreen(name)} user={user}/>
      )}
      {screenName === 'ChatList' && (
        <ChatList changeScreen={name => changeScreen(name)} user={user}/>
      )}
      {screenName === 'Contacts' && (
        <Contacts changeScreen={name => changeScreen(name)} user={user}/>
      )}
    </>
  );
}

export default App;
