import React, { Fragment }from "react"
import { Link, NavLink } from 'react-router-dom'
import { useAuth2 } from "./AuthContextUser"

//className="flex h-screen w-[250px] flex-col bg-purity pt-5"


const UserSideBar = ({ userName }) => {
  const { userIsLoggedIn, userLogout } = useAuth2()

  const handleLogout = () => {
    userLogout()
    //navigate('/')
  }


  return (
    <div className="flex h-screen w-[250px] left-0">
    {userIsLoggedIn ? (
      <div className="bg-purity">
        <ul className="flex w-full flex-col gap-3 px-3">
          <li>
            <Link
              to="/userdashboard"
              href=""
              className="flex items-center justify-start gap-2 rounded-full bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 ring-offset-2 ring-offset-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/userpayment"
              href=""
              className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Payment
            </Link>
          </li>
        </ul>
        <div className="mt-auto border-t border-slate-800 px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                className="rounded-full h-full w-full"
                src="https://picsum.photos/200"
              />
            </div>
            <div>
              <p className="text-sm text-marble-blue">{`${userName}`}</p>
              <p>
                    <a
                        href=""
                        onClick={handleLogout} 
                        className="text-rescue-orange mr-4 hover:underline md:mr-6">
                        Logout
                    </a>
                </p>
            </div>
          </div>
        </div>
        
      </div> 
    ) : (
      <></>
    ) }
    </div>
  );
};

export default UserSideBar;
