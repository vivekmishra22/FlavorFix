import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import MainNavigation from './Components/MainNavigation';
import axios from 'axios';
import AddFoodRecipe from './Pages/AddFoodRecipe';

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

  const router = createBrowserRouter([

    {
      path: "/", element: <MainNavigation />,
      errorElement: <div>Something went wrong. Please try again later.</div>, children: [
        { path: "/", element: <Home />, loader: getAllRecipes },
        { path: "/myRecipe", element: <Home />},
        { path: "/favRecipe", element: <Home />},
        { path: "/addRecipe", element: <AddFoodRecipe />}
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
    <RouterProvider router={router} />  // ✅ Self-closing tag
  );
}

export default App;
