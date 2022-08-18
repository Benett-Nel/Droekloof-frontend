import React from 'react';
import { FaStar } from 'react-icons/fa';
import { reviews } from '../assets/data/reviews';

function Stars(props) {
    const rows = [];
    
    for (let i = 1; i <= props.rating; i++) {
        rows.push(<FaStar className='mr-1' key={i}/>)
    }

    return (
        <div className='flex'>{rows}</div>
    )
}

function Review(props) {
    return (
        <div className='inline-block border-b p-2 w-full relative h-24'>
            <h2 className='block font-semibold text-xl mb-4'>{props.data.user}</h2>
            <div className='flex'>
                <span className='px-5 flex'>
                    {props.data.text}
                </span>
                <span className='flex absolute right-0 mr-5'>
                    <Stars rating={props.data.rating}/>
                </span>
            </div>
        </div>
    )
}

function Reviews() {

    return (
        <>
            <div className='border-y-2 border-black w-screen h-auto p-5 text-center text-3xl inline-block text-black font-semibold'>Guest Reviews</div>
                {reviews.map((review, index) => 
                    <Review key={index} data={review} />
                )}
        </>
    )
}

export default Reviews