import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./view/Home";
import Saved from "./view/Saved";
import VisitedPlaces from "./view/VisitedPlaces";
import Category from "./view/Category";
import Admin from "./view/admin/Admin";
import Dashboard from "./view/admin/Dashboard";
import Settings from "./view/admin/Settings";
import NewLocation from "./view/admin/NewLocation";
import SignIn from "./view/SignIn";
import Monument from "./view/Monument";

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
            },
            {
                path: "/monument/:monument_id",
                element: <Monument />
            }
        ]
    },
    {
        path: "/login",
        element: <SignIn />
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [
            {
                path: "/admin/",
                element: <Dashboard/>
            },
            {
                path: "/admin/settings",
                element: <Settings/>
            },
            {
                path: "/admin/new",
                element: <NewLocation/>
            },
            {
                path: "/admin/edit/:id",
                element: <NewLocation/>
            }
        ]
    }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
