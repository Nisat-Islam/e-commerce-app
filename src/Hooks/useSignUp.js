import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';

import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase/firebase.config';

const useSignUp = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState('');
  const userSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, userSignUp };
};

export default useSignUp;
