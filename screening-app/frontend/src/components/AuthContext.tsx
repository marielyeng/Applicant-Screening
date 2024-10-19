import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextProps {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.get('http://localhost:5000/api/check-admin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        setIsAdmin(response.data.isAdmin);
      }).catch((error) => {
        console.error("Error checking admin status", error);
      });
    }
  }, []);

  // Login function to authenticate the user
  const login = async (username: string, password: string) => {
    const response = await axios.post('http://localhost:5000/api/login', { username, password });
    localStorage.setItem('jwtToken', response.data.access_token);
    
    // Check admin status after login
    const adminCheck = await axios.get('http://localhost:5000/api/check-admin', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`
      }
    });
    
    setIsAdmin(adminCheck.data.isAdmin);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
