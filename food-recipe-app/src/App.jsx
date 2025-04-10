import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import MainNavigation from './Components/MainNavigation';

function App() {
  const router = createBrowserRouter([

    { path: "/", element: <MainNavigation />, children:[
      { path: "/", element: <Home /> }
    ] }, 
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
