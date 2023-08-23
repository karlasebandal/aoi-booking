import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const UserDashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className="mt-20">
      {username ? (
        <div>
          <h2>Welcome, {`${username}`}!</h2>

        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
