// import React, { useState, useEffect } from 'react';
// import { useAuth1 } from './AuthContextGuest';
// import { useLocation } from 'react-router-dom'; // Import useLocation
// import axios from 'axios';

// const GuestDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Remove the definition of guestId from props
//   // const { guestId } = props;

//   const { isLoggedIn, guestId } = useAuth1(); // Remove guestId from useAuth
//   const location = useLocation(); // Create a location object

//   useEffect(() => {
//     // Access guestId from location.state
//     //const { guestId } = location.state || {};

//     console.log('Guest ID:', guestId);

//     const getBookings = async () => {
//       try {
//         // Fetch details
//         const response = await axios.get(`http://localhost:5000/booking/${guestId}`);
//         setBookings(response.data);
//         setLoading(false);
        
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//         setError('Failed to fetch bookings. Please try again later.');
//         setLoading(false);
//       }
//     };

//     getBookings();
//   }, [location.state]); // Ensure useEffect depends on location.state

//   return (
//     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-20">
//       {isLoggedIn ? (
//         <div>
//           <div className="flex flex-row">
//             {" "}
//             <div className="relative overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" className="px-6 py-3">
//                       Service ID
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Guest ID
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Booking Date
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Booking Time
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Booking Created
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Booking Type
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((book) => (
//                     <tr
//                       className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                       key={book.bookingid}
//                     >
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.serviceid}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.guestid}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.bookingdate}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.bookingtime}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.bookingcreated}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.status}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {book.bookingtype}
//                       </td>
//                       <td
//                         scope="col"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {/* Button is disabled if deposit amount is paid && payment has not been done after 24 hours*/}
//                         {/* If paid, the status changed to Confirmed */}
//                         {/* If not YET paid, the status is pending -- default status for river rafting, else confirmed on other services */}
//                         <button>Pay</button> 
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Loading user data...Guest</p>
//       )}
//     </div>
//   );
// };

// export default GuestDashboard

import React, { useState, useEffect } from 'react'
import { useAuth1 } from './AuthContextGuest'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const GuestDashboard = ({guestId}) => {
  const [guestData, setGuestData] = useState(null)
  const { emailAdd } = location.state || {}
  const [bookings, setBooking] = useState([])

  const { isLoggedIn } = useAuth1() // Remove redundant guestId
  //const { guestId, firstName, lastName } = guestDetails


 console.log(`${guestId}`)
 //console.log(`GuestDash: ${guestId}, ${firstName},${lastName}`)

 const getBookings = async() => {
  try {
      
    const guestResponse = await axios.get(`http://localhost:5000/Guest/${guestId}`)
      const guestData = guestResponse.data
      setGuestData(guestData);

      const bookingResponse = await axios.get(`http://localhost:5000/booking/${guestId}`)
      const bookingData = bookingResponse.data
      setBooking(bookingData);


  } catch (err) {
      console.error(err.message)
  }
}

useEffect(() => {
  getBookings();
}, [guestId])

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
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Booking Type</th>

                  </tr>
                </thead>
                <tbody>
                    {bookings.map(book => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                        key={book.bookingid}>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.serviceid}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingdate}</td>
                        <td scope="col" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.bookingtime}</td>
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
