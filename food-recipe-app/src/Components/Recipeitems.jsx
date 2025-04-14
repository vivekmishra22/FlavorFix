import React from 'react';
import { useLoaderData } from 'react-router-dom';
import foodImg from '../assets/foodRecipe.png';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
const Recipeitems = () => {

    const allRecipes = useLoaderData()
    console.log(allRecipes)

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div key={index} className='card'>
                                {/* <img src={foodImg} alt="" width="100px" height="100px" /> */}
                                <img src={`http://localhost:8000/images/${item.coverImage}`} alt="" width="100px" height="100px" />
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='time d-flex align-items-center'>
                                            <span><BsStopwatchFill /></span>
                                            <span> {item.time}</span>
                                        </div>
                                        <FaHeart />
                                        {/* <div className='time'><FaHeart /></div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Recipeitems;
