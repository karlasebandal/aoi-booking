import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [isFullyBooked, setIsFullyBooked] = useState(false);

  const currentDate = new Date();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchBookingData = async () => {

    try {
      const response = await axios.get(
        `http://localhost:5000/countNumGuestsPerDate`
      );
      const data = response.data;         
      setBookingData(data);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Find the data entry for the selectedFormattedDate
      const selectedFormattedDate = selectedDate.toISOString().split('T')[0];

     
      
      bookingData.forEach((item) => {
        
        if(item.formattedbookingdate == selectedFormattedDate){
            console.log(`same date`)
        }else{
            console.log(`else`)
        }
      });

    //   const selectedDataEntry = bookingData.find(
    //     (item) => item.formattedBookingDate === selectedFormattedDate
    //     );
      


    //   if (selectedDataEntry) {
    //     const totalNumGuests = selectedDataEntry.totalNumGuests;
    //     if (totalNumGuests >= 43) {
    //       setIsFullyBooked(true);
    //     } else {
    //       setIsFullyBooked(false);
    //     }
    //   }
    }
  }, [selectedDate]);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        disabled={isFullyBooked}
        minDate={currentDate}
      />
      {isFullyBooked && <h3>This date is fully booked.</h3>}
    </div>
  );
};

export default MyDatePicker;
