import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import { auth } from '../firebase/firebase.config';

const useSignOut = () => {
  const { dispatch } = useContext(AuthContext);
  const userSignOut = () => {
    signOut(auth).then(() => dispatch({ type: 'LOGOUT' }));
  };
  return { userSignOut };
};

export default useSignOut;
