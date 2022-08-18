import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React, {Component} from 'react';
import { useState } from 'react';
import { hike1 } from '../assets/images/index.js';
import Calendar from '../components/calendar.jsx';
import Slideshow  from '../components/carousel'
import Popup from '../components/popup.jsx';
//TODO: what is flowbite and why is it here

function DateSelect(props) {
    window.onload = function() {
        /* Set style classes to enable background blur when bookdate page is rendered*/
            // @ts-ignore
            document.getElementById('navbar').className = 'lg:backdrop-blur-sm backdrop-blur-none h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
     }

     const [popupTrigger, setPopupTrigger] = useState(false);

    return (
        <Parallax pages={1}
            className='snap-proximity snap-y overflow-y-scroll bg-gray-100'
        >

            {/* @ts-ignore */}
            <Popup trigger={popupTrigger} >
                <Calendar />
            </Popup>

            <ParallaxLayer
                offset={0.1}
                factor={0.9}
                className='z-0 overflow-y-scroll'
            >
                <div className='w-full text-center font-mono font-semibold text-4xl mb-10'>Booking Summary</div>
                <div className='w-3/4 h-full absolute left-[15%] inline-flex '>

                    <div className='w-full lg:w-[65%] left-0 m-8 mt-0 ml-0 rounded-xl bg-white'>
                        
                        
                        <div className='overflow-hidden rounded-t-xl '>
                            <Slideshow photos={props.photos}/>
                        </div>
                            
                        
                        <h2 className=' m-5 md:text-3xl text-2xl font-mono font-semibold'>{props.name}</h2>

                        <div>
                            <p>From R{`${props.info.price}`} per night</p>
                            <p>Up to {`${props.info.capacity}`} Guests</p>
                        </div>
                         
                    </div> 

                    <div className='w-full lg:w-[30%] m-8 mt-0 inline-block rounded-xl bg-white'>
                        <img
                            className='aspect-video w-full rounded-t-xl' 
                            src={hike1} 
                            alt='mountain photo'
                        />
                        
                        <h4>Select Dates</h4>
                        
                        <div date-rangepicker="" className="flex items-center">
                            <div className="relative"
                                onClick={() => setPopupTrigger(true)}
                            >
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date start"/>
                            </div>
                            <span className="mx-4 text-gray-500">to</span>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date end"/>
                            </div>
                        </div>

                    </div>
                
                </div>
            </ParallaxLayer>
        </Parallax>
    )
}

export default DateSelect;