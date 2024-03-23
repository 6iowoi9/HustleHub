import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createPost = (payload) => fetch(`${endpoint}/post.json`, {
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
    console.error('Error in registerUser:', error);
    throw error; // Re-throw the error for handling in the calling code
  });

const updatePost = (payload) => new Promise((resolve, reject) => {
  const url = `${endpoint}/post/${payload.firebaseKey}.json`;

  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update post. URL: ${url}, Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log('Post updated successfully:', data);
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating post:', error);
      reject(error);
    });
});

const deletePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getAllPost = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data received:', data); // Log the data here
      resolve(Object.values(data));
    })
    .catch(reject);
});

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const reactions = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${firebaseKey}/reactions.json`, {
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
    .catch((error) => reject(error.message));
});

const updatereactions = (firebaseKey, updatedReactionsCount) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reactions: updatedReactionsCount }), // Include updated reactions count in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error.message));
});

const createComment = (firebaseKey, payload) => fetch(`${endpoint}/post/${firebaseKey}/comments.json`, {
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
    console.error('Error in registerUser:', error);
    throw error; // Re-throw the error for handling in the calling code
  });

const getComments = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${firebaseKey}/comments.json`, {
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
    .catch((error) => reject(error.message));
});
const updateComments = (firebaseKey, updatedReactionsCount) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reactions: updatedReactionsCount }), // Include updated reactions count in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error.message));
});
export {
  createPost, updatePost, getAllPost, deletePost, getSinglePost, reactions, updatereactions, getComments, createComment, updateComments,
};
