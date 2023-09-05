import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [guestDetails, setGuestDetails] = useState(null)
  const [guestId, setGuestId] = useState()

  const login = (guestData) => {
    setIsLoggedIn(true)
    setGuestDetails(guestData)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setGuestDetails(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, guestId, setGuestId, guestDetails, setGuestDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)