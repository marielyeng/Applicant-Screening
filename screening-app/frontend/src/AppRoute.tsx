import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "@remix-run/router";
import { Home } from "./pages/Home";
import { JobApplication } from "./pages/JobApplication";
import { AdminPage } from "./pages/AdminPage";
import AdminPostJob from "./components/AdminJobPost";
import JobListPage from "./pages/JobListPage";
import { AdminLogin } from "./components/AdminLogin";

const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/apply',
        element: <JobApplication />
    },
    {
        path: '/admin-login',
        element: <AdminLogin />
    },
    {
        path: '/admin-post-job',
        element: <AdminPostJob />
    },
    {
        path: '/jobs',
        element: <JobListPage />
    }
])

export const AppRoute: React.FC = () => {
    return <RouterProvider router={router} />
}