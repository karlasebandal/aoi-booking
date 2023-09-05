import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import UserSideBar from "./UserSideBar"
import UserEditBooking from "./UserEditBooking";

const UserDashboard = () => {
  const location = useLocation()
  const { username } = location.state || {}
  const [bookings, setBooking] = useState([])

  const deleteBooking = async (bookingid) => {
    try {
        const deleteBooking = await fetch(`http://localhost:5000/booking/${bookingid}`, {
            method: "DELETE"
        });

        setBooking(bookings.filter(booking => booking.bookingid !== bookingid));

    } catch (err) {
        console.error(err.message);
    }
}
const getBookings = async() => {
    try {
        
        const response = await fetch("http://localhost:5000/booking")
        const jsonData = await response.json();
        
        setBooking(jsonData);

    } catch (err) {
        console.error(err.message)
    }
}

useEffect(() => {
  getBookings();
}, [])

  return (
    <Fragment class="flex">
    {" "}
      <div class="container full-width mt-16">
        {username ? (

          <div class="flex flex-row">
            <UserSideBar username={username} />
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
                        <td> <UserEditBooking book={book} /> </td>
                        <td><button class="btn btn-danger" onClick={() => deleteBooking(book.bookingid)}>Delete</button></td>
                    </tr>
                

                ))}
                </tbody>
              </table>
              </div>
            </div>
          
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </Fragment>
  );
};

export default UserDashboard;
