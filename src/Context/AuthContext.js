import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/firebase.config';

const initialState = {
  user: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }
    case 'AUTH_IS_READY': {
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    });
    unSub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authIsReady: state.authIsReady,
        dispatch,
        state,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useStateValue = () => useContext(AuthContext);
