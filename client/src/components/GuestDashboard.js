import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const GuestDashboard = () => {
  const [guestData, setGuestData] = useState(null)
  const { emailAdd } = location.state || {}

  const { isLoggedIn, guestDetails } = useAuth()
 // const { id, firstName, lastName } = guestDetails

 console.log(`${emailAdd}`)

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-20">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, !</h2>
          {/* Display personalized content based on user data */}
        </div>
      ) : (
        <p>Loading user data...Guest</p>
      )}
    </div>
  );
};

export default GuestDashboard;


