import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

// import InputForm from './InputForm';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))

  useEffect( ()=> {
    setIsLogin(token ? false : true)
  },[token])
  
  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else {
      setIsOpen(true)
    }
  }

  return (
    <>
      <header>
        <h2>🍽️ FlavorFix</h2>
        {/* <h2>Food Recipe</h2> */}
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={ ()=> isLogin && setIsOpen(true) }><NavLink to={ !isLogin ? "/myRecipe" : "/" }>My Recipe</NavLink></li>
          <li onClick={ ()=> isLogin && setIsOpen(true) }><NavLink to={ !isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
          <li onClick={checkLogin}><p className='Login'>{(isLogin) ? "Login" : "Logout "}{user ?.email ? `( ${user ?.email} )` : ""}</p></li>
        </ul>
      </header>
      {(isOpen) && <Modal onClose={() => setIsOpen(false)} > <InputForm setIsOpen={() => setIsOpen(false)} /> </Modal>}
    </>
  )
}

export default Navbar;
