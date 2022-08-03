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

class App extends Component {

	render() {
		return(
			<BrowserRouter>
				<Parallax pages={4}
					className='lg:snap-proximity lg:snap-y overflow-y-scroll bg-green-50'
				>
					<ParallaxLayer 
						offset={0} 
						factor={0.1} 
						sticky={{ start: 0, end: 4 }}
						className='z-40'
            		>
						<NavBar />
					</ParallaxLayer>	

					<ParallaxLayer
						offset={1}
						factor={0.1}
						sticky={{ start: 1, end: 4 }}
						className="snap-start z-20"
					>
						<div className="backdrop-blur-sm w-screen p-5 h-12 text-center text-3xl inline-block text-black font-semibold"
							id="title_div"
						>
						</div>
					</ParallaxLayer>

				
						
					<Routes className='z-50'>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/activities" element={<Activities />} />
						<Route exact path="/book" element={<StaySelect />} className='z-50'/>
						<Route exact path="/book/swartskaap" element={<DateSelect name='swartskaap'/>} />
					</Routes>
						
					
						
				</Parallax>
			</BrowserRouter>
		);
	}
}

export default App;