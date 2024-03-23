import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function User({ userObj }) {
  const { user } = useAuth();
  console.warn(userObj);

  return (
    <>
      <Card id="userCard">
        <Card.Img
          variant="top"
          src={user.photoURL}
          alt={user.displayName}
          style={{
            width: '75%',
            borderRadius: '50%',
            alignSelf: 'center',
            margin: '15px',
          }}
        />
        <Card.Body>
          <Card.Title>{user.displayName}</Card.Title>
          <Card.Text>email: {user.email}</Card.Text>
          <Card.Text>last login: {user.metadata.lastSignInTime}</Card.Text>
          {/* <Button variant="danger" onClick={signOut} className="m-2" id="signOutBtn">
            sign out
          </Button> */}
        </Card.Body>
      </Card>
    </>
  );
}

User.propTypes = {
  userObj: ({
    image: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    lastSignInTime: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default User;
