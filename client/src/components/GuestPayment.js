import React, { useState, useEffect, Fragment } from "react";
import { useAuth1 } from "./AuthContextGuest"

const GuestPayment = () => {
    const { userIsLoggedIn, userName } = useAuth1()
    const [payments, setPayments] = useState([])

    const getPayments = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/payment")
            const jsonData = await response.json();
            
            setPayments(jsonData);
    
        } catch (err) {
            console.error(err.message)
        }
    }

  return (
    
    <div className="container full-width mt-16">
        {userIsLoggedIn ? (
            <div className="flex flex-row">
                <UserSideBar userName={userName} />
                <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Booking ID</th>
                    <th scope="col" className="px-6 py-3">Deposited Amount</th>
                    <th scope="col" className="px-6 py-3">Total Payment</th>
                    <th scope="col" className="px-6 py-3">Voucher</th>
                  </tr>
                </thead>
                <tbody>
                    {payments.map(pay => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                        key={pay.paymentid}>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.bookingid}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.depositamount}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.totalpayment}</td>
                        <td scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pay.voucher}</td>
                        
                        {/* <td> <UserEditBooking pay={pay} /> </td> */}
                        <td><button className="btn btn-danger" onClick={() => deleteBooking(book.bookingid)}>Delete</button></td>
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

export default GuestPayment