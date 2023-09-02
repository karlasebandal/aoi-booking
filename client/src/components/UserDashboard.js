import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const UserDashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div class="mt-20 flex h-screen w-[250px] flex-col bg-purity pt-10">
      {username ? (
        <div class="bg-purity">
          <ul class="flex w-full flex-col gap-3 px-3">
            <li>
              <a href="" class="flex items-center justify-start gap-2 rounded-full bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 ring-offset-2 ring-offset-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Dashboard</a>
            </li>
            <li>
              <a href="" class="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Feed</a>
            </li>
          </ul>
          <div class="mt-auto border-t border-slate-800 px-2 py-2">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 overflow-hidden rounded-full">
                <img class="rounded-full h-full w-full" src="https://picsum.photos/200" />
              </div>
              <div>
                <p class="text-sm text-marble-blue">{`${username}`}</p>
                <p class="text-xs text-slate-400">creator</p>
              </div>
              {/* <button x-data="{shown:true}" class="relative ml-auto flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-800">
                <div x-show="shown" x-transition class="absolute bottom-7 left-0 z-10 mt-2 w-48 rounded-lg  bg-slate-950 text-left text-sm shadow-lg">
                  <div class="p-1">
                    <a href="#" class="flex w-full items-center rounded-md px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-slate-100"> Dashboard </a>
                    <a href="#" class="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-slate-100"> Settings </a>
                    <a href="#" class="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-slate-100"> Help </a>
                    <a href="#" class="flex w-full items-center rounded-md px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-slate-100"> Log out </a>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white lucide lucide-more-horizontal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
