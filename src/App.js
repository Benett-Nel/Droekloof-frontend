import "./App.css";
 
// import Component from the react module
import React, { Component } from "react";
import axios from 'axios';
import  NavBar from './components/navbar.js';
import  Home  from './pages/home.js';
import Activities from './pages/activities';
import StaySelect from "./pages/bookings";
import DateSelect from './pages/bookdate';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { images_swartskaap, info_swartskaap } from "./assets/data/swartskaap";

class App extends Component {

	render() {
		return(

			<div className="w-screen h-screen inline-flex">
				<div 
					className="lg:backdrop-blur-sm z-50 block bg-transparent sticky will-change-transform w-full h-16 "
				>
					<NavBar />
				</div>
	
					<BrowserRouter>		
						<Routes className='z-50'>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/activities" element={<Activities />} />
							<Route exact path="/book" element={<StaySelect />} className='z-50'/>
							<Route exact path="/book/Swartskaap" element={<DateSelect name='Swartskaap' photos={images_swartskaap.photos} info={info_swartskaap}/>} />
						</Routes>
					</BrowserRouter>		
				
			</div>
		);
	}
}

export default App;