// @ts-nocheck
import "./App.css";
 
// import Component from the react module
import React, { Component } from "react";
import axios from 'axios';
import  NavBar from './components/navbar.jsx';
import  Home from './pages/home.jsx';
import Activities from './pages/activities';
import StaySelect from "./pages/stayselect";
import DateSelect from './pages/bookdate';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { info_swartskaap } from "./assets/data/swartskaap";
import Signup from "./pages/signup";
import Checkout from "./pages/checkout";

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Viewbookings from "./pages/viewbookings";
import Thanks from "./pages/thanks";
import NoMatch from "./pages/noMatch";
import swartskaap_images from "./assets/images/swartskaap";


export const userAtom = atomWithStorage('loggedUser', 'none');
export const profileMenuAtom = atom('hidden');
export const navMenuAtom = atom('hidden');
export const bookingInfoAtom = atomWithStorage('bookingInfo', {});

function App() {

	return(

		<div className="w-screen h-screen inline-flex">
			<div 
				id="nav-container"
				className="lg:backdrop-blur-sm z-50 block bg-transparent sticky will-change-transform w-full lg:h-16 h-12"
			>
				<NavBar />
			</div>


			<BrowserRouter>		
				<Routes >
					<Route exact path="/" element={<Home />} />
					<Route exact path="/signup" element={<Signup hasAccount={false} loginReason="create"/>} />
					<Route exact path="/login" element={<Signup hasAccount={true} loginReason="view"/>} />
					<Route exact path="/activities" element={<Activities />} />
					<Route exact path="/book" element={<StaySelect />} className='z-50'/>
					<Route exact path="/Swartskaap" element={<DateSelect name='Swartskaap' photos={swartskaap_images} info={info_swartskaap}/>} />
					<Route exact path="/checkout" element={<Checkout />} />
					<Route exact path="/viewbookings" element={<Viewbookings />} />
					<Route  exact path="/thanks" element={<Thanks />} />
					<Route path="*" element={<NoMatch />} status={404}/>
				</Routes>
			</BrowserRouter>		
			
		</div>
	);
}

export default App;