import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import MainNavigation from './Components/MainNavigation';
import axios from 'axios';
import AddFoodRecipe from './Pages/AddFoodRecipe';
import EditRecipe from './Pages/EditRecipe';
import RecipeDetails from './Pages/RecipeDetails';

function App() {

  // const getAllRecipes = async()=> {
  //   let allRecipes=[]
  //   await axios.get('http://localhost:8000/recipe/get').then(res=>{
  //     allRecipes.res.data
  //   })
  //   return allRecipes;
  // }

  const getAllRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/recipe/get');
      return res.data; // directly return the data
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; // prevent app crash
    }
  };

  const getMyRecipe = async () => {
    let user = JSON.parse(localStorage.getItem("user"))

    let allRecipes = await getAllRecipes()
    return allRecipes.filter(item => item.createdBy === user._id)
  }

  const getFavRecipes = () => {
    return JSON.parse(localStorage.getItem("fav"))
  }

  const getRecipe = async ({ params }) => {
    let recipe;
    await axios.get(`http://localhost:8000/recipe/getById/${params.id}`)
        .then(res => recipe = res.data)

    await axios.get(`http://localhost:8000/user/${recipe.createdBy}`)
        .then(res => {
            recipe = { ...recipe, email: res.data.email }
        })

    return recipe
}

// const getRecipe = async ({ params }) => {
//   try {
//       let recipeRes = await axios.get(`http://localhost:8000/recipe/getById/${params.id}`);
//       let recipe = recipeRes.data;

//       const userRes = await axios.get(`http://localhost:8000/user/${recipe.createdBy}`);
//       recipe = { ...recipe, email: userRes.data?.email || "Unknown" };

//       return recipe;
//   } catch (error) {
//       console.error("Failed to fetch recipe or user:", error);
//       return { title: "Not Found", ingredients: [], instructions: "", email: "Unknown" };
//   }
// }



  
  const router = createBrowserRouter([
    {
      path: "/", element: <MainNavigation />,
      errorElement: <div>Something went wrong. Please try again later.</div>, children: [
        { path: "/", element: <Home />, loader: getAllRecipes },
        { path: "/myRecipe", element: <Home />, loader: getMyRecipe },
        { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
        { path: "/addRecipe", element: <AddFoodRecipe /> },
        { path: "/editRecipe/:id", element: <EditRecipe /> },
        { path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe }
      ]
    },
    // { path: "/", element: <Home /> },      // errorElement: <div>Oops! Page not found.</div>, // Optional but recommended
  ]);

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,  
  //     errorElement: <div>Oops! Page not found.</div>, // Optional but recommended
  //   },
  // ]);

  return (
    <RouterProvider router={router} />  
  );
}

export default App;
