//import libraries and framework
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DatePicker from "react-datepicker"
import axios from 'axios';

//import images
import ropeAccessImg from '../assets/images/rope-access1.jpg'
import ropeAccessImg2 from '../assets/images/rope-access2.jpg'

//import components
import { useAuth } from '../components/AuthContext'

const RopeAccess = () => {
  const location = useLocation()
  const { user } = useAuth()
  const [meetingDate, setMeetingDate] = useState(new Date())
  const [meetingTime, setMeetingTime] = useState('')
  const [bookingType, setBookingType] = useState('')
  const [formData, setFormData] = useState({
    bookingcreated: '',
    status: '',
    bookingtype: '',
    serviceid: 2,
    guestid: 2,
    bookingdate: null,
    bookingtime: ''
  })

  const queryParams = new URLSearchParams(location.search)
  const serviceID = queryParams.get('serviceID')

  //When Book button is clicked 
  //console.log(`${meetingDate} at ${meetingTime} via ${bookingType}`) //test
  const handleRedirect = async () => {
    try {
      // Check if the user is authenticated
      if (!user) {
        alert('Please log in to continue booking.');
        return;
      }

      // Create the booking data
      const formattedDate = meetingDate.toISOString().split('T')[0];
      const dataToSend = {
        bookingcreated: new Date().toISOString(),
        status: 'Pending',
        bookingtype: bookingType,
        serviceid: 2,
        guestid: user.guestId, // Adjust this to match your user data structure
        bookingdate: formattedDate,
        bookingtime: meetingTime,
      };

      // Send the data to the backend API
      await axios.post('http://localhost:5000/YourEndpoint', dataToSend);

      // Handle success
      alert('Booking created successfully');
    } catch (error) {
      // Handle error
      console.error('Error creating booking:', error);
      alert('An error occurred while creating the booking');
    }
  }

  return (
    
    <div class="container mx-auto m-20">
      <div>
        <img src={ropeAccessImg2} class="static rounded-xl" alt="Rafting" />
      </div>
      
      <div>
        <div className="items-center text-xl mt-5 font-header sm:top-1/2">
          Rope Access Services
        </div>
          
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Intro Here */}
          <div class="col-span-12">
            <div class="flex justify-center text-xl">
              <div className="items-center text-md drop-shadow-xl sm:top-1/2">
              Rope access technicians are professionals who use specialized techniques and equipment to access difficult-to-reach areas, such as tall buildings, bridges, towers, and offshore structures, for maintenance, repair, inspection, or installation work.
              </div>
            </div>
          </div>

          {/* Booking Card - right panel
          <div class="flex justify-center text-6xlrounded-xl p-6">
              
          </div> */}
        </div>
      </div>

      <div>
        <div className="items-center text-sm pl-3 pt-3 mt-5 font-header sm:top-1/2 rounded-xl bg-purity">
          {/* Booking Details */}
          

          <div class="w-12/12  pl-5">
            <p class="my-3 w-4/12">Select a meeting mode</p>

            <button 
              class="bg-rescue-orange text-navy-blue mr-3 p-3 mb-2 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              onClick={() => setBookingType('Online')}
              value="Online">
            Online
            </button>

            <button 
              class="bg-rescue-orange text-navy-blue mr-3 p-3 mb-2 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              onClick={() => setBookingType('Face to Face')}
              value="Face to Face">
            Face to Face
            </button>

            <button 
              class="bg-rescue-orange text-navy-blue mr-3 p-3 mb-2 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              onClick={() => setBookingType('Phone Call')} 
              value="Phone Call">
            Phone Call
            </button>
            
            <p class="my-3 w-4/12">Select Date</p>
            <DatePicker className="flex mr-3 rounded-md" selected={meetingDate} onChange={(date) => setMeetingDate(date)} />

            <p class="my-3 w-4/12">Select Time</p>

            <select 
              value={meetingTime}
              onChange={(event) => setMeetingTime(event.target.value)}
              id="meetingTime" 
              className="inline-flex justify-center rounded-md bg-purity px-3 mr-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50">

              <option value="#">Select Time</option>
              <option value="10:00 - 11:30 AM">10:00 - 11:30 AM</option>
              <option value="1:00 - 2:30 PM">1:00 - 2:30 PM</option>
              <option value="3:00 - 4:30 PM">3:00 - 4:30 PM</option>
              <option value="5:00 - 6:30 PM">5:00 - 6:30 PM</option>
            </select>
            
            <button onClick={handleRedirect} class="bg-rescue-orange text-navy-blue p-3 mb-5 font-normal rounded-lg  hover:ring-navy-blue">
            Book
            </button>
          </div>

          
        </div>
      </div>
        
  </div>
  )
}

export default RopeAccess