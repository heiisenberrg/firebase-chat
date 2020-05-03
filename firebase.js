import Firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDDMfCcMVszdrWlxfxttMrMNRkK5YiH12o',
  authDomain: 'fir-chat-4dcdd.firebaseapp.com',
  databaseURL: 'https://fir-chat-4dcdd.firebaseio.com',
  projectId: 'fir-chat-4dcdd',
  storageBucket: 'fir-chat-4dcdd.appspot.com',
  messagingSenderId: '509743929303',
  appId: '1:509743929303:web:f04ecd05d01ae4f7501d92',
  measurementId: 'G-P71EM00KS6',
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
