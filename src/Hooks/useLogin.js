import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';

import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase/firebase.config';

const useLogin = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState('');
  const userLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, userLogin };
};

export default useLogin;
