import React from "react";
import SidebarDrawer from "./components/SidebarDrawer";
import Navbar from "./components/Navbar";
import About from "./components/About";
import User from "./components/User";
import Blogs from "./components/Blogs";
import BlogsId from "./components/BlogsId";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";

export const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SidebarDrawer />
      <Outlet />
    </React.Fragment>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
            <Home />
        ),
      },
      {
        path: "home",
        element: (
            <Home />
        ),
      },
      {
        path: "products",
        element: (
            <Products />
        ),
      },
      {
        path: "add-product",
        element: (
            <AddProducts />
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "user",
        element: (
            <User />
        ),
      },
      {
        path: "blogs",
        element: (
            <Blogs />
        ),
      },
      {
        path: "blogs/:id",
        element: (
            <BlogsId />
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
