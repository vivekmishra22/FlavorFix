import React from "react";
import foodRecipe from "../assets/foodRecipe.png";
import Recipeitems from "../Components/Recipeitems";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      {/* <Navbar/> */}
      <section className="home">
        <div className="left">
          <h1>Food Recipe</h1>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
            vel voluptates assumenda amet minima, aperiam, nesciunt, dolor totam
            accusantium odit similique minus esse dolores saepe cumque quia
            perferendis quaerat numquam
          </h5>
          <button>Share your recipe</button>
        </div>

        <div className="right">
          <img src={foodRecipe} alt="" width="300px" height="300px" />
        </div>
      </section>

      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#d4f6e8"
            fillOpacity="1"
            d="M0,96L30,101.3C60,107,120,117,180,144C240,171,300,213,360,224C420,235,480,213,540,213.3C600,213,660,235,720,224C780,213,840,171,900,154.7C960,139,1020,149,1080,170.7C1140,192,1200,224,1260,213.3C1320,203,1380,149,1410,122.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* <Footer /> */}

      <div className="recipe">
        <Recipeitems />
      </div>
    </>
  );
};

export default Home;
