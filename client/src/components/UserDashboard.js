import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState()

  useEffect(() => {
    // Fetch user data after component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/User/${userId}`); // Replace with the correct API endpoint
        setUserData(response.data)
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div className="mt-20">
      {userData ? (
        <div>
          <h2>Welcome, {`${userData[0].username}`}!</h2>
          {/* Display personalized content based on user data */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
