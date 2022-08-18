import React from 'react';
import Slideshow from './carousel';

function Stay(props) {

    function InfoBlock() {
        return (
            <div className='p-5 w-1/2 border-r border-gray-400'>
                <div className='inline-block w-full relative'>
                    <h2 className='m-5 text-4xl font-mono font-semibold'>{props.title}</h2>
                    <a
                        exact="true" href={`/book/${props.title}`} 
                        className="z-40 border rounded-md h-fit w-fit py-2 px-4 absolute 
                        top-0 right-0 m-4 border-blue-400 text-blue-400 hover:bg-blue-400
                        hover:text-white text-xl"
                    >
                        Book
                    </a>
                </div>
                
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
        )
    }

    if (props.side === 'right') {
        return(
            <div className='w-screen  border-t border-gray-400 flex '>
                <div className='w-1/2 '>
                    <Slideshow className='top-0 h-full' photos={props.photos} />
                </div>
                <InfoBlock/>
            </div>
                
        )
    } else {
        return (
            <div className='w-screen  border-t border-gray-400 flex '>
                <InfoBlock />
                <div className='w-1/2 '>
                    <Slideshow className='top-0 h-full' photos={props.photos} />
                </div>
            </div>
        )
    }
}

export default Stay;