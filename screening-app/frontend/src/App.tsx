import React from "react";
import { ThemeProvider } from "react-bootstrap";
import { AppRoute } from "./AppRoute";
import { NavBar } from "./components/NavBar";
import "./App.css";

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <NavBar />
           <AppRoute />
        </ThemeProvider>
    )
}

export default App;