import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "./AuthContext";

import "../assets/styles/NavBar.css";
import logo from "../assets/images/logo-type.svg";
import GuestLogin from '../components/GuestLogin'

//import HomePage from '../pages/HomePage'
//stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
const NavBar = () => {
  const { isLoggedIn, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  
  const handleLogout = () => {
    logout()
    // add what i want to navigate here
  }

  const handleLogin = () => {

  }

  const toggleLoginModal = () => {
    //pop-ups login modal
    if (!isLoggedIn) {
      // Check if the guest is authenticated
      setIsLoginModalOpen(true); //pops up login form
      return
    }

    setIsLoginModalOpen(!isLoginModalOpen)

  }

  const handleCloseModal = () => {
    setIsLoginModalOpen(false)
  }

    // Add event listener to handle Escape key press
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          handleCloseModal()
        }
      }
  
      window.addEventListener("keydown", handleKeyDown)
  
      // Clean up the event listener when component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [])

  return (
    <div>
      <nav className="bg-marble-blue fixed w-full z-20 top-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <button
              type={"button"}
              className="text-white bg-rescue-orange hover:bg-rescue-orange-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-header rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              BOOK NOW!
            </button>

            {isLoggedIn ? (
              <div>
                <button
                  onClick={handleLogout}
                  type={"button"}
                  className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-header rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={toggleLoginModal}
                  type={"button"}
                  className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-header rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Login
                </button>
              </div>
            )}

            {isLoginModalOpen && ( //opens modal
              <GuestLogin/> //sets to false
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false" >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14">
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-marble-blue md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-marble-blue dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/about"
                  className="block py-2 pl-3 pr-4 text-purity font-header bg-rescue-orange rounded md:bg-transparent md:text-rescue-orange md:p-0 md:dark:text-rescue-orange"
                  aria-current="page"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block py-2 pl-3 pr-4 text-purity font-header rounded hover:bg-navy-blue md:hover:bg-transparent md:hover:text-navy-blue md:p-0 md:dark:hover:text-rescue-orange dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  SERVICES
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 pl-3 pr-4 text-purity font-header rounded hover:bg-navy-blue md:hover:bg-transparent md:hover:text-navy-blue md:p-0 md:dark:hover:text-rescue-orange dark:text-white dark:hover:bg-gray-700 dark:hover:text-rescue-orange md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar