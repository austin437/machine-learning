import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Home = () => {
    return (
        <>
            <Typography variant="h3" component="div" gutterBottom>
                Home
            </Typography>
            <Typography variant="body1" gutterBottom>
                <Link to={`/linear-regression`}>Linear Regression</Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
                <Link to={`/multinominal-logistic-regression`}>Multinominal Logistic Regression</Link>
            </Typography>
        </>
    );
};

export { Home };
