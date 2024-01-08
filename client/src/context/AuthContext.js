import { createContext, useState, useEffect, useCallback } from 'react';
import { baseUrl, postRequest } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    name: '',
    id: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('User');
    setUser(JSON.parse(user));
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(async () => {
    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));

    setIsLoginLoading(false);

    if (response.error) {
      return setLoginError(response);
    }

    localStorage.setItem('User', JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('User');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
