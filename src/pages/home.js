// import Component from the react module
import React, { Component } from "react";
import Slideshow from "../components/carousel";
import Stay from "../components/stay";
import { info_swartskaap, images_swartskaap } from "../assets/data/swartskaap";
import { ParallaxLayer } from "@react-spring/parallax";
import Reviews from "../components/reviews";


class Home extends Component {

	render() {
       window.onload = function() {
            /* render heading and title div for introduction to stays when home page renders */
            document.getElementById('title_div').innerHTML = 'Stays';
            document.getElementById('title_div').className = 'backdrop-blur-sm w-screen p-5 h-12 text-center text-3xl inline-block text-black font-semibold';
            /* Set style classes to ensure background blur is switched off when home page is rendered */
            document.getElementById('navbar').className = 'h-16 z-20 flex items-center justify-between flex-wrap bg-inherit p-6';
       }

        return (

        <>
            <ParallaxLayer
                offset={0}
                factor={1}
                className="snap-start"
            >
                <div className="top-0 lg:h-screen flex flex-wrap w-screen ">
                    <Slideshow title={images_swartskaap.title} photos={images_swartskaap.photos}/>
                </div>
            </ParallaxLayer>
                
            
                    
            <ParallaxLayer
                offset={1.15}
                factor={1.8}
                className='z-0'
                >
                {/* swartskaap */}
                <Stay info={info_swartskaap} title={images_swartskaap.title} photos={images_swartskaap.photos} side="left"/>

                {/* swartskaap */}
                <Stay info={info_swartskaap} title={images_swartskaap.title} photos={images_swartskaap.photos} side="right"/>

                {/* swartskaap */}
                <Stay info={info_swartskaap} title={images_swartskaap.title} photos={images_swartskaap.photos} side="left"/>

                <Reviews />

            </ParallaxLayer>
                    

        </>   
        )
    }
}

export default Home;