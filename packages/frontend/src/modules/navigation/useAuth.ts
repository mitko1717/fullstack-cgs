import { useState } from 'react';
import { STORAGE_KEYS } from '../common/consts/app-keys.const';

export default function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [email, setEmail] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.EMAIL));

  const login = (userToken: string, userEmail: string) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, userToken);
    localStorage.setItem(STORAGE_KEYS.EMAIL, userEmail);
    setToken(userToken);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EMAIL);
    setToken(null);
    setEmail(null);
  };

  return { token, email, login, logout };
}
