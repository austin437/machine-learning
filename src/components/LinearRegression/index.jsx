import React from "react";
import { useLocation, Link } from "react-router-dom";

const LinearRegression = (props) => {
    const { state } = useLocation();
    console.log(state);

    return (
        <>
            <h2>Linear Regression</h2>
            <p>processing...</p>
            <Link to={`/`}>Back</Link>
        </>
    );
};

export { LinearRegression };
