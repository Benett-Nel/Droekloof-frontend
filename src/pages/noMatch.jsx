import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import { FaHome } from 'react-icons/fa'

function NoMatch() {
  return (
        <Parallax pages={4}
            className='snap-proximity snap-y overflow-y-scroll bg-slate-100'
        >
            <ParallaxLayer
                offset={0.15}
                factor={3.8}
                className='z-0'
            >
                <div 
                    className='text-3xl font-semibold text-center justify-center w-screen h-screen'
                >
                    <div className='p-10'>
                        404 Page Not Found
                    </div>
                    
                    <a exact="true" href="/" className="nav-item">
                        <FaHome className=""  size={36}/>
                    </a>
                </div>
            </ParallaxLayer>
        </Parallax>
    )
}

export default NoMatch