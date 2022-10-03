import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';
import { userAtom } from '../App';
import all_reviews from '../assets/data/reviews';

function Stars(props) {
    const stars = [];
    
    for (let i = 1; i <= props.rating; i++) {
        stars.push(<ImStarFull color='gold' className='lg:text-2xl text-lg mr-1' key={i}/>)
    }
    
    const empty_stars = 5 - props.rating;
    if (empty_stars !== 0) {
        for (let count = 1; count <= empty_stars; count++) {
            stars.push(<ImStarEmpty color='gold' className='lg:text-2xl text-lg mr-1' key={count + props.rating}/>)
        }
    }

    return (
        <div className='flex'>{stars}</div>
    )
}

function StarButtons() {

    const [ratingSelect, setRatingSelect] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); 

    function handleRatingClick(starRating) {
        
        setRatingSelect(starRating);
        document.getElementById('star-rating')?.setAttribute('value', starRating) 
    }

    const stars = [];
    
    for (let i = 1; i <= hoverRating; i++) {
        stars.push(
            <button
                type='button' 
                onMouseOver={() => setHoverRating(i)}
                onClick={() => handleRatingClick(i)}
                onMouseOut={() => {setHoverRating(ratingSelect)}}
            >
                <ImStarFull color='gold' className='lg:text-4xl text-3xl right-0 mr-1' key={i}/>
            </button>
        )
    }
    
    const empty_stars = 5 - hoverRating;
    if (empty_stars !== 0) {
        for (let count = 1; count <= empty_stars; count++) {
            stars.push(
                <button
                    type='button' 
                    onMouseOver={() => setHoverRating(count + hoverRating)}
                    onClick={() => handleRatingClick(count + hoverRating)}
                    onMouseOut={() => {setHoverRating(ratingSelect)}}
                >
                    <ImStarEmpty color='gold' className='lg:text-4xl text-3xl right-0 mr-1' key={count + hoverRating}/>
                </button>
            )
        }
    }

  return (
    <>
        {stars}
    </>
  )
}


function Review(props) {
    return (
        <div className='inline-block border-b-2 border-gray-300 p-2 w-full relative min-h-[24]'>
            <div className='flex'>
                <span className='block font-semibold lg:text-xl text-lg'>{props.data.get_username}</span>
                <span className='flex absolute right-0 mr-6 mt-1'>
                    <Stars rating={props.data.rating}/>
                </span>
            </div>
            <div className='flex'>
                <span className='px-5 flex mt-2'>
                    {props.data.comment}
                </span>
            </div>
        </div>
    )
}

function Reviews() {

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    
    //onFormSubmit to save review
    const reviewSubmit = async (event) => {
        
        event.preventDefault();

        const rating = event.target.rating.value;

        if (rating === '0') {
            alert('Please select a rating');
            return;
        }

        const stay = event.target.stay.value;
        const comment = event.target.comment.value;

        if (typeof loggedUser !== 'string') {
            // @ts-ignore
            const curruser = loggedUser.username;

            // call create review view

            const new_review = await axios.get('http://localhost:8000/createreview/', {
                params: {
                    stay: stay,
                    username: curruser,
                    comment: comment,
                    rating: rating
                }
            })

            // reload page to show new review
            window.location.reload();
        } else {
            alert('You must be logged in to leave a review');
            window.location.assign('/signup');
        }
    }

    return (
        <>
            <div className='border-y-2 border-black w-screen h-auto p-5 text-center text-3xl inline-block text-black font-semibold'>Guest Reviews</div>
                {all_reviews.map((review, index) => 
                    <Review key={index} data={review} />
                )}

            
            <div className='w-full p-6 border-y-2 border-black items-center justify-center text-2xl font-semibold text-center'>
                Write us a review
            </div>

            <div className='w-full pl-8 border-b-2 border-black '>     
                <form onSubmit={reviewSubmit}>
                    
                    <div className='lg:w-3/4 w-[90%] flex my-6 items-center justify-between'>
                        <select className='border border-black rounded-2xl lg:text-xl py-2 px-4' placeholder='Stay:' name="stay" id="review_stayselect">
                            <option value="Select Stay">Select Stay</option>
                            <option value="Swartskaap">Swartskaap</option>
                            <option value="1945">1945</option>
                            <option value="Oudehuiskloof">Oudehuis Kloof</option>
                        </select>

                        <span className='flex my-6 '>
                            <StarButtons />
                        </span>
                    </div>

                    <input id='star-rating' type="hidden" defaultValue={0} name="rating" />

                    <div className='flex my-6 '>
                        <textarea className='border border-black rounded-2xl lg:text-xl py-2 px-4 w-3/4 h-40' name="comment" placeholder='Comment'/>
                    </div>
                    
                    <div className='flex my-6 lg:text-2xl'>
                        <input
                            className="bg-blue-400 text-white px-5 hover:cursor-pointer hover:border-2 hover:border-blue-400 rounded-xl py-1 mb-1"
                            type="submit"
                            value="Post"
                        />
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default Reviews