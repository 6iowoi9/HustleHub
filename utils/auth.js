import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const registerUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user`, {
    method: 'POST',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut, registerUser };
