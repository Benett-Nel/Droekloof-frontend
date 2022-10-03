import { useAtom } from "jotai";
import React from "react";
// @ts-ignore
import { FaHome, FaUserCircle } from "react-icons/fa";
import { navMenuAtom, profileMenuAtom, userAtom } from "../App";
import ProfileDropdown from "./profileDropdown";



function NavDropdown() {
    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);

    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);


    function toggleProfilePopup() {
        if (profileMenuPopup === 'hidden') {
            setProfileMenuPopup('block');
        } else {
            setProfileMenuPopup('hidden');
        }
    }

    function handleSignout() {
        setLoggedUser('none');
        window.location.assign('/');
    }

  return (
    <div className={`dropdown top-14 right-24 ${navMenuPopup}`}>
                    
        <a 
// @ts-ignore
        exact="true" href="/" className="nav-item">
            <FaHome className="relative top-1"  size={28}/>
        </a>
        <a 
        // @ts-ignore
        exact="true" href="/activities" className="nav-item pt-1">
        Activities
        </a>

        <a 
        // @ts-ignore
        exact="true" href="/book" 
        className='nav-button'>
            Book Now
        </a>

        {(loggedUser === 'none') ?
        <a 
        // @ts-ignore
        exact="true" href="/login" className="nav-item pt-1">
            Log in
        </a> 
        : <>
            <button className="nav-item "
            onClick={() => toggleProfilePopup()}>
                <FaUserCircle size={30} /> 
            </button> 
            <ProfileDropdown />
        </>}

    </div> 
  )
}

export default NavDropdown;