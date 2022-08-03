import React, { useState, useRef, useEffect } from 'react';


const slideDelay = 3500;


function Slideshow(props) {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const iLen = props.photos.length;
    
    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect((num = iLen) => {
        
        resetTimeout();
       timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === num - 1 ? 0 : prevIndex + 1
            ),
          slideDelay
        );
    
        return () => {
            resetTimeout();
        };
      }, [index]);

    function movePrev() {
        if (index === 0) {
            setIndex(iLen -1);
        } else {
            setIndex(index - 1);
        };
    }

    function moveNext() {
        if (index === iLen -1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        };
    }

    return (
        <div className='slideshow relative overflow-hidden top-0 left-0 h-full w-full '>
            <div className='slideshowslider whitespace-nowrap transition duration-1000'
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {props.photos.map((image, index) => (
                    <div className='slide relative w-full h-full inline-block'
                        key={index}
                    >    
                        <img
                            className='aspect-video w-full' 
                            src={image} 
                            alt={props.title}
                        />
                    </div>
                ))}
            </div>

            <div className="hidden slideshowArrows lg:flex  justify-between absolute top-0 left-0 w-full h-full z-10">
                <button
                onClick={movePrev}
                className="arrow_button"
                disabled={false}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-20 -ml-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span className="sr-only">Prev</span>
                </button>
                <button
                onClick={moveNext}
                className="arrow_button"
                disabled={false}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-20 -ml-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                        />
                    </svg>
                <span className="sr-only">Next</span>
                </button>
            </div>

        </div>
    );
}

export default Slideshow;