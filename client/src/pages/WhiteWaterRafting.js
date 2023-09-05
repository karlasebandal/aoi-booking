import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";

//import image(s)
import raftingImg from "../assets/images/raft-photos/rafting-banner.JPG";

//import components
import { useAuth } from "../components/AuthContext";
import GuestLogin from "../components/GuestLogin";

const RopeAccess = () => {
  const location = useLocation()
  const { isLoggedIn, guestId } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { serviceID } = location.state || {}

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [bookingData, setBookingData] = useState([])
  const [meetingTime, setMeetingTime] = useState("")
  const [numOfGuests, setNumOfGuests] = useState(5)

  const currentDate = new Date()

  const handleIncrement = () => {
    if (numOfGuests >= 5 && numOfGuests <= 42){
      setNumOfGuests(numOfGuests + 1)
    }else{
      alert('Minimum of 5 and maximum of 43 guests only per trip')
    }
  }

  const handleDecrement = () => {
    if (numOfGuests > 5){
      setNumOfGuests(numOfGuests - 1)
    }else{
      alert('Minimum of 5 guests')
    }
    
  }

  //When Book button is clicked
  const handleBooking = async () => {
    console.log(`Rafting Guest id: ${guestId}`);
    try {
      // Create the booking data
      const formattedDate = selectedDate.toISOString().split("T")[0]

      const newBooking = {
        bookingcreated: new Date().toISOString(),
        status: "Pending",
        bookingtype: "Face to Face",
        serviceid: serviceID,
        guestid: parseInt(guestId), // check on this
        bookingdate: formattedDate,
        bookingtime: meetingTime,
        numguests: parseInt(numOfGuests),
      }

      // Send the data to the backend API
      await axios.post("http://localhost:5000/Booking", newBooking);

      // Handle success
      alert("Booking created successfully");
    } catch (error) {
      // Handle error
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking");
    }
  };

  const toggleLoginModal = () => {
    //pop-ups login modal
    if (!isLoggedIn) {
      // Check if the guest is authenticated
      setIsLoginModalOpen(true); //pops up login form
      alert("Please log in to continue booking.")
      return;
    }

    setIsLoginModalOpen(!isLoginModalOpen)

  }

  const handleCloseModal = () => {
    setIsLoginModalOpen(false)
  }

    // Add event listener to handle Escape key press
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          handleCloseModal()
        }
      }
  
      window.addEventListener("keydown", handleKeyDown)
  
      // Clean up the event listener when component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [])


    useEffect(() => {
      axios
        .get(`http://localhost:5000/Booking/${serviceID}`)
        .then((response) => setBookingData(response.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [serviceID])

 //Date fullybooked
    const isDateFullyBooked = (date) => {
      const selectedDateBooking = bookingData.find((booking) => booking.date === date.toISOString().split('T')[0]);
      //console.log(selectedDateBooking)
      return selectedDateBooking && selectedDateBooking >= 43;
    } 
    
    //Handle Date Change
    const handleDateChange = (date) => {
      if (!isDateFullyBooked(date)) {
        setSelectedDate(date);
      }
    }


    const filterDate = (date) => {
      return isDateFullyBooked(date) || date < new Date();
    }

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Booking/${serviceID}`);
        setBookingData(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    }
    
  return (
    <div class="container mx-auto m-20">
      <div>
        <img src={raftingImg} class="static rounded-xl" alt="Rafting" />
      </div>

      <div>
        <div className="items-center text-xl mt-5 font-header sm:top-1/2">
          White Water Rafting
          <p>Service ID: {serviceID} </p>
          <p>User ID: {guestId} </p>
        </div>

        {isLoggedIn ? (
          <div>
            <p>Welcome!</p>
            <p>Guest ID: {guestId}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Intro Here */}
          <div class="col-span-2">
            <div class="flex justify-center text-xl">
              <div className="items-center text-md drop-shadow-xl sm:top-1/2">
                A recreational water activity using inflatable rafts to navigate
                and ride the waves created by river rapids. Base Camp River
                Rafting is an adventure sport with inherent risk, equipped with
                experienced and well-trained guides, proper safety gear, and
                effective orientation. Creating an exhilarating and
                unforgettable adventure. Our river guides are Rescue3
                Europe-certified Swiftwater Rescue Technicians.
              </div>
            </div>
          </div>

          {/* Booking Card - right panel*/}
          <div class="flex justify-center text-md border-gray-300 rounded-xl p-6 bg-gray-100">
            Rafting Inclusions and Other Details here
          </div>
        </div>
      </div>

      <div>
        <div className="w-8/12 items-center text-sm my-5 font-header sm:top-1/2 rounded-xl p-6 bg-purity">
          {/* Booking Details */}
          <div className="w-12/12 pl-5">
            <div className="items-center w-8/12 my-5">Number of Guest(s)</div>

            <div class="w-8/12 my-3">
              <div className="inline-flex justify-center align-middle">
                <button
                  onClick={handleIncrement}
                  class="bg-rescue-orange text-navy-blue p-3 mr-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
                >
                  +
                </button>
                <div>{numOfGuests}</div>
                <button
                  onClick={handleDecrement}
                  class="bg-rescue-orange text-navy-blue p-3 ml-3 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
                >
                  -
                </button>
              </div>
            </div>

            <p class="my-3">Select a date</p>
            <label></label>
            <DatePicker
              className="flex"
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={currentDate}
              filterDate={filterDate}
            />

            <p className="my-3 w-4/12">Select Time</p>
            <select
              value={meetingTime}
              onChange={(event) => setMeetingTime(event.target.value)}
              id="meetingTime"
              className="inline-flex justify-center rounded-md bg-purity px-3 mr-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
            >
              <option value="#">Select Time</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="1:00 PM" disabled>1:00 PM</option>
            </select>

            {isLoggedIn ? (
              <button
                onClick={handleBooking}
                class="bg-rescue-orange text-navy-blue p-3 mb-5 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              >
                Book
              </button>
            ) : (
              <button
                onClick={toggleLoginModal}
                class="bg-rescue-orange text-navy-blue p-3 mb-5 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange"
              >
                Book
              </button>
            )}

            {isLoginModalOpen && ( //opens modal
              <GuestLogin /> //sets to false
            )}

            {/* {selectedDate && (
              <p>Total Booked Guests for {selectedDate.toLocaleDateString()}: {bookingData.bookedGuests}</p>
            )} */}

          </div>
        </div>

        <div class="flex justify-center text-6xl border-gray-300 rounded-xl p-6 bg-gray-100">
          4
        </div>
      </div>
    </div>
  );
};

export default RopeAccess;
