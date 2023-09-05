import React, { Fragment }from "react";

//class="flex h-screen w-[250px] flex-col bg-purity pt-5"


const UserSideBar = ({ username }) => {


  return (
    <div class="flex h-screen w-[250px] left-0">
      <div class="bg-purity">
        <ul class="flex w-full flex-col gap-3 px-3">
          <li>
            <a
              href=""
              class="flex items-center justify-start gap-2 rounded-full bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 ring-offset-2 ring-offset-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href=""
              class="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Feed
            </a>
          </li>
        </ul>
        <div class="mt-auto border-t border-slate-800 px-2 py-2">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 overflow-hidden rounded-full">
              <img
                class="rounded-full h-full w-full"
                src="https://picsum.photos/200"
              />
            </div>
            <div>
              <p class="text-sm text-marble-blue">{`${username}`}</p>
              <p class="text-xs text-slate-400">creator</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserSideBar;