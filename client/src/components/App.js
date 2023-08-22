import React from "react"
import '../assets/styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//navbar access
import NavBar from './NavBar'
import About from "./About"
import Contact from "./Contact"
import Services from "./Services"

//main access
import HomePage from '../pages/HomePage'
import RopeAccess from '../pages/RopeAccess'
import WhiteWaterRafting from '../pages/WhiteWaterRafting'

//footer access
import Footer from './Footer'
import UserLogin from "./UserLogin" //Admin
import UserRegistration from "./UserRegistration" //AOI Registration
import GuestLogin from "./GuestLogin" //Guest
import UserDashboard from "./UserDashboard"
import GuestDashboard from "./GuestDashboard"
import GuestRegistration from "./GuestRegistration"

function App() {
  return (

  <Router>
    <div className="flex flex-col mx-auto">
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/admin" element={<UserLogin />} />
          <Route path="/login" element={<GuestLogin />} />
          <Route path="/uregistration" element={<UserRegistration />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/guestregistration" element={<GuestRegistration />} />
          <Route path="/guestdashboard" element={<GuestDashboard />} />

          <Route path="/ropeaccess" element={<RopeAccess />} />
          <Route path="/whitewaterrafting" element={<WhiteWaterRafting />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </Router>
  );
}

export default App;

