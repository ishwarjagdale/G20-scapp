import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./view/Home";
import Saved from "./view/Saved";
import VisitedPlaces from "./view/VisitedPlaces";
import Category from "./view/Category";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/visited-places",
                element: <VisitedPlaces/>
            },
            {
                path: "/saved",
                element: <Saved/>
            },
            {
                path: "/category/:category",
                element: <Category/>
            }
        ]
    }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
