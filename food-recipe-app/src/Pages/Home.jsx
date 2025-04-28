import React, { useState } from "react";
// Import image asset for the home page
import foodRecipe from "../assets/cooking-together.png";
// Import Recipeitems component to display recipe cards
import Recipeitems from "../Components/Recipeitems";
import { useNavigate } from "react-router-dom";
// Import Modal component for popup dialogs
import Modal from "../Components/Modal";
// Import InputForm component to show inside Modal
import InputForm from "../Components/InputForm";

const Home = () => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle "Add Recipe" button click
  const addRecipe = () => {
    const token = localStorage.getItem("token");    // Get token from localStorage, Check if user is authenticated (has token)
    if (token) {
      navigate("/addRecipe"); // If user is logged in, navigate to Add Recipe page, If authenticated, navigate to add recipe page
    } else {
      setIsOpen(true);  // If not logged in, open the login/signup modal, // If not authenticated, open login/signup modal
    }
  }

  return (
    <>
      {/* Main home section with two parts: left and right */}
      <section className="home">
        {/* Left part - Text content */}
        <div className="left">
          <h2>FlavorFix – Cook. Taste. Share.</h2>
          <h5>
            {/* Introduction text about the app */}
            Unleash your inner chef with FlavorFix! Explore thousands of
            easy-to-follow recipes, save your favorites, and even share your own
            delicious creations. Whether you're craving quick meals or gourmet
            dishes, our app brings inspiration to your kitchen. <br />
            - Get step-by-step guides, smart meal planning, and personalized recommendations. <br />
            - Discover thousands of chef-curated recipes tailored to your taste, diet, and skill level.
          </h5>
          {/* Button to add recipe, calls addRecipe function when clicked */}
          <button onClick={addRecipe}>Share your recipe</button>
        </div>

        {/* Right part - Image */}
        <div className="right">
          <img src={foodRecipe} alt="" width="300px" height="300px" />
        </div>
      </section>

      {/* Decorative SVG wave background under home section */}
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#d4f6e8"  // Light green fill color
            fillOpacity="1" // Full opacity
            d="M0,96L30,101.3C60,107,120,117,180,144C240,171,300,213,360,224C420,235,480,213,540,213.3C600,213,660,235,720,224C780,213,840,171,900,154.7C960,139,1020,149,1080,170.7C1140,192,1200,224,1260,213.3C1320,203,1380,149,1410,122.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* <Footer /> */}

      {/* Conditional rendering of modal for unauthenticated users */}  {/* Modal will open when isOpen is true */}
      {(isOpen) && <Modal onClose={() => setIsOpen(false)} >
        {/* Inside modal, we load InputForm for login/signup */}
        <InputForm setIsOpen={() => setIsOpen(false)} />
      </Modal>}

      {/* Section to display all available recipe items */}
      <div className="recipe">    {/* Section to display recipe items */}
        <Recipeitems />
      </div>
    </>
  );
};

export default Home;
