// @ts-nocheck
// import Component from the react module
import React from "react";
import Slideshow from "../components/carousel";
import Stay from "../components/stay";
import { info_swartskaap } from "../assets/data/swartskaap";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Reviews from "../components/reviews";

// use jotai atoms to manage state and make use of local storage to use state bariable in other page as well
// the local storage is necesarry because atom resets when page is refreshed, unless it has storage
import { useAtom } from 'jotai';
import { navMenuAtom, profileMenuAtom } from "../App";
import useWindowDimensions from "../functions/windowsize";
 
// import images array from assets folder
import swartskaap_images from "../assets/images/swartskaap";
import oudehuis_images from "../assets/images/oudehuis";
import forty_images from "../assets/images/1945";
import generic_images from "../assets/images/generic";
import { info_oudehuis } from "../assets/data/oudehuis";
import { info_forty } from "../assets/data/1945";


function Home () {

    // the jotai atom enables me to use the variable across all files
	// use it in the app route so that any click outside of the Navbar component will make menu dissapear
	const [profileMenuPopup, setProfileMenuPopup] = useAtom(profileMenuAtom);
    const [navMenuPopup, setNavMenuPopup] = useAtom(navMenuAtom);

    const swartskaap_cover = swartskaap_images[0].image;
    const oudehuis_cover = oudehuis_images[0].image;
    const forty_cover = forty_images[0].image;

    function handleResize() {
        const newWindowSize = {width: window.innerWidth, height: window.innerHeight};
        if ((windowSize.width < 1024 && newWindowSize.width > 1024) || (windowSize.width > 1024 && newWindowSize.width < 1024) || (windowSize.width < 768 && newWindowSize.width > 768) || (windowSize.width > 768 && newWindowSize.width < 768)) {
            window.location.reload();
        }
        windowSize = newWindowSize;
    }
    var windowSize = useWindowDimensions(); 

    window.addEventListener('resize', handleResize);

    const windowRatio = ((windowSize.width / windowSize.height)  * (9/16)) - 0.1;

    return (

        <Parallax pages={4}
            className='snap-proximity snap-y overflow-y-scroll bg-slate-100 '
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
                offset={0}
                factor={1}
                className="snap-start"
            >
                <div className="top-0 lg:h-screen flex flex-wrap  w-screen ">
                    <Slideshow title='Droëkloof' photos={generic_images} aspect='16/9' delay={3500}/>
                </div>
            </ParallaxLayer>
                
            
                    
            <ParallaxLayer
                id="stay-layer"
                key={windowRatio}
                offset={windowRatio}
                factor={1.8}
                sticky={{start:(windowRatio), end:(windowRatio)}}
                className='z-20 snap-start'
                >
                <div className="h-[10%]"></div>
                {/* swartskaap */}
                <Stay info={info_swartskaap.info_list} title='Swartskaap' image={swartskaap_cover} side="left" />

                {/* swartskaap */}
                <Stay info={info_forty.info_list} title='1945' image={forty_cover} side="right" />

                {/* swartskaap */}
                <Stay info={info_oudehuis.info_list} title='Oudehuiskloof' image={oudehuis_cover} side="left" />

                <Reviews />

            </ParallaxLayer>
                    
        </Parallax>   
    )
}

export default Home;