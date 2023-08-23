import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const GuestDashboard = () => {
  const [guestData, setGuestData] = useState(null)
  const { emailAdd } = location.state || {};


  return (
    <div className="mt-20">
      {emailAdd ? (
        <div>
          <h2>Welcome, {emailAdd}!</h2>
          {/* Display personalized content based on user data */}
        </div>
      ) : (
        <p>Loading user data...Guest</p>
      )}
    </div>
  );
};

export default GuestDashboard;
