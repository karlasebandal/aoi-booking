import React, { useState, useEffect } from 'react'
import { useAuth1 } from './AuthContextGuest'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const BookingListByGuest = () => {
  const [guestData, setGuestData] = useState(null)
  const { emailAdd } = location.state || {}
  const [bookings, setBooking] = useState([])

  const [editedStatus, setEditedStatus] = useState("");
  const [editBookingId, setEditBookingId] = useState(null);

  const { isLoggedIn, guestId } = useAuth1() // Removed redundant guestId


  const handleEditStatus = (bookingId, currentStatus) => { 
    setEditedStatus(currentStatus);
    setEditBookingId(bookingId)
  }

  const handleStatusChange = async () => {
    
    try {
      const response = await fetch(`http://localhost:5000/UpdateBookingStatus/${editBookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: editedStatus }),
      });

      if (response.ok) {
        const updatedBooking = await response.json();
        const updatedBookings = bookings.map((booking) =>
          booking.bookingid === updatedBooking.bookingid ? updatedBooking : booking
      )

      console.log("Status updated successfully");
      setBooking(updatedBookings) 
      setEditBookingId(null)

      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


 const getBookings = async() => {
  try {
      
    const guestResponse = await axios.get(`http://localhost:5000/Guest/${guestId}`)
      const guestData = guestResponse.data
      setGuestData(guestData);

      const bookingResponse = await axios.get(`http://localhost:5000/bookingListByGuest/${guestId}`)
      const bookingData = bookingResponse.data
      setBooking(bookingData);

  } catch (err) {
      console.error(err.message)
  }
}

useEffect(() => {
  getBookings();
}, [editBookingId])

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-20">
      {isLoggedIn ? (
        <div>
          <div className="flex flex-row">
            
              
              <div className="relative overflow-x-auto">
              
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Service</th>
                    <th scope="col" className="px-6 py-3">Booking Date</th>
                    <th scope="col" className="px-6 py-3">Booking Time</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Booking Type</th>
                    <th scope="col" className="px-6 py-3">Action</th>

                  </tr>
                </thead>
                <tbody>
                    {bookings.map(book => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                        key={book.bookingid}>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.service_name}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingdate}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtime}</td>

                        <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                        {/* STATUS */}
                        {editBookingId === book.bookingid ? (
                          <select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          >
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                          </select>
                        ) : (
                          book.status
                        )}
                        </td>

                        {/* <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.status}</td> */}


                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtype}</td>
                        
                        <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"y
                      >
                        {editBookingId === book.bookingid ? (
                          <button 
                          className="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-rescue-orange focus:text-navy-blue"
                          onClick={handleStatusChange}
                          >Save</button>
                        ) : (
                          <button
                            className="bg-navy-blue text-purity p-3 ml-3 font-normal rounded-lg  hover:ring-marble-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
                            onClick={() =>
                              handleEditStatus(book.bookingid, book.status)
                            }
                          >
                            Edit
                          </button>
                        )}
                      </td>
                        
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

export default BookingListByGuest