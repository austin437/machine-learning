import React, { useState, useReducer } from "react";
import { useLocation, Link } from "react-router-dom";
import { Select, MenuItem, Checkbox, InputLabel, FormControl, Input, FormHelperText, Button } from "@mui/material";
import _ from "lodash";

import { initialState, reducer } from "./lib";
import classes from "./styles.module.css";

const LinearRegression = (props) => {
    const { state: data } = useLocation();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    };

    return (
        <>
            <h2>Linear Regression</h2>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl sx={{ display: "block", marginTop: 2 }}>
                    <InputLabel id="predictionLabel">Predict</InputLabel>
                    <Select
                        sx={{ minWidth: 300 }}
                        labelId="predictionLabel"
                        id="prediction"
                        value={state.labels[0]}
                        label="Predict"
                        onChange={(e) => dispatch({ type: "setPredictionLabel", payload: e.target.value })}
                    >
                        {data.headers
                            .filter((x) => !x.isFeature)
                            .map((v) => (
                                <MenuItem key={v.fieldName} sx={{ textTransform: "capitalize" }} value={v.fieldName}>
                                    {v.fieldName}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ display: "block", marginTop: 2 }}>
                    <InputLabel htmlFor="splitTest">Split Test</InputLabel>
                    <Input
                        sx={{ minWidth: 300 }}
                        id="splitTest"
                        type="number"
                        required
                        onChange={(e) => dispatch({ type: "setSplitTest", payload: e.target.value })}
                        value={state.splitTest}
                        aria-describedby="split test"
                    />
                </FormControl>
                <Button sx={{ display: "block", marginTop: 2, marginBottom: 2 }} type="submit" variant="contained">
                    Submit
                </Button>
            </form>
            <Link to={`/`}>Back</Link>
        </>
    );
};

export { LinearRegression };
