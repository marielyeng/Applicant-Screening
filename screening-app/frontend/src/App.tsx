import React from "react";
import { ThemeProvider } from "react-bootstrap";
import { AppRoute } from "./AppRoute";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <NavBar />
                <AppRoute />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App;