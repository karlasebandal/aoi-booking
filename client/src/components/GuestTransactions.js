import React, { useState, useEffect, Fragment } from "react";
import { useAuth1 } from "./AuthContextGuest"
import axios from 'axios';

const GuestTransactions = () => {
  const { isLoggedIn, guestId } = useAuth1()
    const [guestData, setGuestData] = useState(null)
    const [payment, setPayment] = useState(false)

    const [payments, setPayments] = useState([])

    const isBookingPending = (pay) => {
      return pay.booking_status === "Pending";
    };

    const renderPayButton = (pay) => {
      if (isBookingPending(pay)) {
        return (
          <button
            className="bg-navy-blue text-purity p-3 ml-3 font-normal rounded-lg  hover:ring-marble-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue f ocus:text-rescue-orange"
            //onClick={() => deleteBooking(book.bookingid)}
          >
            Pay
          </button>
        );
      } else {
        return null;
      }
    };

    const getPayments = async() => {
      try {
          
        const guestResponse = await axios.get(`http://localhost:5000/Guest/${guestId}`)
          const guestData = guestResponse.data
          setGuestData(guestData);
    
          const paymentResponse = await axios.get(`http://localhost:5000/payment/${guestId}`)
          const paymentData = paymentResponse.data
          setPayments(paymentData);


    
      } catch (err) {
          console.error(err.message)
      }
    }

    useEffect(() => {
      getPayments();
    }, [])

  return (
    
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-20">
        {isLoggedIn ? (
            <div className="flex flex-row">
              {" "}
              <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Service</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Booking Type</th>
                    <th scope="col" className="px-6 py-3">Deposit Amount</th>
                    <th scope="col" className="px-6 py-3">Total</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {payments.map(pay => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                        key={pay.paymentid}>
                        <td 
                          scope="col" 
                          key={pay.paymentid}
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.service_name}</td>
                        <td
                          key={pay.paymentid} 
                          scope="col" 
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.booking_status}</td>
                        <td
                          key={pay.paymentid} 
                          scope="col" 
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.booking_type}</td>
                        <td
                          key={pay.paymentid} 
                          scope="col" 
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.deposit_amount}</td>
                        <td 
                          key={pay.paymentid}
                          scope="col"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.total_payment}</td>
                        
                        <td>
                          {renderPayButton(pay)}
                          {/* <button 
                            className="bg-navy-blue text-purity p-3 ml-3 font-normal rounded-lg  hover:ring-marble-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue f ocus:text-rescue-orange" 
                            //onClick={() => deleteBooking(book.bookingid)}
                            >Pay</button> */}
                        
                        </td>
                        
                        {/* <td> <UserEditBooking pay={pay} /> </td> */}
                        {/* <td><button className="btn btn-danger" onClick={() => deleteBooking(book.bookingid)}>Pay</button></td> */}
                    </tr>
                

                ))}
                </tbody>
              </table>
              </div>
            </div>
            
        ) : (
            <></>
        )}
    </div>
   
  )
}

export default GuestTransactions