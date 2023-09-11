import React, { useState, useEffect, Fragment } from "react";
import { useLocation, Link } from "react-router-dom"
import axios from "axios"


import UserSideBar from "./UserSideBar"
import UserEditBooking from "./UserEditBooking"
import { useAuth2 } from "./AuthContextUser"

const UserDashboard = ({ userName }) => {
  const location = useLocation()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookings, setBooking] = useState([])
  const { userIsLoggedIn } = useAuth2()

  const deleteBooking = async (bookingid) => {
    try {
        const deleteBooking = await fetch(`http://localhost:5000/booking/${bookingid}`, {
            method: "DELETE"
        })

        setBooking(bookings.filter(booking => booking.bookingid !== bookingid));

    } catch (err) {
        console.error(err.message)
        //alert("Cannot delete this booking. Payment has been done.")
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
  getBookings()
}, [])

const toggleEditModal = () => {
  setIsEditModalOpen(true)
}

const handleCloseModal = () => {
  setIsEditModalOpen(false);
};

// Add event listener to handle Escape key press
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // Clean up the event listener when component unmounts
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  return (
    <Fragment className="flex">
    {" "}
      <div className="container full-width mt-16">
        {userIsLoggedIn ? (

          <div className="flex flex-row">
            <UserSideBar userName={userName} />
              {" "}
              <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Booking ID</th>
                    <th scope="col" className="px-6 py-3">Guest ID</th>
                    <th scope="col" className="px-6 py-3">Booking Date</th>
                    <th scope="col" className="px-6 py-3">Booking Time</th>
                    <th scope="col" className="px-6 py-3">Booking Created</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Booking Type</th>

                  </tr>
                </thead>
                <tbody>
                    {bookings.map(book => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                        key={book.bookingid}>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingid}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.guestid}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingdate}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtime}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingcreated}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.status}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtype}</td>
                        <td key={book.bookingid}> 
                          <button 
                          key={book.bookingid}
                          onClick={toggleEditModal} 
                          className="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange">  
                          Edit
                          </button>

                          {isEditModalOpen ? ( //opens modal
                            
                            <UserEditBooking bookingid={book.bookingid} handleCloseModal={handleCloseModal} /> //sets to false
                          ) : (
                                <></>
                          )}

                          </td>
                        <td><button className="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange" onClick={() => deleteBooking(book.bookingid)}>Delete</button></td>
                    </tr>
                

                ))}
                </tbody>
              </table>
              </div>
            </div>
          
        ) : (
          <p><Link to="/about"/></p>
        )}
      </div>
    </Fragment>
  );
};

export default UserDashboard;
