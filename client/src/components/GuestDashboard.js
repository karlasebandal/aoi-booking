import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestDashboard = () => {
  const [guestData, setGuestData] = useState(null)

  useEffect(() => {
    // Fetch user data after component mounts
    const fetchGuestData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Guest/${guestId}`) // Replace with the correct API endpoint
        setGuestData(response.data)
       // console.log(`Guest dashboard user id: ${userId}`)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    };

    fetchGuestData();
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div className="mt-20">
      {guestData ? (
        <div>
          <h2>Welcome, {guestData.firstName}!</h2>
          {/* Display personalized content based on user data */}
        </div>
      ) : (
        <p>Loading user data...Guest</p>
      )}
    </div>
  );
};

export default GuestDashboard;
