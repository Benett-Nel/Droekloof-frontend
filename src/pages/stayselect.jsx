// @ts-nocheck
// import Component from the react module
import React from "react";
import { info_swartskaap } from '../assets/data/swartskaap'
import Slideshow from "../components/carousel";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { navMenuAtom, profileMenuAtom } from "../App";
import { useAtom } from 'jotai';
 
// import Images from the assets folder
import swartskaap_images from "../assets/images/swartskaap";
import forty_images from "../assets/images/1945";
import oudehuis_images from "../assets/images/oudehuis";

function StaySummary(props) {

    return (
        <div 
            id={props.name}
            className='h-fit relative rounded-xl md:m-4 bg-white shadow-xl md:w-1/3 w-full'
        >
            <div className="inline-flex">
                <h2 className='m-5 md:text-4xl text-2xl font-mono flex font-semibold'>{props.name}</h2>
                <a 
                    className="z-40 border rounded-md h-fit w-fit py-2 px-4 absolute top-0 right-0 m-4 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white" 
                    href={`/${props.name}`}
                >
                    Select
                </a>
            </div>
            
            <Slideshow photos={props.photos} aspect='3/2' delay={1000000}/>
            <div>
                <ul className='text-black list-disc ml-10 font-mono text-lg'>
                    { props.info.info_list.map((line, index) =>
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

function StaySelect() {

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    window.onload = function() {
        /* Set style classes to enable background blur when activity page is rendered*/
        document.getElementById('navbar').className = 'lg:backdrop-blur-sm backdrop-blur-none h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
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
                <div className="mt-10 lg:mt-0 block text-center lg:text-5xl text-2xl font-semibold pb-4 ">Pick Your Stay</div>
                <div className="w-screen md:inline-flex ">
                    
                    {/* swartskaap */}
                    <StaySummary name='Swartskaap' photos={swartskaap_images} info={info_swartskaap} />


                    {/* TBD */}
                    <StaySummary name='1945' photos={forty_images} info={info_swartskaap}/>


                    {/* oudehuis */}
                    <StaySummary name='OudehuisKloof' photos={oudehuis_images} info={info_swartskaap}/>

                </div>
            </ParallaxLayer>
        </Parallax>
    )
}

export default StaySelect;