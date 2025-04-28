// Importing necessary CSS and dependencies
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Home from './Pages/Home';
import MainNavigation from './Components/MainNavigation';
import AddFoodRecipe from './Pages/AddFoodRecipe';
import EditRecipe from './Pages/EditRecipe';
import RecipeDetails from './Pages/RecipeDetails';

// API base URL for cleaner code and easier maintenance
// const API_BASE_URL = 'http://localhost:8000';


// Function to fetch all recipes from the server
const getAllRecipes = async () => {
  try {
    // Making an HTTP GET request to fetch all recipes from the server
    const res = await axios.get('http://localhost:8000/recipe/get');
    return res.data; // Returning the list of recipes directly
  } catch (error) {
    console.error("Error in fetching recipes:", error); // Logging any error during the API call
    return []; // Returning an empty array in case of an error to prevent app crash
  }
};

// Function to fetch only the recipes created by the current user
const getMyRecipe = async () => {
  try {
    // Retrieving the user information from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return []; // If no user is found in local storage, return an empty array

    // Fetching all recipes and filter by creator
    const allRecipes = await getAllRecipes();
    // Filtering the recipes created by the logged-in user
    return allRecipes.filter(item => item.createdBy === user._id);
  } catch (error) {
    console.error("Error fetching user recipes:", error); // Logging any error during the API call
    return [];  // Returning an empty array in case of an error to prevent app crash
  }
}

// Function to fetch the favorite recipes from local storage
const getFavRecipes = () => {
  try {
    // Retrieving the favorite recipes stored in local storage
    const favRecipes = JSON.parse(localStorage.getItem("fav"));
    return favRecipes || []; // If there are no favorite recipes, return an empty array
  } catch (error) {
    console.error("Error parsing favorite recipes:", error);
    return [];
  }
}

// Function to get single recipe details by ID
const getRecipe = async ({ params }) => {
  try {
    // let recipe;
    // await axios.get(`http://localhost:8000/recipe/getById/${params.id}`)
    //   .then(res => recipe = res.data);

    // Fetching the recipe by its ID from the server
    const recipeRes = await axios.get(`http://localhost:8000/recipe/getById/${params.id}`);
    const recipe = recipeRes.data;

    // await axios.get(`http://localhost:8000/user/${recipe.createdBy}`)
    //   .then(res => {
    //     recipe = { ...recipe, email: res.data.email }
    //   })

    // Fetching the user (creator) details based on the recipe's createdBy field
    const userRes = await axios.get(`http://localhost:8000/user/${recipe.createdBy}`);
    return { ...recipe, email: userRes.data.email };

    // return recipe;
  } catch (error) {
    {
      // If there's an error, log it and return a fallback error object
      console.error("Failed to fetch recipe or user:", error);
      return { title: "Not Found", ingredients: [], instructions: "", email: "Unknown", error: true }; // Add error flag for UI handling
    }
  }
}

// Setting up the router for the app
const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, // Main navigation is always present at the root
    errorElement: <div>Something went wrong. Please try again later.</div>,   // Error handler for any routes that fail
    children: [  // Nested routes 
      { path: "/", element: <Home />, loader: getAllRecipes },  // Home page, loads all recipes
      { path: "/myRecipe", element: <Home />, loader: getMyRecipe },  // My Recipe page, loads the user's own recipes
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes }, // Favorite Recipes page, loads favorite recipes from local storage
      { path: "/addRecipe", element: <AddFoodRecipe /> }, // Add Recipe page, allows user to add a recipe
      { path: "/editRecipe/:id", element: <EditRecipe /> }, // Edit Recipe page, allows user to edit a recipe by ID
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe }  // Recipe Details page, loads details of a single recipe by ID
    ]
  },
]);

// The main component that renders the RouterProvider with the defined router
function App() {
  return (
    // RouterProvider renders the routes defined in the `router` object
    <RouterProvider router={router} />
  );
}

// Exporting the App component for usage in the main entry file (e.g., index.js)
export default App;
