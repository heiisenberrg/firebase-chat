/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {db} from '../firebase';

function contacts(props) {
  const [showSearch, setShowSearch] = React.useState(false);
  const [addressBook, setAddressBook] = React.useState([]);

  React.useEffect(() => {
    db.ref('/').on('value', querySnapShot => {
      let dbUsers = querySnapShot.val() ? querySnapShot.val() : {};
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        ).then(() => {
          Contacts.getAll((err, contacts) => {
            setAddressBook(contacts);
          });
        });
      } else if (Platform.OS === 'ios') {
        Contacts.getAll((err, contacts) => {
          let selectedAddress = [];
          contacts.map((data, index) => {
            for (let key in dbUsers) {
              if (dbUsers[key] === data.emailAddresses[0].email) {
                selectedAddress.push(data);
                break;
              }
            }
          });
          setAddressBook(selectedAddress);
        });
      }
    });
  }, []);

  const selectedContact = name => {
    console.warn('inside contact', name);
  };

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
          <TouchableOpacity onPress={() => props.changeScreen('ChatList')}>
            <Text style={{textDecorationLine: 'underline', color: 'white'}}>
              Back
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
            Contacts
          </Text>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => setShowSearch(!showSearch)}>
            <Text
              style={{
                color: 'white',
                textDecorationLine: 'underline',
                textAlign: 'right',
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={`index-${index}`}
        onPress={() => selectedContact(item)}
        style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: '#959CAC',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
            {item.givenName.slice(0, 1).toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text style={{fontSize: 18, lineHeight: 16, fontWeight: '600'}}>
              {item.givenName + ' ' + item.familyName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 16,
                color: '#B8B8B8',
                fontWeight: '700',
              }}>
              {item.emailAddresses && item.emailAddresses.length
                ? item.emailAddresses[0].email
                : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {navHeader()}
      <View style={{marginHorizontal: 20, marginVertical: 10, marginTop: 100}}>
        <FlatList
          data={addressBook}
          extraData={addressBook}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, borderWidth: 0.5, borderColor: '#ccc'}} />
          )}
        />
      </View>
    </View>
  );
}

export default contacts;
