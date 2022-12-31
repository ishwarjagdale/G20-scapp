import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./view/Home";
import Saved from "./view/Saved";
import VisitedPlaces from "./view/VisitedPlaces";

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
            }
        ]
    }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
