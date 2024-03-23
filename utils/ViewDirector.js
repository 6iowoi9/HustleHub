// ViewDirectorBasedOnUserAuthStatus.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';
import { getUsers } from '../api/user'; // Assuming getUsers returns a Promise that resolves to the users from Firebase

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // Check if the signed-in user's UID matches any of the UIDs in the fetched users
  const signedInUserUID = user ? user.uid : null;
  const isRegisteredUser = users.some((userData) => userData.uid === signedInUserUID);

  // if the user is logged in and their UID matches, show the main component
  if (user && isRegisteredUser) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <Component {...pageProps} />
      </>
    );
  }

  // if the user is logged in but not registered, show the register form
  if (user && !isRegisteredUser) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <RegisterForm user={user} updateUser={updateUser} />
        </div>
      </>
    );
  }

  // if the user is not logged in, show the sign-in page
  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
