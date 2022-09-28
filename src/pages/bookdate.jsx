// @ts-nocheck
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React from 'react';
import { useState } from 'react';
import Slideshow  from '../components/carousel'
import Popup from '../components/popup.jsx';

// use jotai atoms to manage state and make use of local storage to use state bariable in other page as well
// the local storage is necesarry because atom resets when page is refreshed, unless it has storage
import { useAtom } from 'jotai';

//atom containing info about currently logged in user, profile popup-menu and booking info 
import { userAtom, profileMenuAtom, bookingInfoAtom, navMenuAtom } from '../App';

// Calendar component //
//////              /////
import {
    add,
    differenceInDays,
    eachDayOfInterval,
    endOfMonth,
    format,
    formatDistance,
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

import { LeftArrowIcon, RightArrowIcon } from '../components/arrowIcons';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { directions, included, notIncluded } from '../assets/data/AddInfo.js';
import all_bookings from '../assets/data/bookings.js';

function BookingInfo(props) {

    const [additionalInfoTrigger, setAdditionalInfoTrigger] = useState(false);

    function AdditionalInfo(props) {

        if (props.text === "What's included") {
            var infoList = included.map(function(info){
                return <li>{info}</li>;
              })
        } else if (props.text === "You need to bring") {
            var infoList = notIncluded.map(function(info){
                return <li>{info}</li>;
              })
        } else if (props.text === "Directions") {
            var infoList = directions.map(function(info){
                return <li>{info}</li>;
              })
        }
        return (
            <ul 
                className='list-disc text-md ml-5'
            >
                {infoList}
            </ul>
        )
    }

    return (
        <div
            onClick={() => {setAdditionalInfoTrigger(!additionalInfoTrigger)}} 
            className='items-center inline-flex flex-col border-t mt-0 p-2 font-light border-gray-400 text-gray-500 hover:text-black hover:cursor-pointer mb-0 m-4 w-full'
        >
            <div
                className='items-center inline-flex flex-row font-light hover:text-black hover:cursor-pointer w-full'
            >
                {additionalInfoTrigger ? <HiOutlineMinus size={20} className=' m-1 mr-4'/> : <HiOutlinePlus size={20} className=' m-1 mr-4'/>}
                <span className=' text-lg '>
                    {props.text}
                </span>
            </div>
            <div className='block w-full lg:ml-20 ml-8'>
                {additionalInfoTrigger && <AdditionalInfo text={props.text}/>}
            </div>
        </div>
    )
}

function DateSelect(props) { 
    
    const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    const [stayBookings, setStayBookings] = useState([])

    window.onload = function() {
        /* Set style classes to disable background blur when bookdate page is rendered*/
        document.getElementById('navbar').className = 'backdrop-blur-none h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
        
        // find bookings for the current stay //
        let currentBookings = [];
        for (var i = 0; i < all_bookings.length; i++) {
            let booking = all_bookings[i];
            booking.check_in = new Date(booking.check_in)
            booking.check_out = new Date(booking.check_out)
            if (booking.stay === stayName) {
                currentBookings.push(booking);
            } 
        }
        setStayBookings(currentBookings)

        // Initialize booking info atom when booking selection page is loaded
        setBookingInfo({});
    };

    const [loggedUser, _] = useAtom(userAtom);

    const stayName = props.name;

    const [popupTrigger, setPopupTrigger] = useState(false);
    const [infoPopup, setInfoPopup] = useState(false);


    const [checkIn, setCheckIn] = useState('none');
    const [checkOut, setCheckOut] = useState('none');
    const [pickDate, setPickDate] = useState('checkin');
    const [firstBookedDayAfterCheckin, setFirstBookedDayAfterCheckin] = useState('none');
    const [firstBookedDayBeforeCheckOut, setFirstBookedDayBeforeCheckOut] = useState('none');

    const [stayDuration, setStayDuration] = useState(0);

    const [numGuests, setNumGuests] = useState(props.info.capacity);
    const [numRooms, setNumRooms] = useState(Math.round(props.info.capacity/2));

    const today = startOfToday()
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    


    ///// Calendar Component ////////////////////////
    // I used a calendar component from a youtuber's open github repo
    // he copied the calendar component from tailwindui components after consulting them
    // 
    // I added all onClick and onHover events
    // I added functionality to setFocus on checkout after checkin is selected
    // I added the disabling logic of booked dates and dates where checkin and checkout would surround booked dates
    // Added the bg style functionality to make the selected stay dates seem highlighted and following the cursor with onHover events
    // I also changed the currentMonth to the month selected for checkin so that the calendar will automatically show the month 
    // with the checkin in when choosin chekcout
    //
    //The rendering of the number buttons in the respective weekday collumns however is work done by the tailwindui component creators
    /////////////////////////////////////////////////
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    };
      
    function Calendar() {

        let [selectedDay, setSelectedDay] = useState(today)
        
        let [hoveringDay, setHoveringDay] = useState(checkIn)

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
                setCurrentMonth(format(day, 'MMM-yyyy'))

                setFirstBookedDayAfterCheckin('none');
                //find first booked day after selected checkin
                for (var i = 0; i < stayBookings.length; i++) {
                    let booking = stayBookings[i];
                    if (isAfter(booking.check_in, day)) {
                        setFirstBookedDayAfterCheckin(booking.check_in);
                        break;
                    }
                }

                if (isAfter(day, checkOut)) {
                    console.log('check in after check out')
                    //check in cannot be after checkout, thus let user pick checkout again
                    setCheckOut('none');
                    document.querySelector('#checkout').value = '';
                    setPickDate('checkout');
                } else if (isBefore(day, firstBookedDayBeforeCheckOut)) {
                    console.log('check in before other existing booking');
                    //check in cannot be before other booking while checkout is after other booking, thus let user pick checkout again
                    setCheckOut('none');
                    document.querySelector('#checkout').value = '';
                    setPickDate('checkout');
                } else {
                    if (checkOut === 'none') {
                        setPickDate('checkout');
                    } else {
                        //After Checkin and Checkout date is selected, show stay and cost info
                        setPopupTrigger(false);

                        setStayDuration(differenceInDays(checkOut, day));
                        setInfoPopup(true);
                    }
                }
            } else {
                // set Check Out Day
                
                setCheckOut(day);
                
                
                document.querySelector('#checkout').value = format(day, 'dd MMM yyyy');

                setFirstBookedDayBeforeCheckOut('none');
                //search bookings in descending order to find first booking before selected checkout
                for (var i = stayBookings.length -1; i >= 0; i--) {
                    let abooking = stayBookings[i];
                    if (isBefore(abooking.check_out, day)) {
                        setFirstBookedDayBeforeCheckOut(abooking.check_out);
                        break;
                    }
                }

                if (checkIn === 'none') {
                    setPickDate('checkin');
                } else {
                    //After Checkin and Checkout date is selected, show stay and cost info
                    setPopupTrigger(false);
                    setStayDuration(differenceInDays(day, checkIn));
                    setInfoPopup(true);
                }

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
                        {days.map((day, dayIdx) => {
                            
                            let bBooked = false;
                            let bBookCheckin = false;
                            let bInvalid = false;
                            //set bBooked true if day is already booked to disable day button
                            for (var i = 0; i < stayBookings.length; i++) {
                                let booking = stayBookings[i];
                                if (isAfter(day, booking.check_in) && isBefore(day, booking.check_out)) {
                                    bBooked = true;
                                    break;
                                }
                                //check in day of other booking. Thus only available for picking checkout.
                                if (isEqual(day, booking.check_in)) {
                                    bBookCheckin = true;
                                    break;
                                }

                            }

                            return (
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

                                        //make all booked days red
                                        (bBooked || ((bBookCheckin) && (pickDate === 'checkin'))) && 'text-red-400',

                                        //gray out all days before check in ONLY IF user is busy selecting checkout
                                        // ((isBefore(day, selectedDay) || isBefore(day, checkIn)) && (pickDate === 'checkout') ) && 'text-gray-400',

                                        !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                                isSameMonth(day, firstDayCurrentMonth) &&
                                                    'text-gray-900',
                                        !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                                !isSameMonth(day, firstDayCurrentMonth) &&
                                                    'text-gray-400',

                                        // highlight all days between and including hover and selected check in date ONLY IF selecting check out 
                                        // if it is already booked make bg-light-gray instead
                                        // unless there are other bookings between day and selected checkin day
                                        ( (((isAfter(day, checkIn) && (isBefore(day, hoveringDay))) || (isEqual(day, checkIn) || isEqual(day, hoveringDay))) && (pickDate === 'checkout')) && (bBooked === false) && ((isAfter(day, firstBookedDayAfterCheckin)) === false ))  &&
                                            'bg-gray-900 text-white ',
                                        // highlight all days between and including hover and selected check out date ONLY IF selecting check in 
                                        // unless it is already booked 
                                        ( (((isBefore(day, checkOut) && (isAfter(day, hoveringDay))) || (isEqual(day, checkOut) || isEqual(day, hoveringDay))) && (bBookCheckin === false) && (pickDate === 'checkin')) && (bBooked === false)) &&
                                            'bg-gray-900 text-white ',

                                        
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',

                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                                    )}

                                
                                    // disable all day before current day and disable all ON or BEFORE selected check in ONLY IF user is busy selecting check out
                                    //also disable all booked days
                                    // when selecting checkin disable other guests checkin daybut when selecting checkout, other guests checkin days are available
                                    // thus one guest can checkout on sam day as other guest checkin
                                    // if checkin is already selected disable all days after the first booked day after checkin
                                    // if checkout is already selected disable all days before the first booked day before checkout
                                    //this is to prevent bookings on top of other bookings

                                    disabled={(((isBefore(day, today) || ((isBefore(day, checkIn) || isEqual(day, checkIn)) || (isAfter(day, firstBookedDayAfterCheckin))) && (pickDate === 'checkout')))) || (bBooked) || ((bBookCheckin) && (pickDate === 'checkin')) }
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                    </time>
                                </button>
                
                                </div>
                            )    
                        })}
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

    function handleGuestChange(event) {
        const guests = event.target.value;
        if ((guests <= props.info.capacity) && (guests > 0)) {
            setNumGuests(guests);
            // Change num rooms as necessary
            if (numRooms*2 < guests) {
                setNumRooms(Math.round(guests/2));
            }
            if (numRooms > guests) {
                setNumRooms(guests);
            }
        }
    }

    function handleRoomChange(event) {
        const rooms = event.target.value;
        if ((rooms <= props.info.capacity/2) && (rooms > 0)) {
            setNumRooms(rooms);
            // Change num guests as necessary
            if (rooms*2 < numGuests) {
                setNumGuests(Math.round(rooms*2));
            }

            if (rooms > numGuests) {
                setNumGuests(rooms);
            }
        } 
    } 

    const confirmBooking = async () => {
        setBookingInfo({
            "stay": stayName,
            "checkIn": format(checkIn, 'dd MMM yyyy'),
            "checkOut": format(checkOut, 'dd MMM yyyy'),
            "people": numGuests,
            "rooms": numRooms,
            "cost": props.info.price * stayDuration,
        })

        console.log(loggedUser)
        if (loggedUser !== 'none') {
            window.location.assign("/checkout");    
        } else {
            window.location.assign("/signup");
        }
        
    }

    

    return (
        <Parallax pages={1}
            className='bg-gray-100'
            onClick={() => {
                if (profileMenuPopup === 'block') {
                    setProfileMenuPopup('hidden');
                }

                if (navMenuPopup === 'block') {
                    setNavMenuPopup('hidden');
                }
            }}
        >

            <ParallaxLayer
                offset={0.1}
                factor={0.9}
                className='z-0 overflow-scroll'
            >
                {/* <div className='w-full text-center font-mono font-semibold text-4xl mb-10'>Booking Summary</div> */}
                <div className='lg:w-3/4 w-full h-fit absolute lg:left-[15%] lg:inline-flex pb-8 pr-8 lg:flex-row flex-col'>

                    <div className='w-full lg:w-[65%] h-fit backdrop-blur-none left-0 lg:mr-8 mr-4 ml-4 mt-0 lg:ml-0 rounded-xl bg-gray-50 shadow-md shadow-gray-200 lg:mb-3'>
                        
                        
                        <div className='overflow-hidden rounded-t-xl '>
                            <Slideshow photos={props.photos}/>
                        </div>
                            
                        <div className='pr-8'>
                            <h2 className=' m-5 mb-1 md:text-3xl text-2xl font-mono font-semibold'>{stayName}</h2>

                            <div className='ml-4 mb-4'>
                                <ul className='list-disc text-md ml-5'>
                                    <li>R{`${props.info.price}`} per night</li>
                                    <li>Up to {`${props.info.capacity}`} Guests</li>
                                    <li>3 Rooms</li>
                                    <li>2 Double beds and 2 Single beds</li>
                                    <li>Ensuite Bathroom in Every room</li>
                                    <li>Outdoor Shower built into rock face</li>
                                    <li>Fresh Water Swimming Dam</li>
                                </ul>
                            </div>

                            <BookingInfo text="What's included"/>

                            <BookingInfo text="You need to bring"/>

                            <BookingInfo text="Directions"/>

                            <div className='border-gray-400 border-t h-2 w-full mx-4' />

                        </div>

                    </div> 

                    <div className='min-h-fit w-full lg:w-[30%] lg:ml-8 lg:mr-0 mx-4 mt-6 lg:mb-3 lg:mt-0 inline-block rounded-xl bg-gray-50 shadow-md shadow-gray-200'>
                        <img
                            className=' aspect-auto w-full rounded-t-xl' 
                            src="images/farm-generic/farm.jpg" 
                            alt='mountain photo'
                        />
                        
                        <h4
                            className='text-2xl lg:text-xl font-semibold m-3'
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
                                <input disabled id="checkin" name="checkin" type="text" className="hover:cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 p-2.5 pr-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select check-in"/>
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
                                <input disabled id="checkout" name="checkout" type="text" className="hover:cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 p-2.5 pr-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select check-out"/>
                            </div>
                        </div>

                        {/* number of guests selector */}
                        <div>
                            <label className='ml-2'>Num. of Guests:</label>
                            <input id='numGuests' type={"number"} min="1" max="6" className="bg-slate-400 rounded-md m-3 w-1/2 h-8" value={numGuests} onChange={(e) => handleGuestChange(e)} ></input>
                        </div>

                        {/* number of Rooms selector */}
                        <div>
                            <label className='ml-2'>Num. of Rooms:</label>
                            <input type={"number"} min="1" max="3" className="bg-slate-400 rounded-md m-3 w-1/2 h-8" value={numRooms} onChange={(e) => handleRoomChange(e)}></input>
                        </div>

                        
                            <div className='mt-2 w-full flex flex-col items-center justify-center backdrop-blur-md'>
                                <div className='h-fit w-fit rounded-xl bg-slate-100'>
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
                        

                        
                        {/* booking info div */}
                        <Popup trigger={infoPopup}>
                            <div className='m-2 border-b border-gray-300'>{stayName} from {(checkIn !== 'none') ? <span className='font-semibold'>{format(checkIn, 'dd MMM yyyy')}</span> : 'TBD'} to {(checkOut !== 'none') ? <span className='font-semibold'>{format(checkOut, 'dd MMM yyyy')}</span> : 'TBD'}.</div>
                            <div className='m-2 border-b border-gray-300'><span className='font-semibold'>{stayDuration}</span> night stay for <span className='font-semibold'>{numGuests}</span> people</div>
                            <div className="m-2 border-b border-gray-300">Price per Person Per Night: <span className='font-semibold float-right mr-3'>R {props.info.price / numGuests}</span></div>
                            <div className="m-2 border-b border-gray-300">Total Price Per Night: <span className='font-semibold float-right mr-3'>R {props.info.price}</span></div>
                            <div className="m-2 border-b border-gray-300">Total Price: <span className='font-semibold float-right mr-3'>R {props.info.price * stayDuration}</span></div>
                        
                            <div>
                                <button onClick={confirmBooking} className='rounded-lg px-2 py-1 m-2 text-lg bg-blue-500 text-white hover:border-2 hover:border-blue-500' >Checkout </button>
                                
                            </div>
                        </Popup>
                        
                    </div>

                    
                
                </div>
            </ParallaxLayer>
        </Parallax>
    )
}

export default DateSelect;