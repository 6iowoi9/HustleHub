// mergeddata.js

import { getAllPost } from './postdata';
import { getUsers } from './user';

const cardDetails = () => Promise.all([getAllPost(), getUsers()])
  .then(([allPostData, usersData]) => {
    // Convert array of objects to object with firebaseKey as keys
    const allPostObject = allPostData.reduce((acc, post) => {
      acc[post.firebaseKey] = post;
      return acc;
    }, {});

    const usersObject = usersData.reduce((acc, user) => {
      acc[user.firebaseKey] = user;
      return acc;
    }, {});

    // Combine data based on firebaseKey
    const combinedData = { ...allPostObject, ...usersObject };
    console.log(combinedData);

    return combinedData;
  })

  .catch((error) => {
    console.error('Error occurred:', error);
    throw error; // Rethrow the error to propagate it further
  });
export default cardDetails;
