import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDE_NBbP7TsC5Tz4pyeGZHtQ_uqqYah7OE',
  authDomain: 'invoice-vue-44a01.firebaseapp.com',
  projectId: 'invoice-vue-44a01',
  storageBucket: 'invoice-vue-44a01.appspot.com',
  messagingSenderId: '922163485790',
  appId: '1:922163485790:web:477c1bf2eb1529840da8cf',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
