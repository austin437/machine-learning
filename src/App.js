import React from "react";
import "./App.css";
import { LoadCsv, LoadOptions } from "./components";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoadCsv />} />
                <Route path="/load-options" element={<LoadOptions />} />
            </Routes>
        </div>
    );
};

export default App;
