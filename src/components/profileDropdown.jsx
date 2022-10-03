// @ts-nocheck
import { useAtom } from "jotai";
import React from "react";
import { profileMenuAtom, userAtom } from "../App";


function ProfileDropdown() {

    const [loggedUser, setLoggedUser] = useAtom(userAtom);
   
    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);

    function handleSignout() {
        setLoggedUser('none');
        window.location.assign('/');
    }

  return (
    <div className={`dropdown right-32 ${profileMenuPopup}`}>
        <span className="menu-item text-md font-semibold text-black">
            {loggedUser.username}
        </span>
        <button
            onClick={() => {window.location.assign('/viewbookings')}} 
            className="menu-item text-md text-gray-500 hover:brightness-75 hover:text-gray-600">
            My Bookings
        </button>
        <button
            onClick={handleSignout} 
            className="menu-item text-md text-red-400 hover:brightness-75 hover:text-red-500">
            Sign Out
        </button>
    </div> 
  )
}

export default ProfileDropdown;