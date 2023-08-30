//import frameworks and libraries
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom" 
import axios from "axios";
import { useAuth } from './AuthContext'
//import { useAuthentication } from './UseAuthentication'

const GuestLogin = () => {
  const nav = useNavigate()
  const [emailAdd, setEmailAdd] = useState("")
  const [password, setPassword] = useState("")
  //const [guestId, setGuestid] = useState()
  const [message, setMessage] = useState("")
  const { setIsLoggedIn, setGuestId } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Handle Login Details
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:5000/Guest/login`, {emailAdd,password})
  
      console.log(response.data.guestId)
      setGuestId(response.data.guestId)
      setIsLoggedIn(true)

      //navigate('/guestdashboard', { state: { emailAdd }})
      // Update isLoggedIn and guestDetails
      //login(response.data.guestid)
      
      //useAuth details
      //  isLoggedIn(true)
      //guestDetails(response.data.guestId)

      handleCloseModal()
      

    } catch (error) {
      console.error("Login error:", error)
      alert("Login error catch")
    }
  }

  //Handles modal
  const handleCloseModal = () => {
    setIsLoginModalOpen(false) // Close the modal
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsLoginModalOpen(false) // Close the modal on Escape key press
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <>
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div >
                  <div class="text-center sm:ml-4 sm:mt-0 sm:text-left">
                    
                    <div class="mt-2 w-full">
                      <h2 className="text-3xl font-bold mb-3 text-gray-800">
                        Log-in
                      </h2>
                      <div className="mb-5 text-sm text-left text-gray-400">
                        <p>
                          You don´t have an account? &nbsp;
                          <Link
                            to="/guestregistration"
                            className="text-rescue-orange"
                          >
                            Register now!
                          </Link>
                        </p>
                      </div>

                      <form className="space-y-5">
                        <div>
                          <label className="block mb-1 font-bold text-gray-500">
                            Email Address
                          </label>
                          <input
                            type="text"
                            name="emailAdd"
                            placeholder="Email Address"
                            className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                            onChange={(e) => setEmailAdd(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block mb-1 font-bold text-gray-500">
                            Password
                          </label>
                          <input
                            type="password"
                            name="pass"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                          />
                        </div>

                      

                      </form>
                    </div>
                  </div>
                </div>
              </div>

              
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  className="block ml-5 bg-rescue-orange hover:bg-navy-blue hover:from-red-100 hover:to-blue-400 p-4 rounded text-gray-700 hover:text-gray-600 transition duration-300 font-bold text-sm"
                  onClick={handleLogin}
                  type="submit">
                  Log-In
                </button>

                <button
                  onClick={handleCloseModal}
                  type="button"
                  class="block w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>

            
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestLogin;