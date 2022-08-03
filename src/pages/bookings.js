// import Component from the react module
import React, { Component } from "react";
import { images_swartskaap, info_swartskaap } from '../assets/data/swartskaap'
import Slideshow from "../components/carousel";
import { ParallaxLayer } from '@react-spring/parallax';

function StaySummary(props) {
    return (
        <div 
            id={props.name}
            className='h-fit relative border-y border-black md:w-1/3 w-full'
        >
            <div className="border-black inline-flex">
                <h2 className='m-5 text-4xl md:text-2xl font-mono flex font-semibold'>{props.name}</h2>
                <button className="z-40 border rounded-md h-fit w-fit py-2 px-4 absolute top-0 right-0 m-4 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white" >Select</button>
            </div>
            
            <Slideshow photos={props.photos}/>
            <div>
                <ul className='text-black list-disc ml-10 font-mono text-lg'>
                    { props.info.map((line, index) =>
                        <li key={index}
                            className='my-2'
                        >
                            {line}
                        </li>
                    ) }
                </ul>
            </div>
        </div>
    )
}

class StaySelect extends Component {

	render() {
        window.onload = function() {
            /* Set style classes to enable background blur when activity page is rendered*/
            document.getElementById('navbar').className = 'lg:backdrop-blur-sm backdrop-blur-none h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
            /* prevent backdrop blur from title div that causes backdrop blur on home page for stays */
            document.getElementById('title_div').className = 'invisible'
        }
        return (
            <ParallaxLayer
                offset={0.1}
                factor={3.8}
                className='z-50'
            >
                <div className="block text-center lg:text-5xl text-2xl font-semibold border-t border-black p-5">Pick Your Stay</div>
                <div className="w-screen md:inline-flex ">
                    
                    {/* swartskaap */}
                    <StaySummary name='Swartskaap' photos={images_swartskaap.photos} info={info_swartskaap} />


                    {/* TBD */}
                    <StaySummary name='TBD' photos={images_swartskaap.photos} info={info_swartskaap}/>


                    {/* oudehuis */}
                    <StaySummary name='OudehuisKloof' photos={images_swartskaap.photos} info={info_swartskaap}/>

                </div>
            </ParallaxLayer>
        )
    }
}

export default StaySelect;