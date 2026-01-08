import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userName: string | null;
  setUserName: (name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState<string | null>(() => {
    return localStorage.getItem('flowmusic_username');
  });

  const setUserName = (name: string) => {
    localStorage.setItem('flowmusic_username', name);
    setUserNameState(name);
  };

  const logout = () => {
    localStorage.removeItem('flowmusic_username');
    setUserNameState(null);
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
