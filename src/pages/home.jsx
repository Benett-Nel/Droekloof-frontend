// import Component from the react module
import React, { Component } from "react";
import Slideshow from "../components/carousel";
import Stay from "../components/stay";
import { info_swartskaap, images_swartskaap } from "../assets/data/swartskaap";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Reviews from "../components/reviews";


class Home extends Component {

	render() {
        return (

        <Parallax pages={4}
            className='snap-proximity snap-y overflow-y-scroll bg-green-50'
        >
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
                offset={1}
                factor={1.8}
                sticky={{start: 1, end: 1}}
                className='z-20 snap-start'
                >
                <div className="h-1/6"></div>
                {/* swartskaap */}
                <Stay info={info_swartskaap.info_list} title={images_swartskaap.title} photos={images_swartskaap.photos} side="left"/>

                {/* swartskaap */}
                <Stay info={info_swartskaap.info_list} title={images_swartskaap.title} photos={images_swartskaap.photos} side="right"/>

                {/* swartskaap */}
                <Stay info={info_swartskaap.info_list} title={images_swartskaap.title} photos={images_swartskaap.photos} side="left"/>

                <Reviews />

            </ParallaxLayer>
                    
            <ParallaxLayer
                offset={1.01}
                factor={0.1}
                className="z-0"
            >
                <div className="backdrop-blur-sm w-screen p-5 h-12 text-center text-3xl inline-block text-black font-semibold"
                    id="title_div"
                >
                </div>
            </ParallaxLayer>
        </Parallax>   
        )
    }
}

export default Home;