//import libraries and framework
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import DatePicker from "react-datepicker"
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

//import images
import ropeAccessImg from '../assets/images/rope-access1.jpg'
import ropeAccessImg2 from '../assets/images/rope-access2.jpg'

//import components
import { useAuth } from '../components/AuthContext'
import GuestLogin from '../components/GuestLogin';

const RopeAccess = () => {
  const location = useLocation()
 // const history = useHistory()
  const [meetingDate, setMeetingDate] = useState(new Date())
  const [meetingTime, setMeetingTime] = useState("")
  const [bookingType, setBookingType] = useState("")
  const { isLoggedIn, guestDetails } = useAuth()
  //const { isLoggedIn } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  //service id number in url bar
  const queryParams = new URLSearchParams(location.search)
  const serviceID = queryParams.get("serviceID") //to get the service ID *ill handle this later
  console.log(`${serviceID}`)

  //When Book button is clicked
  const handleBooking = async () => {
          
      try {
      // Create the booking data
      const formattedDate = meetingDate.toISOString().split("T")[0];
      const newBooking = {
        bookingcreated: new Date().toISOString(),
        status: "Pending",
        bookingtype: bookingType,
        serviceid: serviceid,
        guestid: parseInt(guestDetails.guestid), // check on this 
        bookingdate: formattedDate,
        bookingtime: meetingTime,
      }

      // Send the data to the backend API
      await axios.post("http://localhost:5000/Booking", newBooking)
      
      // Handle success
      alert("Booking created successfully")
    } catch (error) { 
      // Handle error
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking");
    }
  }

  const toggleLoginModal = () => { //pop-ups login modal
    if (!isLoggedIn) { // Check if the guest is authenticated
      setIsLoginModalOpen(true) //pops up login form
      alert("Please log in to continue booking.")
      console.log("is not logged in yet")
      return
    }

    setIsLoginModalOpen(!isLoginModalOpen);
  }

  const handleLogin = async (username, password) => {
    // Perform login API request
    try {
      // Assuming the response contains guest details
      const response = await axios.get(`http://localhost:5000/Guest/login`, { username, password });

      // Update isLoggedIn and guestDetails
      isLoggedIn(true)
      guestDetails(response.data.guestDetails);

      // Close the login modal after successful login
      handleCloseModal()
    } catch (error) {
      // Handle login error
    }
  }

  //for the login modal
  const handleCloseModal = () => {
    setIsLoginModalOpen(false)
  }

  // Add event listener to handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal()
      }
    };

    window.addEventListener("keydown", handleKeyDown)

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div class="container mx-auto m-20">
      <div>
        <img src={ropeAccessImg2} class="static rounded-xl" alt="Rafting" />
      </div>

      <div>
        <div className="items-center text-xl mt-5 font-header sm:top-1/2">
          Rope Access Services
          <p>Service ID: {serviceID} </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Intro Here */}
          <div class="col-span-12">
            <div class="flex justify-center text-xl">
              <div className="items-center text-md drop-shadow-xl sm:top-1/2">
                Rope access technicians are professionals who use specialized
                techniques and equipment to access difficult-to-reach areas,
                such as tall buildings, bridges, towers, and offshore
                structures, for maintenance, repair, inspection, or installation
                work.
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
              onClick={() => setBookingType("Online")}
              value="Online" >
              Online
            </button>

            <button
              class="bg-rescue-orange text-navy-blue mr-3 p-3 mb-2 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              onClick={() => setBookingType("Face to Face")}
              value="Face to Face">
              Face to Face
            </button>

            <button
              class="bg-rescue-orange text-navy-blue mr-3 p-3 mb-2 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              onClick={() => setBookingType("Phone Call")}
              value="Phone Call">
              Phone Call
            </button>

            <p class="my-3 w-4/12">Select Date</p>
            <DatePicker
              className="flex mr-3 rounded-md"
              selected={meetingDate}
              onChange={(date) => setMeetingDate(date)} />

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

            {isLoggedIn ? (
              <button
                onClick={handleBooking}
                className="bg-rescue-orange text-navy-blue p-3 mb-5 font-normal rounded-lg hover:ring-navy-blue" >
                Book
              </button>
            ) : (
              <button
                onClick={toggleLoginModal} //set to true
                className="bg-rescue-orange text-navy-blue p-3 mb-5 font-normal rounded-lg hover:ring-navy-blue">
                Book
              </button>
            )}

            {/* ... login modal ... */}

            {isLoginModalOpen && ( //opens modal
              <GuestLogin onLogin={handleLogin} closeModal={toggleLoginModal}/> //sets to false
            )}


          </div>
        </div>
      </div>
    </div>
  
  );
}

export default RopeAccess