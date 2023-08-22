// UseAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Fetch user data based on the token
      axios.get('http://localhost:5000/Guest/login', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  return { user };
}

export default useAuth;