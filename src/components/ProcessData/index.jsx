import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableRow, TableHead, TableCell, TableContainer, Input, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import { useActions, useLinearRegression, AlertContainer } from "./lib";

const ProcessData = ({ state, dispatch, ...props }) => {
    const { initialFeatures, initialLabels, featurePredictionData } = useActions(state);
    const { calculatePrediction } = useLinearRegression(
        state.featureInputs,
        dispatch,
        initialFeatures,
        initialLabels,
        state.options
    );

    useEffect(() => {
        dispatch({ type: "setFeatureInputs", payload: featurePredictionData.map((v) => v.average) });
    }, []);

    const onInputChange = (i, event) => {
        const updatedInputs = [...state.featureInputs];
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
                                            value={state.featureInputs[i]}
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
                    <LoadingButton loading={state.loading} type="submit" variant="contained">
                        Calculate &nbsp; <span className={classes.capitalize}>{state.options.labels.join(", ")}</span>
                    </LoadingButton>
                </div>
            </form>
            {state.r2 != null && state.labelPrediction != null ? (
                <AlertContainer r2={state.r2} labels={state.options.labels} labelPrediction={state.labelPrediction} />
            ) : (
                ""
            )}
        </>
    );
};

ProcessData.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export { ProcessData };
