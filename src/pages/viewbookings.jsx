// @ts-nocheck
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import axios from 'axios'
import { useAtom } from 'jotai'
import React, { PureComponent } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { navMenuAtom, profileMenuAtom, userAtom } from '../App'
import { images_swartskaap, info_swartskaap } from '../assets/data/swartskaap'

function Viewbookings() {

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    let bookings = [{
        checkin: 'N/A',
        checkout: 'N/A',
        guests: 0,
        stay: 'You do not have any bookings'
    }]

    const api = axios.create({
        baseURL: "http://localhost:8000/"
    })

   
    
    // const bookings = await getBookings();
    

    function Bookings() {

        async function getBookings() {
            // axios request gets array of all users, then loop through returned array to find username(email) entered
            const response = await api.get(`findbookings/${loggedUser.username}`)
            bookings = (response.data.bookings);
        }

        getBookings()
        .then(() => {
            if (bookings === 'no bookings') {
                const newBooking = document.createElement('div');
                newBooking.className = 'w-full lg:w-[80%] m-4 bg-gray-50 rounded-xl shadow-sm shadow-gray-400 h-20 text-center justify-center text-xl p-4';
                newBooking.innerHTML = 'You have no current bookings'
                document.getElementById('bookings-container').appendChild(newBooking);
            } else {
                for (let i = 0; i < bookings.length; i++) {
                    const newBooking = document.createElement('div');
                    newBooking.className = 'w-full lg:w-[80%] m-4 bg-gray-50 rounded-xl shadow-sm shadow-gray-400 h-auto';
                    
                    const bookingHeader = document.createElement('h1');
                    bookingHeader.innerHTML = bookings[i].stay;
                    bookingHeader.className = 'm-1 ml-4 text-2xl font-bold ';
                    newBooking.appendChild(bookingHeader) 

                    const bookingCheckIn = document.createElement('div');
                    bookingCheckIn.innerHTML = `Check In: ${bookings[i].checkin}`;
                    bookingCheckIn.className = 'm-1 ml-4 text-lg ';
                    newBooking.appendChild(bookingCheckIn)
                    
                    const bookingCheckOut = document.createElement('div');
                    bookingCheckOut.innerHTML = `Check Out: ${bookings[i].checkout}`;
                    bookingCheckOut.className = 'm-1 ml-4 text-lg ';
                    newBooking.appendChild(bookingCheckOut)
                    
                    const bookingPeople = document.createElement('div');
                    bookingPeople.innerHTML = `${bookings[i].guests} people`;
                    bookingPeople.className = 'm-1 ml-4 text-lg ';
                    newBooking.appendChild(bookingPeople)

                    document.getElementById('bookings-container').appendChild(newBooking);
                }
            }
        })
    

        return (
            <div id='bookings-container'
                className='w-screen flex items-center justify-center flex-col'
            ></div>
        )
    }
            

    return (
        <Parallax pages={1}
            className='snap-proximity snap-y overflow-y-scroll bg-gray-100'
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
                className='z-50 overflow-y-scroll'
            >
                <div className="mt-0 block text-center lg:text-5xl text-2xl font-semibold border-t border-b border-black p-5">Your Bookings</div>
                <Bookings />
            </ParallaxLayer>
        </Parallax>
    )
}

export default Viewbookings