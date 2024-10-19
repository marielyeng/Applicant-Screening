import React from "react";
import AdminPostJob from "../components/AdminJobPost";
import { AdminNavBar } from "../components/AdminNavBar";

export const AdminPage: React.FC = () => {
    return (
     <>
        <AdminNavBar />
        <AdminPostJob />
     </>
    )
}