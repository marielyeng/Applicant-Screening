import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "@remix-run/router";
import Home from "./app/page";

const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    }
])

export const AppRoute: React.FC = () => {
    return <RouterProvider router={router} />
}