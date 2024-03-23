import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <div id="pfpdisplayname">
        {user?.photoURL && (
        <div id="profile">
          <img id="pfp" src={user.photoURL} alt={user.displayName} />
        </div>
        )}
        <h1 id="displayName">{user?.displayName }</h1>
      </div>
    </>
  );
}
