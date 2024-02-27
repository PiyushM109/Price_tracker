import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Components/Home";
import ProductPage from "./Components/ProductPage";
import Error from "./Components/Error";
import './index.css'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path:"/product/:prodId",
        element: <ProductPage />
      },
      
    ],
    errorElement: <Error/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(<React.StrictMode><RouterProvider router={appRouter} /></React.StrictMode>);

