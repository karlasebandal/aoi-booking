import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const GuestRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAdd: '',
        contactNum: '',
        pass: ''
      })
    const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        await axios.post('http://localhost:5000/Guest', formData)
        alert('You have successfully registered.');
        navigate('/')
    } catch (error) {
        console.error(error);
        alert('Email address is already in use.');
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target; // Fixed destructuring here
    setFormData({
        ...formData,
        [name]: value,
    })
}
    
  return (
    <div className="container mx-auto">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-16 rounded shadow-2xl w-2/3">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Create Your Account
          </h2>

          {/* {message ? (
  <div>
  <p className="text-rescue-orange">You have successfuly registered.</p>
  </div>
  ) : (
    <div>
    
    </div>
  )} */}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-bold text-gray-500">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                name="emailAdd"
                className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500">Contact Number</label>
              <input
                type="text"
                name="contactNum"
                className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="pass"
                className="w-full border-2 border-purity p-3 rounded outline-none focus:border-marble-blue"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                className="accent-rescue-orange"
              />
              <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">
                I agree to the terms and privacy.
              </label>
            </div>

            <button
              className="block w-full bg-rescue-orange hover:bg-navy-blue hover:from-red-100 hover:to-blue-400 p-4 rounded text-gray-700 hover:text-gray-600 transition duration-300 font-bold text-sm"
              type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GuestRegistration