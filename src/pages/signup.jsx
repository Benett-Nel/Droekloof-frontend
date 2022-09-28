// @ts-nocheck
import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useState } from 'react';
import Slideshow from '../components/carousel';
import swartskaap_images from '../assets/images/swartskaap';
import axios from 'axios';
 
import { useAtom } from 'jotai';
import {navMenuAtom, profileMenuAtom, userAtom} from '../App';

function Signup(props) {

    // declare state to dynamically change the input boxes shown to user and initially set it to props
    const [hasAccount, setHasAccount] = useState(props.hasAccount);

    const [_, setLoggedUser] = useAtom(userAtom);

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    const [popupMessage, setPopupMessage] = useState('After you have signed up you can use your email address to view your confirmed bookings.');

    const [popupBackground, setPopupBackground] = useState('bg-blue-400');

    const api = axios.create({
        baseURL: "http://localhost:8000/api/"
    })

    const handleSubmit = async (event) => {

        // TODO: auth for inputs

        event.preventDefault();
        const email = event.target.email.value;
            
        let bFound = false;
        
        // axios request gets array of all users, then loop through returned array to find username(email) entered
        const response = await api.get('guests/')
        const users = response.data;
        console.log(users)

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.username === email) {
                console.log('user found')
                console.log(user)
                // user already has account, do not create a duplicate
                bFound = true;
                
                // log user in and confirm booking
                setLoggedUser(user);
                if (props.loginReason === 'create') {
                    window.location.assign("/book/checkout");
                } else if (props.loginReason === 'view') {
                    window.location.assign("/viewbookings");
                }

                break;
            } 
        };

        if (bFound === false) {
            console.log('user not found');

            if (hasAccount) {
                // user trying to log in but account with that username does not exist yet, first or last name is required
                setPopupMessage('You do not have an account with that username yet, please enter first or last name to create one');
                setPopupTrigger(true);
                setPopupBackground('bg-red-400');
                setHasAccount(false);
            } else {
                // only set values when input boxes for names actually exist
                const first_name = event.target.first_name.value;
                const last_name = event.target.last_name.value;  

                // user does not have account, check necessary fields are filled and create account now
                // only one of names are required, only if both are empty should user be propmted to try again
                if (first_name === '' && last_name === '') {
                    setPopupMessage('Please enter First Name or Last Name');
                    setPopupTrigger(true);
                    setPopupBackground('bg-red-400');

                } else {
                    const new_user = await api.post('guests/', {
                        username: email,
                        first_name: first_name,
                        last_name: last_name, }
                    )
                    console.log(new_user);
                    // log user in and confirm booking
                    setLoggedUser(new_user);
                    
                    if (props.loginReason === 'create') {
                        window.location.assign("/book/checkout");
                    } else if (props.loginReason === 'view') {
                        window.location.assign("/viewbookings");
                    }
                }
            }

            
        };
    };

    const [popupTrigger, setPopupTrigger] = useState(true);

    return (

        <Parallax pages={1}
            className='snap-proximity snap-y overflow-y-scroll '
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
                className="snap-start"
            >
                <div className="top-0 h-screen w-screen "
                >
                    <img
                        className='aspect-video h-full w-full' 
                        src={swartskaap_images[1]} 
                        alt='mountain photo'
                    />
                </div>
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.1}
                factor={0.9}
                className='z-0 overflow-y-scroll'
            >
                <div
                    onClick={() => setPopupTrigger(false)} 
                    className='h-full w-full flex items-center justify-center bg-transparent'
                >
                     
                    <div className=' w-1/4 items-center justify-center block rounded-3xl bg-transparent'>
                        <div className='w-full text-center font-mono font-semibold text-4xl mb-10 mt-4 text-slate-200'>{hasAccount ? "Log In" : "Sign Up"}</div>  
                        
                        <div className='items-center justify-center block'>
                            <form className="block" onSubmit={handleSubmit}>

                                {(hasAccount === false) ?
                                    <>
                                        <div className='w-full flex items-center justify-center my-6 '>
                                            <input className='rounded-2xl lg:text-xl py-2 px-4' placeholder='First Name' type="text" name='first_name'/>
                                        </div>
                                            
                                        <div className='w-full flex items-center justify-center my-6 '>
                                            <input className='rounded-2xl lg:text-xl py-2 px-4' placeholder='Last Name' type="text" name='last_name'/>
                                        </div> 
                                    </> : ""
                                }
                                

                                <div className='w-full flex items-center justify-center my-6 '>
                                    <input className='rounded-2xl lg:text-xl py-2 px-4' placeholder='Email' type="text" name='email'/>
                                </div>

                                <div className='w-full flex items-center justify-center my-6 lg:text-xl'>
                                    <input className="rounded-2xl bg-blue-400 text-white px-4 py-2 hover:cursor-pointer hover:border-2 hover:border-blue-400 hover:rounded-xl hover:py-1 hover:mb-1" type="submit" value="Sign Up" />
                                </div>

                            </form>

                            <div className='w-full flex items-center justify-center my-6 '>
                                <button 
                                    className='text-slate-200 text-lg text-center mt-2' 
                                    onClick={() => setHasAccount(!hasAccount)}
                                >
                                    {hasAccount ? "Don't have an account yet" : "Already have an account"}
                                </button>
                            </div>
                            
                        </div>                        
                    </div>

                    {popupTrigger ? 
                        <div
                            className={`absolute bottom-0 w-full text-center font-semibold ${popupBackground} rounded-md text-lg py-1 text-white`}
                        >
                            {popupMessage} 
                        </div>  
                        : "" 
                    }
                    
                </div>
            </ParallaxLayer>  
        </Parallax>
    )
}

export default Signup;