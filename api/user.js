import { clientCredentials } from '../utils/client';
// import { getSinglePost } from './postdata';

const endpoint = clientCredentials.databaseURL;

const registerUser = (payload) => fetch(`${endpoint}/user.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error registering user:', error);
    throw error;
  });

const updateUser = (payload) => new Promise((resolve, reject) => {
  // Use payload.firebaseKey in the URL construction
  fetch(`${endpoint}/user/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(Object.values(data));
    })
    .catch(reject);
});

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${firebaseKey}/uid.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser2 = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${firebaseKey}/uid.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching user data:', error.message);
      reject(error);
    });
});

// const fetchedUsersandPosts = (postFirebaseKey) => new Promise((resolve, reject) => {
//   getSinglePost(postFirebaseKey.uid)
//     .then((postObject) => {
//       console.log('Post object:', postObject);

//       // Extract the UID of the author from the postObject
//       const authorUID = postObject.uid;

//       // Fetch the author object using the UID
//       getSingleUser(authorUID)
//         .then((authorObject) => {
//           console.log('Author object:', authorUID);

//           // Resolve the Promise with the authorObject and the postObject
//           resolve({ authorObject, postObject });
//         })
//         .catch((error) => {
//           console.log('Error:', error);
//           reject(error);
//         });
//     })
//     .catch((error) => {
//       console.log('Error:', error);
//       reject(error);
//     });
// });

export {
  registerUser, updateUser, getUsers, getSingleUser, getSingleUser2,
};
