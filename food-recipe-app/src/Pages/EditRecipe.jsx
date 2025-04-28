import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Import Form component, useNavigate to navigate programmatically, useParams to get URL params
import { Form, useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {

     // State to store the form data (recipe details)
    const [ recipeData, setRecipeData ] = useState({});
    // Hook to programmatically navigate to another route after form submission
    const navigate = useNavigate();
    const {id} = useParams();   // Hook to get URL parameter 'id' (id of the recipe to edit), Extract the 'id' parameter from the URL

    // useEffect hook to fetch recipe data when component mounts, useEffect runs once when the component loads
    useEffect (() => {
         // Define an async function to fetch the recipe details
        const getData = async() => {
            await axios.get(`http://localhost:8000/recipe/getById/${id}`)       // Make GET request to fetch recipe by id
            .then(response => {
                let res = response.data;        // Get response data
                // Set the fetched data into the form, convert ingredients array to comma-separated string
                // Set form state with recipe data
                // Convert ingredients array to comma-separated string for textarea
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),      // Array to string
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }
        getData();  // Call the function, Call the data fetching function
    },[]);      // Empty dependency array means it runs only once when component mounts
    
    // Function to handle change in input fields
    const onHandleChange=(e)=> {
        // If the input name is "ingredients", split the value by commas into an array
        // If the input name is "file", store the uploaded file
        // Otherwise, store the normal input value
        let val = (e.target.name ==="ingredients") ? e.target.value.split(",") : (e.target.name ==="file") ? e.target.files[0] : e.target.value
        // Update the recipeData state dynamically
        setRecipeData(pre =>({...pre, [e.target.name]: val}));
    }

    const onHandleSubmit = async(e) => {
        e.preventDefault();
        console.log(recipeData);
        // Send PUT request to update recipe data
        await axios.put(`http://localhost:8000/recipe/put/${id}`, recipeData, {
            headers : {
                'Content-Type' : 'multipart/form-data',
                'authorization' : 'bearer ' + localStorage.getItem("token")
            }
        })
        .then(()=> navigate("/"))
    }
    
  return (
    <>
        <div className='container'>
            <Form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label htmlFor="">Title</label>
                    <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title} required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Time</label>
                    <input type="text" className='input' name='time' onChange={onHandleChange}value={recipeData.time} required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Ingredients</label>
                    <textarea type="text" className='input-textarea' name='ingredients' rows="5" onChange={onHandleChange} value={recipeData.ingredients} required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Instructions</label>
                    <textarea type="text" className='input-textarea' name='instructions' rows="5" onChange={onHandleChange} value={recipeData.instructions} required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Recipe Image</label>
                    <input type="file" className='input' name='file' onChange={onHandleChange} />
                </div>
                <button type='submit'>Edit Recipe</button>
            </Form>
        </div>
    </>
  )
}

// Export the EditRecipe component to use it in other parts of the project
export default EditRecipe;  
