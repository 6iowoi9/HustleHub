import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';

const useCurrentUserUid = () => {
  const auth = useAuth(); // Assuming useAuth returns the current user object
  const [currentUserUid, setCurrentUserUid] = useState(null);

  useEffect(() => {
    if (auth.user) {
      setCurrentUserUid(auth.user.uid);
    } else {
      setCurrentUserUid(null);
    }
  }, [auth.user]);

  return currentUserUid;
};

export default useCurrentUserUid;
