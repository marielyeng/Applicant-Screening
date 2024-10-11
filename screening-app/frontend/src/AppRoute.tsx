import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "@remix-run/router";
import { Home } from "./pages/Home";
import { JobApplication } from "./pages/JobApplication";
import AdminPostJob from "./components/AdminJobPost";
import { JobListPage } from "./pages/JobListPage";
import { AdminLogin } from "./components/AdminLogin";
import { JobDetailedPage } from "./pages/JobDetailedPage";

const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/apply/:jobId',
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
    },
    {
        path: '/jobs/:jobId',
        element: <JobDetailedPage />
    }
])

export const AppRoute: React.FC = () => {
    return <RouterProvider router={router} />
}