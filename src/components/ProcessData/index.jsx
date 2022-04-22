import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableRow, TableHead, TableCell, TableContainer, Input, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import classes from "./styles.module.css";
import { useActions, useLinearRegression, AlertContainer } from "./lib";

const ProcessData = ({ linRegState, linRegDispatch, ...props }) => {
    const { initialFeatures, initialLabels, featurePredictionData } = useActions(linRegState);
    const { calculatePrediction } = useLinearRegression(
        linRegState.featureInputs,
        linRegDispatch,
        initialFeatures,
        initialLabels,
        linRegState.options
    );

    useEffect(() => {
        linRegDispatch({ type: "setFeatureInputs", payload: featurePredictionData.map((v) => v.average) });
    }, []);

    const onInputChange = (i, event) => {
        const updatedInputs = [...linRegState.featureInputs];
        updatedInputs[i] = parseFloat(event.target.value);
        linRegDispatch({ type: "setFeatureInputs", payload: updatedInputs });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            linRegDispatch({ type: "setLoading", payload: true });
            calculatePrediction();
        } catch (e) {
            console.log(e);
        } finally {
            linRegDispatch({ type: "setLoading", payload: false });
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
                                            value={linRegState.featureInputs[i]}
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
                    <LoadingButton loading={linRegState.loading} type="submit" variant="contained">
                        Calculate &nbsp;{" "}
                        <span className={classes.capitalize}>{linRegState.options.labels.join(", ")}</span>
                    </LoadingButton>
                </div>
            </form>
            {linRegState.r2 != null && linRegState.labelPrediction != null ? (
                <AlertContainer
                    r2={linRegState.r2}
                    labels={linRegState.options.labels}
                    labelPrediction={linRegState.labelPrediction}
                />
            ) : (
                ""
            )}
        </>
    );
};

export { ProcessData };
