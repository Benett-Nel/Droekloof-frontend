// @ts-nocheck
// import Component from the react module
import React from "react";
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { useAtom } from "jotai"; 
import { userAtom, profileMenuAtom, navMenuAtom } from "../App";
import { HiMenu } from "react-icons/hi";
import NavDropdown from "./navDropdown";
import ProfileDropdown from "./profileDropdown";


function NavBar() {

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

    function toggleNavPopup() {
        if (navMenuPopup === 'hidden') {
            setNavMenuPopup('block');
        } else {
            setNavMenuPopup('hidden');
        }
    }

    return (
        
            <nav 
                id="navbar"
                className="w-full lg:h-16 h-fit z-20 block lg:inline-flex  bg-transparent px-6">

                <div className="flex items-center flex-shrink flex-grow text-black mr-6 absolute lg:top-2">
                    
                    <span className="font-semibold text-3xl lg:text-4xl tracking-tight">Droëkloof</span>
                    <span className="invisible lg:visible ml-3 mb-0 pt-1 lg:pt-4 lg:text-lg relative bottom-0 align-text-bottom font-semibold text-base tracking-tight">Karoo Resort and Olive Estate</span>
                </div>

                <div className="hidden w-full lg:inline-flex lg:absolute right-0 mr-6 lg:w-auto lg:mt-2">
                    
                    <a exact="true" href="/" className="nav-item">
                        <FaHome className="relative top-1"  size={28}/>
                    </a>
                    <a exact="true" href="/activities" className="nav-item pt-1">
                    Activities
                    </a>

                    {(loggedUser === 'none') ?
                    <a exact="true" href="/login" className="nav-item pt-1">
                        Log in
                    </a> 
                    : <>
                        <button className="nav-item absolute top-0 right-0"
                        onClick={() => toggleProfilePopup()}>
                            <FaUserCircle size={30} /> 
                        </button> 
                        <ProfileDropdown />
                    </>}

                    <a exact="true" href="/book" 
                    className='nav-button'>
                        Book Now
                    </a>
                    
                </div>

                <div className="lg:hidden w-full inline-flex lg:absolute right-0 mr-6 lg:w-auto lg:mt-2 mt-2">
                    <button className="nav-item absolute top-0 right-0"
                    onClick={() => {
                            toggleNavPopup();
                            if (profileMenuPopup === 'block') {
                                setProfileMenuPopup('hidden');
                            }
                        }}
                    >
                        <HiMenu size={30} /> 
                    </button> 
                    <NavDropdown />
                </div>

            </nav>
        
    )
}

export default NavBar;