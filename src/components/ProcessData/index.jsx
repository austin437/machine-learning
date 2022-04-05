import React, { useEffect, useReducer } from "react";
import { useLocation, Link } from "react-router-dom";
import { Table, TableBody, TableRow, TableHead, TableCell, TableContainer, Input, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import classes from "./styles.module.css";
import { reducer, initialState, useActions, useLinearRegression, AlertContainer } from "./lib";

const ProcessData = () => {
    const { state } = useLocation();
    const [reducerState, dispatch] = useReducer(reducer, state, initialState);
    const { initialFeatures, initialLabels, featurePredictionData } = useActions(state);
    const { calculatePrediction } = useLinearRegression(
        reducerState.featureInputs,
        dispatch,
        initialFeatures,
        initialLabels,
        state.options
    );

    useEffect(() => {
        dispatch({ type: "setFeatureInputs", payload: featurePredictionData.map((v) => v.average) });
    }, [featurePredictionData]);

    const onInputChange = (i, event) => {
        const updatedInputs = [...reducerState.featureInputs];
        updatedInputs[i] = parseFloat(event.target.value);
        dispatch({ type: "setFeatureInputs", payload: updatedInputs });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            dispatch({ type: "setLoading", payload: true });
            calculatePrediction();
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    };

    return (
        <>
            <h1>Process data</h1> <Link to={`/`}>Back</Link>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TableContainer sx={{ marginBottom: 2 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Feature table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Feature</TableCell>
                                <TableCell align="right">Average</TableCell>
                                <TableCell align="center">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {featurePredictionData.map((row, i) => (
                                <TableRow
                                    key={row.fieldName}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell sx={{ textTransform: "uppercase" }}>{row.fieldName}</TableCell>
                                    <TableCell align="right">{row.average}</TableCell>
                                    <TableCell align="center">
                                        <Input
                                            type="number"
                                            inputProps={{
                                                step: "0.01",
                                                min: 0,
                                            }}
                                            value={reducerState.featureInputs[i]}
                                            placeholder="Enter Number"
                                            required
                                            onChange={onInputChange.bind(this, i)}
                                            aria-describedby="feature-value"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.buttonContainer}>
                    <LoadingButton loading={reducerState.loading} type="submit" variant="contained">
                        Calculate &nbsp; <span className={classes.capitalize}>{state.options.labels.join(", ")}</span>
                    </LoadingButton>
                </div>
            </form>
            {reducerState.r2 != null && reducerState.labelPrediction != null ? (
                <AlertContainer
                    r2={reducerState.r2}
                    labels={state.options.labels}
                    labelPrediction={reducerState.labelPrediction}
                />
            ) : (
                ""
            )}
        </>
    );
};

export { ProcessData };
