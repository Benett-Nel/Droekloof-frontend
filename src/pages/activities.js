// import Component from the react module
import React, { Component } from "react";
import Slideshow from "../components/carousel";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { activities } from "../assets/data/activities";

function Activity(props) {

    if (props.side % 2 === 0) {
        /* render image block left and info block right */
        return (
            <div className='w-screen  border-t border-gray-400 flex '>

                {/* image block */} 
                <div className="w-1/2">
                    <Slideshow photos={props.activity.photos} title={props.activity.title}/>
                </div>

                {/* info block */}
                <div className='p-5 w-1/2 border-r border-gray-400'>
                    <h2 className='m-5 text-4xl font-mono font-semibold'>{props.activity.title}</h2>
                    <p>{props.activity.description}</p>
                </div>  

            </div>
        )
    } else {
        /* render info block left and image block right */
        return (
            <div className='w-screen  border-t border-gray-400 flex flex-wrap'>

                {/* info block */}
                <div className='p-5 w-1/2 border-r border-gray-400'>
                    <h2 className='m-5 lg:text-4xl text-2xl font-mono font-semibold'>{props.activity.title}</h2>
                    <p>{props.activity.description}</p>
                </div>  

                {/* image block */} 
                <div className="w-1/2">
                    <Slideshow photos={props.activity.photos} title={props.activity.title}/>
                </div>
            </div>
        )
    };

};

class Activities extends Component {

	render() {
        window.onload = function() {
            /* Set style classes to enable background blur when activity page is rendered*/
            document.getElementById('navbar').className = 'lg:backdrop-blur-sm backdrop-blur-none h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
            /* prevent backdrop blur from title div that causes backdrop blur on home page for stays */
            document.getElementById('title_div').className = 'invisible'
        }

        return (
            <Parallax pages={4}
                className='snap-proximity snap-y overflow-y-scroll bg-green-50'
            >
                <ParallaxLayer
                    offset={0.15}
                    factor={3.8}
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
};

export default Activities;