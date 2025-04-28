import axios from 'axios';
import React, { useState } from 'react';

// Define the InputForm component which takes 'setIsOpen' as a prop
const InputForm = ({setIsOpen}) => {

    // Declare state variables to manage email, password, signup state, and error messages
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isSignUp, setIsSignUp ] = useState(false);
    const [ error, setError ] = useState("");
    
    const handleOnSubmit = async(e) => {
        e.preventDefault()  // Prevent the default form submission behavior (page reload)
        let endpoint=(isSignUp) ? "signUp" : "login"; // Set the API endpoint based on whether it's sign-up or login

        // Send a POST request to the backend with email and password
        await axios.post(`http://localhost:8000/${endpoint}`, { email, password })
        .then((res) => {
          // On success, store the JWT token and user info in localStorage
            localStorage.setItem("token", res.data.token);    // Save the token to localStorage (for authentication)
            localStorage.setItem("user", JSON.stringify(res.data.user));  // Save user info to localStorage
            // alert("Login Successful!"); // Optionally display a success message
            setIsOpen();  // Close the modal by calling the setIsOpen function passed as a prop
        })
        // .catch(data => setError(data.response?.data?.error))
        .catch((err) => {   // Catch any errors during the request
          console.error(err); // Log the error to the console for debugging
          // Set the error message from the server's response or a default message
          const msg = err.response?.data?.message || err.response?.data?.error || "Something went wrong";
          setError(msg);  // Update the error state with the message
        });
        
    }

    
  return (
    <>
    {/* Render the form to handle email, password, and submit */}
      <form action="" className='form' onSubmit={handleOnSubmit}>
        <div className='form-control'>
            <label htmlFor="">Email</label>
            {/* Input field for email, updates email state on change */}
            <input type="email" className='input' onChange={ (e) => setEmail(e.target.value)}  required/>
        </div>
        <div className='form-control'>
            <label htmlFor="">Password</label>
            {/* Input field for password, updates password state on change */}
            <input type="password" className='input' onChange={ (e) => setPassword(e.target.value)}  required/>
        </div>
        {/* Display "Sign Up" or "Login" based on isSignUp state */}
        <button type='submit'>{ (isSignUp) ? "Sign Up" : "Login" }</button> <br /><br />
        {/* Display error message if there's an error */}
        { (error!= "") && <h6 className='error'>{error}</h6>}
        {/* Display appropriate message depending on isSignUp state */}
        <p onClick={ () => setIsSignUp(pre=>!pre) }> { (isSignUp) ? "Already have an account" : "Create new account"} </p>
      </form>
    </>
  )
}

export default InputForm;
