import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DatePicker from "react-datepicker"

import raftingImg from '../assets/images/raft-photos/rafting-banner.JPG'

const RopeAccess = () => {
  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());  

  const queryParams = new URLSearchParams(location.search)
  const serviceID = queryParams.get('serviceID')

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  } 
//
const bgImg = {
  backgroundImage: 'url:({$ropeAccessImg})'
}
//class="flex flex-wrap items-center justify-between"
  return (
    <div class="container mx-auto m-20">
      <div>
        <img src={raftingImg} class="static rounded-xl" alt="Rafting" />
      </div>
    
      <div>
        <div className="items-center text-xl mt-5 font-header sm:top-1/2">
          White Water Rafting
        </div>
          
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Intro Here */}
          <div class="col-span-2">
            <div class="flex justify-center text-xl">
              <div className="items-center text-md drop-shadow-xl sm:top-1/2">
              A recreational water activity using inflatable rafts to navigate and ride the waves created by river rapids. Base Camp River Rafting
              is an adventure sport with inherent risk, equipped with experienced and well-trained guides, proper safety gear, and effective
              orientation. Creating an exhilarating and unforgettable adventure. Our river guides are Rescue3 Europe-certified Swiftwater
              Rescue Technicians.
              </div>
            </div>
          </div>

          {/* Booking Card - right panel*/}
          <div class="flex justify-center text-6xl border-gray-300 rounded-xl p-6 bg-gray-100">
              2
          </div> 
        </div>
      </div>

      <div>
        <div className="w-8/12 items-center text-sm my-5 font-header sm:top-1/2 rounded-xl p-6 bg-purity">
          {/* Booking Details */}
          <div className="items-center w-8/12 my-5">
          Package
          </div>
              
          <div class="w-8/12 my-3">
            <button class="bg-rescue-orange text-navy-blue p-5 mb-5 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange">
            Group Package
            </button>
          </div>

          <div class="w-8/12 h-12">
            <p class="my-5">Select an activity</p>
            <label></label>
            <DatePicker className="flex" selected={startDate} onChange={(date) => setStartDate(date)} />
            <button class="bg-rescue-orange text-navy-blue p-3 mb-5 font-normal rounded-lg  hover:ring-navy-blue active:bg-marble-blue focus:outline-none focus:ring focus:ring-marble-blue focus:bg-marble-blue focus:text-rescue-orange">
            Book
            </button>
          </div>

          
        </div>

        <div class="flex justify-center text-6xl border-gray-300 rounded-xl p-6 bg-gray-100">4</div>
      </div>
    
  </div>
  )
}

export default RopeAccess