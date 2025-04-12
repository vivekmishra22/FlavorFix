import React, { useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

// import InputForm from './InputForm';

const Navbar = () => {

  const [ isOpen, setIsOpen] = useState(false)

  const checkLogin = () => {
    setIsOpen(true)
  }
  
  return (
    <>
      <header>
        <h2>Food Recipe</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/myRecipe">My Recipe</NavLink></li>
            <li><NavLink to="/favRecipe">Favourites</NavLink></li>
            <li onClick={checkLogin}><p className='Login'>Login</p></li>
        </ul>
      </header>
      { (isOpen) && <Modal onClose={() => setIsOpen(false)} > <InputForm setIsOpen={ () => setIsOpen(false)} /> </Modal>}
    </>
  )
}

export default Navbar;
