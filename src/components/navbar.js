// import Component from the react module
import React from "react";
import { FaHome } from 'react-icons/fa';
import { ParallaxLayer } from "@react-spring/parallax";

function NavBar() {

    return (
                <nav 
                    id="navbar"
                    className=" h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6">
                    <div className="flex items-center flex-shrink flex-grow text-black mr-6">
                        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                        <span className="font-semibold text-3xl lg:text-4xl tracking-tight">Droëkloof</span>
                        <span className="ml-3 mb-0 pt-3 lg:pt-4 lg:text-lg relative bottom-0 align-text-bottom font-semibold text-base tracking-tight">Karoo Resort and Olive Estate</span>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:absolute right-0 mr-6 lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            <a exact="true" href="/" className="nav-item">
                                <FaHome className="relative top-1"  size={24}/>
                            </a>
                            <a exact="true" href="/activities" className="nav-item">
                            Activities
                            </a>
                        
                            <a exact="true" href="/book" 
                            className='nav-button'>
                                Book
                            </a>
                        </div>
                    </div>
                </nav>
    )
}

export default NavBar;