import React from 'react';
import profileImg from '../assets/profile.png';
// Import useLoaderData hook to access the data loaded by the route loader
import { useLoaderData } from 'react-router-dom';

const RecipeDetails = () => {

    // Fetch the recipe data passed by the route's loader
    const recipe = useLoaderData();
    console.log(recipe);        // Log recipe data for debugging

    return (
        <>
            {/* Main container */}
            <div className='outer-container'>
                {/* Profile section with image and email */}
                <div className='profile'>
                    <img src={profileImg} width="50px" height="50px" />     {/* Display static profile image */}
                    <h5>{recipe.email}</h5>     {/* Display the email of the user who posted the recipe */}
                </div>
                <h3 className='title bg-danger'>{recipe.title}</h3>
                {/* Recipe image fetched from backend server */}
                <img src={`http://localhost:8000/images/${recipe.coverImage}`} width="220px" height="200px"></img>
                    <div className='time'><h4>Time</h4><span>{recipe.time}</span></div>
                <div className='recipe-details'>
                    <div className='ingredients'><h4>Ingredients</h4><ul>{recipe.ingredients.map(item => (<li>{item}</li>))}</ul></div>
                    <div className='instructions'><h4>Instructions</h4><span>{recipe.instructions}</span></div>
                </div>
            </div>
        </>
    )
}

export default RecipeDetails;
