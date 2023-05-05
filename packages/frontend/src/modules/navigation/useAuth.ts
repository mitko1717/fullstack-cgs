import { useState } from 'react';
import { STORAGE_KEYS } from '../common/consts/app-keys.const';

export default function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [email, setEmail] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.EMAIL));

  const login = (userToken: string, userEmail: string) => {
    const expirationTime = process.env.JWT_EXPIRATION || '360000'; // use JWT_EXPIRATION from environment variable or default to 360000
    const expirationDate = new Date().getTime() + parseInt(expirationTime, 10); // calculate expiration date

    localStorage.setItem(STORAGE_KEYS.TOKEN, userToken);
    localStorage.setItem(STORAGE_KEYS.EMAIL, userEmail);
    localStorage.setItem(STORAGE_KEYS.EXPIRATION, expirationDate.toString()); // save expiration date to ls
    setToken(userToken);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EMAIL);
    localStorage.removeItem(STORAGE_KEYS.EXPIRATION); // remove expiration date from ls
    setToken(null);
    setEmail(null);
  };

  // check if token has expired based on the saved expiration date
  const isTokenExpired = () => {
    const expirationDate = localStorage.getItem(STORAGE_KEYS.EXPIRATION);
    if (expirationDate) {
      const now = new Date().getTime();
      return now > parseInt(expirationDate, 10);
    }
    return false;
  };

  // check if user is authenticated based on the saved token and expiration date
  const isAuthenticated = () => token && !isTokenExpired();

  return { token, email, login, logout, isAuthenticated };
}
