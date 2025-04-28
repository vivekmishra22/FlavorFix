import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';     // For programmatic navigation

const AddFoodRecipe = () => {

    const [ recipeData, setRecipeData ] = useState({});         // State to store the form input values
    const navigate = useNavigate();         // Hook to navigate to another page after form submission
    
    // Function to handle input changes
    const onHandleChange=(e)=> {
        
        // If input name is "ingredients", split the value by commas into an array
        // If input name is "file", store the uploaded file
        // Otherwise, store the normal input value

        // Special handling for different input types:
        // - For ingredients: split comma-separated string into array
        // - For file input: get the file object
        // - For others: use the value directly
        
        let val = (e.target.name ==="ingredients") ? e.target.value.split(",") : (e.target.name ==="file") ? e.target.files[0] : e.target.value;
        // Update the recipeData state dynamically
        // Update state while preserving existing values
        setRecipeData(pre =>({...pre, [e.target.name]: val}));
    }

    // Function to handle form submission
    const onHandleSubmit = async(e) => {

        e.preventDefault();     // Prevent the page from reloading on form submit
        try {
            console.log(recipeData);    // Log the form data for checking, Log data for debugging
            // Send a POST request to the server with form data
        await axios.post("http://localhost:8000/recipe/post", recipeData, {
            headers : {
                'Content-Type' : 'multipart/form-data',     // Important for file uploads
                'authorization' : 'bearer ' + localStorage.getItem("token")     // Send user token for authentication
            }
        })
        // Navigate to home page after successful submission
        navigate("/");
        } catch (err) {
            console.err("Failed to post recipe:", err);     // Log errors if the request fails
        }
    }
    
  return (
    <>
        <div className='container'>
            {/* Form for adding a new food recipe */}
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    {/* Input field for recipe title */}
                    <label htmlFor="">Title</label>
                    <input type="text" className='input' name="title" onChange={onHandleChange} required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Time</label>
                    <input type="text" className='input' name='time' onChange={onHandleChange} required />
                </div>
                <div className='form-control'>
                    {/* Textarea for ingredients (comma-separated) */}
                    <label htmlFor="">Ingredients</label>
                    <textarea type="text" className='input-textarea' name='ingredients' rows="5" onChange={onHandleChange} required/>
                </div>
                <div className='form-control'>
                    {/* Textarea for instructions */}
                    <label htmlFor="">Instructions</label>
                    <textarea type="text" className='input-textarea' name='instructions' rows="5" onChange={onHandleChange} required/>
                </div>
                <div className='form-control'>
                    {/* Input field for uploading a recipe image */}
                    <label htmlFor="">Recipe Image</label>
                    <input type="file" className='input' name='file' onChange={onHandleChange} required/>
                </div>
                {/* Submit button */}
                <button type='submit'>Add Recipe</button>
            </form>
        </div>
    </>
  )
}

export default AddFoodRecipe;
