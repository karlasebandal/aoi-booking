import React, { useState } from "react"
import axios from "axios"

import UserSideBar from "./UserSideBar"

const UserEditBooking = ({ handleCloseModal, onSave, editedStatus, setEditedStatus, bookingIdToEdit }) => {


  const handleSave = () => {
    onSave(bookingIdToEdit, editedStatus); // Pass the bookingId and editedStatus to the onSave function
    handleCloseModal(); // Close the modal
  };
 

  return (

    <>
        <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div >
                  <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                    
                    <div className="mt-2 w-full">
                      <h3>Edit Status for Booking ID: {bookingIdToEdit}</h3>
                      
                      <form className="space-y-5">
                        <div>
                          <label className="block mb-1 font-bold text-gray-500">
                            Status
                          </label>
                          <select 
                             value={editedStatus}
                             onChange={(e) => setEditedStatus(e.target.value)}>
                                <option value="Completed">Completed</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Postponed">Postponed</option>
                                <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  className="block ml-5 bg-rescue-orange hover:bg-navy-blue hover:from-red-100 hover:to-blue-400 p-4 rounded text-gray-700 hover:text-gray-600 transition duration-300 font-bold text-sm"
                  onClick={handleSave}
                  type="submit">
                  Save
                </button>

                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="block w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>

            
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserEditBooking