import React from "react";
import Alert from "@mui/material/Alert";

import classes from "./styles.module.css";

const AlertContainer = ({ r2, labels, labelPrediction }) => {
    return (
        <>
            <Alert className={classes.alert} severity="info">
                <strong>
                    Your R2 value is:&nbsp;
                    <span className={classes.highlight}>{r2.toFixed(2)}</span>
                </strong>
            </Alert>
            <Alert className={classes.alert} severity="success">
                <strong>
                    Your predicted value for&nbsp;
                    <span className={classes.capitalize}>{labels}</span> is:&nbsp;
                    <span className={classes.highlight}>{labelPrediction.toFixed(2)}</span>
                </strong>
            </Alert>
        </>
    );
};

export { AlertContainer };
