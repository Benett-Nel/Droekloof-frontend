// @ts-nocheck
import React from 'react'
import { useAtom } from 'jotai';
import { bookingInfoAtom, navMenuAtom, profileMenuAtom, userAtom } from '../App';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import axios from 'axios';
import { useState } from 'react';



// this page is for paying any bookings made
// use booking info atom to create a booking instance in the database with a post request
// booking will only be saved to databse after succesful payment is made
// this is why the atom with storage was used and post request was not instead made on DateSelect page

function Checkout() {

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);

    const [cardFormPopup, setCardFormPopup] = useState(false);

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    const formattedCost = bookingInfo.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // remove background blur from navabar
    window.addEventListener('load', () => {
        document.querySelector('#nav-container').className = 'lg:backdrop-blur-0 z-50 block bg-transparent sticky will-change-transform w-full h-16';
    })
    
    function showForm() {
        // create instance of YocoSDK and mount form into 'cardframe' div
        // Replace the supplied `publicKey` with your own.
        // Ensure that in production you use a production public_key.
        var sdk = new window['YocoSDK']({
            publicKey: 'pk_test_ed3c54a6gOol69qa7f45'
        });

        // Create a new dropin form instance
        var inline = sdk.inline({
            layout: 'basic',
            amountInCents: 2499,
            currency: 'ZAR'
        });
        console.log(inline)
        // this ID matches the id of the element we created earlier.
        inline.mount('#card-frame');
        // YocoSDK //


    // create payment token with Yoco's code when payment form is submitted
    // Run Yoco's code when form is submitted
        var form = document.getElementById('payment-form');
        
        
        form.addEventListener('submit', async function (event) {
            event.preventDefault()
            // Disable the button to prevent multiple clicks while processing
            var submitButton = document.getElementById('pay-button');
            submitButton.disabled = true;
            // This is the inline object we created earlier with the sdk
            inline.createToken().then(async function (result) {
                // Re-enable button now that request is complete
                // (i.e. on success, on error and when auth is cancelled)
                submitButton.disabled = false;
                if (result.error) {
                    const errorMessage = result.error.message;
                    errorMessage && alert("error occured: " + errorMessage);
                } else {
                    const token = result;
                    alert("card successfully tokenised: " + token.id);

                    // submit charge token to my own backend if it was succesful
                    const api = axios.create({
                        baseURL: "http://localhost:8000"
                    })

                    console.log(bookingInfo.checkIn)
                    const response =  await api.get('/pay/', { params:
                            {token: token.id,
                            username: loggedUser.username,
                            stay_name: bookingInfo.stay,
                            checkIn: bookingInfo.checkIn,
                            checkOut: bookingInfo.checkOut,
                            total_cost: bookingInfo.cost,
                            num_guests: bookingInfo.people,
                            num_rooms: bookingInfo.rooms,}
                        }
                    )

                    console.log(response)
                    console.log(response.data.status_code.status)
                    if (response.data.status_code.status === "successful") {
                        window.location.assign("/thanks");
                    } else {
                        alert("Error in Processing Payment. The transaction did not go through, check card info is correct or contact us for support.")
                        window.location.assign('/book/checkout')
                    }
                }
            }).catch(function (error) {
            // Re-enable button now that request is complete
            submitButton.disabled = false;
            alert("error occured: " + error);
            });
        
            
        });


        setCardFormPopup(true);
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

            
        <div className="top-0 absolute h-0 lg:h-40 w-screen bg-green-700 opacity-30" />
        
        <div className='hidden lg:block w-1/2 left-1/2 absolute top-28 text-black text-center font-mono font-semibold text-4xl mb-10'>Booking Summary</div>

            <ParallaxLayer
                offset={0}
                factor={1}
                className='z-0'
            >
                <div className='w-full h-full absolute top-40 bg-sky-100' />

                <div className='w-0 lg:w-[30%] h-full left-[20%] absolute top-0 mt-0 ml-0 '>
                    {/* large Portrait photo, height of screen */}
                    <img
                        className='aspect-video h-full w-full ' 
                        src='images/farm-generic/farm.jpg' 
                        alt='mountain photo'
                    />
                </div>
                

            </ParallaxLayer>

                <div className='w-full lg:w-[50%] h-full absolute top-0 lg:top-40 lg:left-[50%] inline-block pt-16 lg:pt-0 pb-8 pr-8 pl-8 bg-sky-100 '>
                   
                        <div className='lg:hidden w-full text-center font-mono font-semibold text-4xl mb-10'>Booking Summary</div>
                        
                        <div className='checkout_info'>
                            <span className='font-semibold '>Stay: </span>
                            <span className='float-right'>{bookingInfo.stay}</span>
                        </div>

                        <div className='checkout_info'>
                            <span className='font-semibold '>Check In: </span>
                            <span className='float-right'>{bookingInfo.checkIn}</span>
                        </div>
                            
                        <div className='checkout_info'>
                            <span className='font-semibold '>Check Out: </span>
                            <span className='float-right'>{bookingInfo.checkOut}</span>
                        </div>

                        <div className='checkout_info'>
                            <span className='font-semibold '>Number of Guests: </span>
                            <span className='float-right'>{bookingInfo.people}</span>
                        </div>

                        <div className='checkout_info'>
                            <span className='font-semibold '>Total Cost: </span>
                            <span className='float-right font-bold text-xl border border-gray-600 p-1 py-0 rounded'>R {formattedCost}</span>
                        </div>

                        {(cardFormPopup === false) && <div>
                            <button 
                                onClick={showForm} 
                                className='rounded-lg px-2 py-1 m-2 text-lg bg-blue-500 text-white hover:border-2 hover:border-blue-500' 
                            >
                                Make Payment
                            </button>
                                
                        </div>}
                        
                        
                        {/* Card input form from Yoco */}
                        <div className='p-2'>
                            <form id="payment-form" method="POST">
                                <div className="one-liner">
                                    <div id="card-frame">
                                    {/* Yoco Inline form will be added here */}
                                    </div>
                                    {cardFormPopup &&
                                    <button 
                                        id="pay-button"
                                        className='m-2 mt-4 float-right  border border-blue-400 text-blue-400 rounded-md p-2 hover:bg-blue-400 hover:text-white hover:font-semibold'
                                    >
                                        PAY ZAR {formattedCost}
                                    </button>}
                                </div>
                                <p className="success-payment-message" />
                            </form>
                        </div>
                </div>
            
        </Parallax>
  )
}

export default Checkout