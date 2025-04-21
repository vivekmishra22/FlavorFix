import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {

    const [ recipeData, setRecipeData ] = useState({});
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect (() => {
        const getData = async() => {
            await axios.get(`http://localhost:8000/recipe/getById/${id}`)
            .then(response => {
                let res = response.data
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }

        getData()
    },[])
    
    const onHandleChange=(e)=> {
        // console.log(e.target.files[0])
        // let val = (e.target.name ==="ingredients") ? e.target.value.split(",") : e.target.value
        let val = (e.target.name ==="ingredients") ? e.target.value.split(",") : (e.target.name ==="file") ? e.target.files[0] : e.target.value
        setRecipeData(pre =>({...pre, [e.target.name]: val}))
    }

    const onHandleSubmit = async(e) => {
        e.preventDefault()
        console.log(recipeData)
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
                    <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Time</label>
                    <input type="text" className='input' name='time' onChange={onHandleChange}value={recipeData.time}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Ingredients</label>
                    <textarea type="text" className='input-textarea' name='ingredients' rows="5" onChange={onHandleChange} value={recipeData.ingredients}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Instructions</label>
                    <textarea type="text" className='input-textarea' name='instructions' rows="5" onChange={onHandleChange} value={recipeData.instructions}/>
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

export default EditRecipe;
