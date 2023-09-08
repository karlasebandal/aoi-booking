import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  

  return (

    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-marble-blue md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38" fill="none">
                <path d="M13.4906 0H4.24714C1.90151 0 0 1.90151 0 4.24714V13.4906C0 15.8363 1.90151 17.7378 4.24714 17.7378H13.4906C15.8363 17.7378 17.7378 15.8363 17.7378 13.4906V4.24714C17.7378 1.90151 15.8363 0 13.4906 0Z" fill="#F0EFEF"/>
                <path d="M13.3833 20.2622H4.35451C1.94958 20.2622 0 22.2118 0 24.6167V33.6455C0 36.0504 1.94958 38 4.35451 38H13.3833C15.7882 38 17.7378 36.0504 17.7378 33.6455V24.6167C17.7378 22.2118 15.7882 20.2622 13.3833 20.2622Z" fill="#F0EFEF"/>
                <path d="M35.6116 0H32.8127C31.1807 0 29.8564 1.32425 29.8564 2.9563V20.2622H25.1846C22.7795 20.2622 20.8301 22.2116 20.8301 24.6167V33.6431C20.8301 36.0482 22.7795 37.9976 25.1846 37.9976H36.01C37.4226 37.9976 38.5655 36.8523 38.5655 35.4422V2.9563C38.5655 1.32425 37.2412 0 35.6092 0H35.6116Z" fill="#F0EFEF"/>
                <path d="M23.679 8.44182C24.4521 8.44182 25.1536 7.98132 25.4614 7.27028L27.4179 2.75113C27.9739 1.46983 27.0338 0.038208 25.6356 0.038208H23.9152C23.1422 0.038208 22.4407 0.498713 22.1329 1.20975L20.1763 5.7289C19.6204 7.0102 20.5605 8.44182 21.9587 8.44182H23.679Z" fill="#F0EFEF"/>
            </svg>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <Link to="/about" className="text-rescue-orange mr-4 hover:underline md:mr-6">About</Link>
            </li>

         
            
            
            <li>
                <Link to="/contact" className="text-rescue-orange hover:underline">Contact
                </Link>
            </li>
        </ul>
    </footer>


    // <div className="flex flex-wrap items-center justify-between">
    //     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
    //         <a href="#" className="flex items-center p-2">
    //         
    //         </a>
    //     </div>
        
    // </div>
  )
}

export default Footer