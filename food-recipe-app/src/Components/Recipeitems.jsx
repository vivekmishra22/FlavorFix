// Importing React and hooks for component state and side effects
import React, { useEffect, useState } from 'react';
// Importing Router components for navigation and loading data
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaEdit, FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';


const Recipeitems = () => {

    const navigate = useNavigate();     // Initialize navigation hook to programmatically navigate between pages

    const recipes = useLoaderData();    // Get recipes data loaded by the router
    const [ allRecipes, setAllRecipes ] = useState();   // State to manage all recipes
    let path = window.location.pathname === "/myRecipe" ? true : false;     // Check if the current page/path is "myRecipe"
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];       // Fetching favorite recipes from localStorage, or initializing as empty array if not found
    const [ isFavRecipe, setIsFavRecipe] = useState(false);     // State to track if a recipe is marked as favorite
    
    console.log(allRecipes);        // Log all recipes to the console for debugging

    // Effect to update allRecipes when recipes from loader change
    useEffect(()=> {
        setAllRecipes(recipes);     // On component mount, set all recipes state with the fetched recipes
    },[recipes]);

    // Function to handle recipe deletion
    const onDelete = async(id) => {     
        try {
            await axios.delete(`http://localhost:8000/recipe/delete/${id}`)     // Send DELETE request to server
        .then((res) => console.log(res));
        // setAllRecipes(recipes.filter(recipe => recipe._id !== id));, Update state to remove deleted recipe
        setAllRecipes(prev => prev.filter(recipe => recipe._id !== id));    // Update the state to remove the deleted recipe
        let filterItem = favItems.filter(recipe => recipe._id !== id);      // Remove from favorites if it was favorited
        localStorage.setItem("fav", JSON.stringify(filterItem));        // Update the favorite recipes in localStorage
        } catch (error) {
            console.error("Failed to delete recipe:", err);     // Log any error that occurs during deletion
        }
    }

    // const favRecipe = (item) => {
    //     let filterItem = favItems.filter(recipe => recipe._id !== item._id)
    //     favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [ ...favItems, item ] : filterItem;
    //     localStorage.setItem("fav", JSON.stringify(favItems))
    //     setIsFavRecipe(pre => !pre )
    // }

    // Function to handle adding/removing favorites
    const favRecipe = (item) => {
        // Check if item is already favorited
        const alreadyFav = favItems.some(recipe => recipe._id === item._id);
        const updatedFavs = alreadyFav
            ? favItems.filter(recipe => recipe._id !== item._id)    // Remove if already favorite
            : [...favItems, item];  // Add if not favorite
    
        localStorage.setItem("fav", JSON.stringify(updatedFavs));   // Save updated favorites to localStorage
        setIsFavRecipe(prev => !prev);
    };
    
    return (
        <>
            <div className='card-container'>
                {/* Mapping over all recipes to display them in cards */}
                {
                    allRecipes?.map((item, index) => {
                        return (
                            // Each recipe is displayed as a card, clickable to navigate to its details
                            <div key={item._id} className='card' onDoubleClick={()=>navigate(`/recipe/${item._id}`)}>
                                <img src={`http://localhost:8000/images/${item.coverImage}`} alt="" width="120px" height="100px" />
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='time d-flex align-items-center'>
                                            <span><BsStopwatchFill /></span>
                                            <span> {item.time}</span>
                                        </div>
                                        {/* Conditionally render favorite or action buttons depending on the page path */}
                                        { (!path) ? <FaHeart onClick={() => favRecipe(item)}
                                            style={{color:(favItems.some(res => res._id === item._id)) ? "red" : ""}} /> :
                                            // Edit and delete icons with their respective actions
                                            <div className='action'>     
                                                <Link to={`/editRecipe/${item._id}`} className='editIcon'> <FaEdit /> </Link>
                                                <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                            </div>
                                        }
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
