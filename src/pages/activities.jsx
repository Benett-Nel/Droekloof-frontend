// @ts-nocheck
// import Component from the react module
import React from "react";
import Slideshow from "../components/carousel";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { activities } from "../assets/data/activities";

import { useAtom } from 'jotai';
import { navMenuAtom, profileMenuAtom } from "../App";
import useWindowDimensions from "../functions/windowsize";

function Activity(props) {

    // only alternate the side of info block and image block if screen is large
    // small screen => info block always on top followed by image
    const windowSize = useWindowDimensions();
    if ((props.side % 2 === 0) && (windowSize.width > 1024)) {
        /* render image block left and info block right */
        return (
            <div className='w-screen  border-t border-gray-400 flex flex-col lg:flex-row'>

                {/* image block */} 
                <div className="lg:w-1/2 w-full">
                    <Slideshow photos={props.activity.images} title={props.activity.title}/>
                </div>

                {/* info block */}
                <div className='lg:p-5 px-2 lg:w-1/2 w-full border-r border-gray-400'>
                    <h2 className='m-5 text-4xl font-mono font-semibold'>{props.activity.title}</h2>
                    <p>{props.activity.description}</p>
                </div>  

            </div>
        )
    } else {
        /* render info block left and image block right */
        return (
            <div className='w-screen  border-t border-gray-400 flex flex-col lg:flex-row'>

                {/* info block */}
                <div className='lg:p-5 px-2 lg:w-1/2 w-full border-r border-gray-400'>
                    <h2 className='m-5 lg:text-4xl text-2xl font-mono font-semibold'>{props.activity.title}</h2>
                    <p>{props.activity.description}</p>
                </div>  

                {/* image block */} 
                <div className="lg:w-1/2 w-full">
                    <Slideshow photos={props.activity.images} title={props.activity.title} delay={3000}/>
                </div>
            </div>
        )
    };

};

function Activities() {

    const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    window.onload = function() {
        /* Set style classes to enable background blur when activity page is rendered*/
        document.getElementById('navbar').className = 'lg:backdrop-blur-sm backdrop-blur-none h-16 z-20 flex  justify-between flex-wrap bg-inherit px-6';
    }

    return (
        <Parallax pages={1}
            className='snap-proximity snap-y overflow-y-scroll bg-slate-100'
            onClick={() => {if (profileMenuPopup === 'block') {
                    setProfileMenuPopup('hidden');
                }

                if (navMenuPopup === 'block') {
                    setNavMenuPopup('hidden');
                }
            }}
        >
            <ParallaxLayer
                offset={0.1}
                factor={1}
                className='z-0'
                >
                {/* Loop through activities[{}] and diplay an info and image block for each activity object*/}
                {activities.map((activity, index) =>
                    <Activity key={index} side={index+1} activity={activity}/>
                )}
                <hr className="w-screen border-gray-400"/>
            </ParallaxLayer>
        </Parallax>
    )
    
};

export default Activities;