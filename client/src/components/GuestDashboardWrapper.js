import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GuestDashboard from './GuestDashboard'; // Import your GuestDashboard component

const GuestDashboardWrapper = () => {
  const location = useLocation();
  const userId = location.state.userId; // Access the userId from the location state

  return <GuestDashboard userId={userId} />;
};

export default GuestDashboardWrapper;