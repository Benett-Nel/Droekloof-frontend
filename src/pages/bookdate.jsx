// @ts-nocheck
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React, {Component} from 'react';
import { useState } from 'react';
import { hike1 } from '../assets/images/index.js';
//import Calendar from '../components/calendar.jsx';
import Slideshow  from '../components/carousel'
import Popup from '../components/popup.jsx';
//TODO: what is flowbite and why is it here


// Calendar component //
//////              /////
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isAfter,
    isBefore,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
  } from 'date-fns'
  //import React, { useState } from 'react'
  import { LeftArrowIcon, RightArrowIcon } from '../components/arrowIcons'
import { addDays } from 'date-fns/esm';
  
  

function DateSelect(props) {
    window.onload = function() {
        /* Set style classes to enable background blur when bookdate page is rendered*/
            // @ts-ignore
            document.getElementById('navbar').className = 'lg:backdrop-blur-sm backdrop-blur-none h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
     }

    const [popupTrigger, setPopupTrigger] = useState(false);

    let [checkIn, setCheckIn] = useState('none');
    let [checkOut, setCheckOut] = useState('none');
    let [pickDate, setPickDate] = useState('checkin');

    ///// Calendar Component
    /////////////////////////////////////////////////
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    };
      
      function Calendar() {
          let today = startOfToday()
          let [selectedDay, setSelectedDay] = useState(today)
          let [hoveringDay, setHoveringDay] = useState(checkIn)
          
          let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
          let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
        
          let days = eachDayOfInterval({
            start: firstDayCurrentMonth,
            end: endOfMonth(firstDayCurrentMonth),
          })
        
          function previousMonth() {
            let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
            setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
          }
        
          function nextMonth() {
            let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
            setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
          }
        
        
        function handleDaySelect(day) {

            setSelectedDay(day);
            if (pickDate === 'checkin') {
                // set Check In day
                setCheckIn(day);
                document.querySelector('#checkin').value = format(day, 'dd MMM yyyy');

                if (isAfter(day, checkOut)) {
                    console.log('check in after check out')
                    //check in cannot be after checkout, thus let user pick checkout again
                    setCheckOut('none')
                    setPickDate('checkout');
                } else {
                    if (checkOut === 'none') {
                        setPickDate('checkout');
                    } else {
                        setPopupTrigger(false);
                    }
                }
            } else {
                // set Check Out Day
                setCheckOut(day);
                setPopupTrigger(false);
                document.querySelector('#checkout').value = format(day, 'dd MMM yyyy');
            }
          
        }

        function handleHoverSelect(day) {
            if (pickDate === 'checkin') {
                // set Hovering day for highlight purposes ONLY IF date is valid
                if ((isAfter(day, today) || isEqual(day, today)) && ((isBefore(day, checkOut)) || (checkOut === 'none'))) {
                    setHoveringDay(day);
                    document.querySelector('#checkin').value = format(day, 'dd MMM yyyy');
                }
            } else {
                // set Hovering Day for highlight purposes ONLY IF date is valid
                if ((isAfter(day, today) || isEqual(day, today)) && (isAfter(day, checkIn))) {
                    setHoveringDay(day);
                    document.querySelector('#checkout').value = format(day, 'dd MMM yyyy');
                }
            }
               
          
        };
      
          return (
            <div className=" h-full w-full ">
              <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className=" ">
                  <div className="">
                    <div className="flex items-center">
                      <h2 className="flex-auto font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, 'MMMM yyyy')}
                      </h2>
                      <button
                        type="button"
                        onClick={previousMonth}
                        className="calendar_arrow"
                      >
                        <span className="sr-only">Previous month</span>
                        <LeftArrowIcon  height="12" width="20"/>
                      </button>
                      <button
                        onClick={nextMonth}
                        type="button"
                        className="calendar_arrow"
                      >
                        <span className="sr-only">Next month</span>
                        <RightArrowIcon height="12" width="20"/>
                      </button>
                      
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                      <div>S</div>
                      <div>M</div>
                      <div>T</div>
                      <div>W</div>
                      <div>T</div>
                      <div>F</div>
                      <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                      {days.map((day, dayIdx) => (
                        <div
                          key={day.toString()}
                          className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            'py-1.5'
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => handleDaySelect(day)}
                            onMouseOver={() => handleHoverSelect(day)}
                            className={classNames(

                                //gray out all days before today
                                isBefore(day, today) && 'text-gray-400',

                                //gray out all days before check in ONLY IF user is busy selecting checkout
                                ((isBefore(day, selectedDay) || isBefore(day, checkIn)) && (pickDate === 'checkout') ) && 'text-gray-400',

                                !isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                        'text-red-500',
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',

                                // highlight all days between and including hover and selected check in date ONLY IF selecting check out
                                ( ((isAfter(day, checkIn) && (isBefore(day, hoveringDay))) || (isEqual(day, checkIn) || isEqual(day, hoveringDay))) && (pickDate === 'checkout'))  &&
                                    'bg-gray-900 text-white ',
                                // highlight all days between and including hover and selected check out date ONLY IF selecting check in
                                ( ((isBefore(day, checkOut) && (isAfter(day, hoveringDay))) || (isEqual(day, checkOut) || isEqual(day, hoveringDay))) && (pickDate === 'checkin')) &&
                                    'bg-gray-900 text-white ',
                                
                                //highlight all days between check in and check out
                                // (isAfter(day, checkIn) && isBefore(day, checkOut)) &&
                                //     'bg-gray-900 text-white', 

                                
                                (isEqual(day, selectedDay) || isToday(day)) &&
                                    'font-semibold',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                            )}
                            // disable all day before current day and disable all ON or BEFORE selected check in ONLY IF user is busy selecting check out
                            disabled={(isBefore(day, today)) || ((isBefore(day, checkIn) || isEqual(day, checkIn)) && (pickDate === 'checkout')) }
                          >
                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                              {format(day, 'd')}
                            </time>
                          </button>
        
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      
        let colStartClasses = [
          '',
          'col-start-2',
          'col-start-3',
          'col-start-4',
          'col-start-5',
          'col-start-6',
          'col-start-7',
        ]
    
    ///////         ///////////////
    // end of Calendar Component //

    function handleCheckInBoxClick() {
        setPickDate('checkin');
        setPopupTrigger(true);
    }

    function handleCheckOutBoxClick() {
        setPickDate('checkout');
        setPopupTrigger(true);
    }


    return (
        <Parallax pages={1}
            className='snap-proximity snap-y overflow-y-scroll bg-gray-100'
        >

            {/* @ts-ignore */}
            {/* <Popup trigger={popupTrigger} >
                <button
                    className='float-right inline-block text-sm lg:text-md px-2 py-1 leading-none
                    rounded text-gray-400 bg-gray-600 
                    hover:text-white  m-2  hover:font-semibold' 
                    onClick={() => setPopupTrigger(false)}
                >
                    Close
                </button>
                <Calendar />
            </Popup> */}

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
                        
                        <h4
                            className='text-xl font-semibold m-3'
                        >
                            Select Dates
                        </h4>
                        
                        {/* Date-Range Picker Input Boxes */}
                        <div date-rangepicker="" className="flex items-center">
                            {/* Check In selector */}
                            <div className="relative ml-2"
                                onClick={() => handleCheckInBoxClick()}
                            >
                                <div className="flex absolute inset-y-0 left-0 items-center pl-1 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input id="checkin" name="checkin" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 p-2.5 pr-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select check-in"/>
                            </div>

                            <span className="mx-4 text-gray-500">to</span>

                            {/* Check Out Selector */}
                            <div 
                                className="relative mr-2 "
                                onClick={() => handleCheckOutBoxClick()}
                            >
                                <div className="flex absolute inset-y-0 left-0 items-center pl-1 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input id="checkout" name="checkout" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 p-2.5 pr-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select check-out"/>
                            </div>
                        </div>

                        {/* Calendar to pop up */}
                        <Popup trigger={popupTrigger} >
                            <button
                                className='float-right inline-block text-sm lg:text-md px-2 py-1 leading-none
                                rounded text-gray-400 bg-gray-600 
                                hover:text-white  m-2  hover:font-semibold' 
                                onClick={() => setPopupTrigger(false)}
                            >
                                Close
                            </button>
                            <Calendar />
                        </Popup >
                    </div>
                
                </div>
            </ParallaxLayer>
        </Parallax>
    )
}

export default DateSelect;