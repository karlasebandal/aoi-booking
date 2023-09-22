
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { format, parseISO } from "date-fns"; // Import date-fns functions

const MyDatePicker = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [isFullyBooked, setIsFullyBooked] = useState(false);

  const currentDate = new Date();

  const handleDateChange = (date) => {
    console.log('handleselect-date-child', date)
    console.log('handleselect-fullybooked-child', isFullyBooked)
    setSelectedDate(date);

    if (onDateSelect) {
      onDateSelect(date, isFullyBooked);
    }
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
      // Format the selected date using date-fns
      const selectedFormattedDate = format(selectedDate, "yyyy-MM-dd");

      const fullyBooked = bookingData.some(
        (item) =>
          item.formattedbookingdate === selectedFormattedDate &&
          item.totalnumguests >= 43
      );
      console.log('useeffect-child', fullyBooked)
      setIsFullyBooked(fullyBooked);

      if (fullyBooked) {
        setFullyBookedDates([selectedDate]);
        setIsFullyBooked(true)
      } else {
        setFullyBookedDates([]);
        setIsFullyBooked(false)
      }
    }
  }, [selectedDate]);



  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        //excludeDates={fullyBookedDates.map((date) => new Date(date))}
        minDate={currentDate}
      />
      {isFullyBooked && <h3>This date is fully booked.</h3>}
    </div>
  );
};

export default MyDatePicker;
