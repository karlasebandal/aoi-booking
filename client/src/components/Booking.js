import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import bannerImg from '../assets/images/raft-photos/rafting-banner.JPG'

const Booking = () => {
  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());  

  const queryParams = new URLSearchParams(location.search)
  const serviceID = queryParams.get('serviceID')

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  } 

  return (
    <div className="grid grid-cols-1 h-screen w-full">

      <div className="max-w flex flex-col fixed w-full h-screen mx-auto justify-center">
        <img src={bannerImg} className="static" alt="Rafting" />

        <div className="flex flex-row items-center justify-between mx-auto m-10">
          <div>Name</div>
          <div>Name</div>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

          <div className="flex-row">
            <div className="basis-1/2">
                <h2 className="mb-10">Booking Page</h2>
                <p>Selected Service ID: {serviceID}</p>
                {serviceID && <p>Booking for Service ID: {serviceID}</p>}
            </div>
          </div>
        </div>  

      
      
      
      
      </div>
    </div>
  )
}

export default Booking