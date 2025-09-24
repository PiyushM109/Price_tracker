import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./page/Home";
import ProductPage from "./page/ProductPage";
import ProductsPage from "./page/ProductsPage";
import About from "./page/About";
import Error from "./components/Error";
import LoginPage from "./page/LoginPage";
import TrackProduct from "./page/TrackProduct";
import axios from "axios";
import "./index.css";

const App = () => {
  useEffect(() => {
    axios.get("/initialize-scaraper");
  }, []);
  return (
    <div className="app bg-dark-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
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
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/track",
        element: <TrackProduct />,
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
      {
        path: "/product/:prodId",
        element: <ProductPage />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default function AppWrapper() {
  return <RouterProvider router={appRouter} />;
}
