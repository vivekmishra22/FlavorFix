import axios from 'axios';
import React, { useState } from 'react';

const InputForm = ({setIsOpen}) => {

    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isSignUp, setIsSignUp ] = useState(false);
    const [ error, setError ] = useState("");
    
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        let endpoint=(isSignUp) ? "signUp" : "login"

        await axios.post(`http://localhost:8000/${endpoint}`, { email, password })
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setIsOpen()
        })
        // .catch(data => setError(data.response?.data?.error))
        .catch((err) => {
          const msg = err.response?.data?.message || err.response?.data?.error || "Something went wrong";
          setError(msg);
        });
        
    }

    
  return (
    <>
      <form action="" className='form' onSubmit={handleOnSubmit}>
        <div className='form-control'>
            <label htmlFor="">Email</label>
            <input type="email" className='input' onChange={ (e) => setEmail(e.target.value)}  required/>
        </div>
        <div className='form-control'>
            <label htmlFor="">Password</label>
            <input type="password" className='input' onChange={ (e) => setPassword(e.target.value)}  required/>
        </div>
        <button type='submit'>{ (isSignUp) ? "Sign Up" : "Login" }</button> <br /><br />
        { (error!= "") && <h6 className='error'>{error}</h6>}
        <p onClick={ () => setIsSignUp(pre=>!pre) }> { (isSignUp) ? "Already have an account" : "Create new account"} </p>
        {/* <p onClick={ () => setIsSignUp(true) }> { (isSignUp) ? "Already have an account" : "Create new account"} </p> */}
      </form>
    </>
  )
}

export default InputForm;
