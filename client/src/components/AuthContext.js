import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  const [guestDetails, setGuestDetails] = useState(null)
  const [guestId, setGuestId] = useState()
  const [userName, setUserName] = useState()

  const login = (guestData) => {
    setIsLoggedIn(true)
    setGuestDetails(guestData)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setGuestDetails(null)
  }

  const userLogout = () => {
    setUserIsLoggedIn(false)
    //setGuestDetails(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userIsLoggedIn, setUserIsLoggedIn, userName, setUserName, guestId, setGuestId, guestDetails, setGuestDetails, login, logout, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)