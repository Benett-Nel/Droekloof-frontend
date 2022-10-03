import { ParallaxLayer } from '@react-spring/parallax';
import React from 'react'

function Popup(props) {
  return (props.trigger) ? (
    // <ParallaxLayer 
    //     className='z-20'
    //     factor={0.9}
    //     offset={0.1}
    // >
    <div>
      {props.children}
    </div>    
  ) : "";
}; 

export default Popup