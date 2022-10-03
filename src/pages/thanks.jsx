import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useAtom } from 'jotai';
import React from 'react'
import { navMenuAtom, profileMenuAtom } from '../App';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function Thanks() {

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

  return (
    <Parallax pages={4}
        className=' bg-slate-100'
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
            offset={0}
            factor={1}
        >
            <div className="top-0 h-screen flex flex-col w-screen items-center justify-center">
                <h1 className='text-4xl'>Thanks!</h1>
                <BsFillCheckCircleFill size={100} color={'green'} className="m-4"/>
                <div className='text-2xl'>
                    Your payment was succesful and your booking is confirmed.
                </div>
                <button
                    onClick={() => {window.location.assign('/viewbookings')}} 
                    className="m-8 border-2 border-gray-500 hover:border-gray-900 rounded-lg py-2 px-3 text-lg text-gray-500 hover:brightness-75 hover:text-gray-900">
                    View Booking
                </button>
            </div>
        </ParallaxLayer>
    </Parallax>
  )
}

export default Thanks