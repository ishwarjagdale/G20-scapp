import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./views/Home";
import CategoryView from "./views/CategoryView";
import VisitedPlaces from "./views/VisitedPlaces";
import SavedPlaces from "./views/SavedPlaces";
import NearbyPlaces from "./views/NearbyPlaces";
import Monument from "./views/Monument";
import Scanner from "./views/Scanner";
import SignIn from "./views/SignIn";
import Admin from "./views/admin/Admin";
import Dashboard from "./views/admin/Dashboard";
import Settings from "./views/admin/Settings";
import NewLocation from "./views/admin/NewLocation";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/category/:category",
                element: <CategoryView/>
            },
            {
                path: "/visited-places",
                element: <VisitedPlaces/>
            },
            {
                path: "/saved",
                element: <SavedPlaces/>
            },
            {
                path: "/nearby",
                element: <NearbyPlaces/>
            },
            {
                path: "/monument/:monument_id",
                element: <Monument/>
            },
            {
                path: "/scanner",
                element: <Scanner/>
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
