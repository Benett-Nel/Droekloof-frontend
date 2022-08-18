import { ParallaxLayer } from '@react-spring/parallax';
import React from 'react'

function Popup(props) {
  return (props.trigger) ? (
    <ParallaxLayer 
        className='z-20'
        factor={0.9}
        offset={0.1}
    >
        <div className='h-full w-full flex flex-col items-center justify-center backdrop-blur-sm'>
            <div className='h-fit w-fit rounded-xl bg-slate-100'>
                {props.children}
            </div>
        </div>
    </ParallaxLayer>
  ) : "";
}; 

export default Popup