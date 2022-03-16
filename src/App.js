import "./App.css";
import React from "react";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Navigation />
                <Outlet />
                <p>And here is some basic menu information</p>
            </div>
        );
    }
}

export default App;
