import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home!</h1>
            <Link to={`/linear-regression`}>Linear Regression</Link>
        </div>
    );
};

export { Home };
