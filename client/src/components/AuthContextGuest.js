import React, { createContext, useContext, useState } from 'react'

const AuthContextGuest = createContext()

export const AuthProviderGuest = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  const [guestDetails, setGuestDetails] = useState()
  const [guestId, setGuestId] = useState()
  // const [userName, setUserName] = useState()

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
    <AuthContextGuest.Provider value={{ isLoggedIn, setIsLoggedIn, userIsLoggedIn, setUserIsLoggedIn, guestId, setGuestId, guestDetails, setGuestDetails, login, logout, userLogout }}>
      {children}
    </AuthContextGuest.Provider>
  );
};

export const useAuth1 = () => useContext(AuthContextGuest)