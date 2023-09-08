import React, { createContext, useContext, useState } from 'react'

const AuthContextUser = createContext()

export const AuthProviderUser = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ userIsLoggedIn, setUserIsLoggedIn] = useState(false)

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
    <AuthContextUser.Provider value={{ isLoggedIn, setIsLoggedIn, userIsLoggedIn, setUserIsLoggedIn, login, logout, userLogout, userName, setUserName }}>
      {children}
    </AuthContextUser.Provider>
  );
};

export const useAuth2 = () => useContext(AuthContextUser)