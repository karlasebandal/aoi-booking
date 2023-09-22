import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"
import axios from "axios"


import UserSideBar from "./UserSideBar"
import UserEditBooking from "./UserEditBooking"
import { useAuth2 } from "./AuthContextUser"

import { BiEditAlt } from "react-icons/bi";

const UserDashboard = ({ userName }) => {
  const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [editedStatus, setEditedStatus] = useState("");
  const [editBookingId, setEditBookingId] = useState(null);
  
  const { userIsLoggedIn } = useAuth2();

  const deleteBooking = async (bookingid) => {
    try {
      const deleteBooking = await fetch(
        `http://localhost:5000/booking/${bookingid}`,
        {
          method: "DELETE",
        }
      );

      setBookings(
        bookings.filter((booking) => booking.bookingid !== bookingid)
      );
    } catch (err) {
      console.error(err.message);
      //alert("Cannot delete this booking. Payment has been done.")
    }
  };

  const getBookings = async() => {
      try {

          const response = await fetch("http://localhost:5000/booking")
          const jsonData = await response.json();
          setBooking(jsonData);

      } catch (err) {
          console.error(err.message)
      }
  }

  const toggleEditModal = () => {
    setIsEditModalOpen(true);
  };

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

  const handleEditStatus = (bookingId, currentStatus) => {
    setEditedStatus(currentStatus);
    setEditBookingId(bookingId);
  };

  const handleStatusChange = async () => {
    
    try {
      const response = await fetch(`http://localhost:5000/booking/${editBookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: editedStatus }),
      });

      //console.log(editBookingId)

      if (response.ok) {
        const updatedBooking = await response.json();
        const updatedBookings = bookings.map((booking) =>
          booking.bookingid === updatedBooking.bookingid ? updatedBooking : booking
      )

      console.log("Status updated successfully");
      setBookings(updatedBookings) 
      setEditBookingId(null)

      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/booking")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching data:", error));
}, [editBookingId]);

  return (
    <div>
      {" "}
      <div className="container full-width mt-16">
        {userIsLoggedIn ? (
          <div className="flex flex-row">
            <UserSideBar userName={userName} />{" "}
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Booking Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Service Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((book) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={book.bookingid}
                    >
                      <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.bookingdate}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {editBookingId === book.bookingid ? (
                          <select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          >
                                <option value="Completed">Completed</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                          </select>
                        ) : (
                          book.status
                        )}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.service_name}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.guest_firstname}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.guest_lastname}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {editBookingId === book.bookingid ? (
                          <button 
                          className="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-rescue-orange focus:text-navy-blue"
                          onClick={handleStatusChange}>Save</button>
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
                      <td key={book.bookingid}>
                        {/* <button
                          key={book.bookingid}
                          onClick={toggleEditModal}
                          className="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
                        >
                          Edit
                        </button>

                        {isEditModalOpen ? ( //opens modal
                          <UserEditBooking
                            bookingid={book.bookingid}
                            handleCloseModal={handleCloseModal}
                          /> //sets to false
                        ) : (
                          <></>
                        )} */}
                      </td>
                      <td>
                        <button
                          className="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
                          onClick={() => deleteBooking(book.bookingid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>
            <Link to="/about" />
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
