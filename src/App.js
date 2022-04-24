import React from "react";
import "./App.css";
import { Home, LinearRegression } from "./components";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/linear-regression" element={<LinearRegression />} />
            </Routes>
        </div>
    );
};

export default App;
