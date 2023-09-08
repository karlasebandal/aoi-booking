import React from "react"
import '../assets/styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//import components
import { useAuth2 } from './AuthContextUser'
import { AuthProviderGuest } from './AuthContextGuest'
import { AuthProviderUser } from './AuthContextUser'

//navbar access
import NavBar from './NavBar'
import About from "./About"
import Contact from "./Contact"
import Services from "./Services"
import GuestLogin from "./GuestLogin" //Guest
import GuestDashboard from "./GuestDashboard"
import GuestRegistration from "./GuestRegistration"

//main access
import HomePage from '../pages/HomePage'
import RopeAccess from '../pages/RopeAccess'
import WhiteWaterRafting from '../pages/WhiteWaterRafting'

//footer access
import Footer from './Footer'

//admin access
import UserLogin from "./UserLogin" //Admin
import UserRegistration from "./UserRegistration" //AOI Registration
import UserDashboard from "./UserDashboard"
import Payment from "./Payment"

//for testing
//import TestLogin from '../for-testing/TestLogin'

function App() {
  const { userName } = useAuth2()

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
            <Route path="/guestregistration" element={<GuestRegistration />} />
            <Route path="/guestdashboard" element={<GuestDashboard />} />
            <Route path="/login" element={<GuestLogin />} />
          
            
         
            <Route path="/admin" element={<UserLogin />} />
            <Route path="/uregistration" element={<UserRegistration />} />
            <Route path="/userdashboard" element={<UserDashboard userName={userName}/>} />
            <Route path="/payment" element={<Payment />} />
          

            <Route path="/contact" element={<Contact />} />
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

