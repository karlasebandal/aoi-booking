import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const GuestDashboard = () => {
  const [guestData, setGuestData] = useState(null)
  const { emailAdd } = location.state || {}
  const [bookings, setBooking] = useState([])

  const { isLoggedIn, guestId } = useAuth()
  //const { guestId, firstName, lastName } = guestDetails


 console.log(`${guestId}`)
 //console.log(`GuestDash: ${guestId}, ${firstName},${lastName}`)

 const getBookings = async( guestId ) => {
  try {
      

      const response = await axios.get(`http://localhost:5000/booking/${guestId}`)
      const jsonData = response.data
      
      setBooking(jsonData);

  } catch (err) {
      console.error(err.message)
  }
}

useEffect(() => {
  getBookings();
}, [])

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-20">
      {isLoggedIn ? (
        <div>
          <div class="flex flex-row">
            
              {" "}
              <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">Service ID</th>
                    <th scope="col" class="px-6 py-3">Guest ID</th>
                    <th scope="col" class="px-6 py-3">Booking Date</th>
                    <th scope="col" class="px-6 py-3">Booking Time</th>
                    <th scope="col" class="px-6 py-3">Booking Created</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Booking Type</th>

                  </tr>
                </thead>
                <tbody>
                    {bookings.map(book => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                        key={book.bookingid}>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.serviceid}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.guestid}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingdate}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtime}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingcreated}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.status}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtype}</td>
                        
                    </tr>
                

                ))}
                </tbody>
              </table>
              </div>
            </div>
        </div>
      ) : (
        <p>Loading user data...Guest</p>
      )}
    </div>
  );
};

export default GuestDashboard;


