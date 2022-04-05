import React, { useState, useCallback, useReducer } from "react";
import { useLocation, Link } from "react-router-dom";
import classes from "./styles.module.css";
import shuffleSeed from "shuffle-seed";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { Input } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import _ from "lodash";

import { reducer, initialState } from "./lib";
import { LinearRegression, useActions } from "./lib";

const ProcessData = () => {
    const { state } = useLocation();
    const { initialFeatures, initialLabels, featurePredictionData, initReducer } = useActions(state);
    const [reducerState, dispatch] = useReducer(reducer, initialState, initReducer);

    const handleSubmit = (event) => {
        event.preventDefault();
        calculatePrediction();
    };

    const onChange = (i, event) => {
        const updatedInputs = [...reducerState.featureInputs];
        updatedInputs[i] = parseFloat(event.target.value);
        dispatch({ type: "setFeatureInputs", payload: updatedInputs });
    };

    const calculatePrediction = useCallback(() => {
        try {
            dispatch({ type: "setLoading", payload: true });
            let features, labels, testFeatures, testLabels;
            features = initialFeatures;
            labels = initialLabels;
            const { learningRate, iterations, batchSize } = state.options;

            if (state.options.shuffle) {
                features = shuffleSeed.shuffle(features, "phrase");
                labels = shuffleSeed.shuffle(labels, "phrase");
            }

            const regression = new LinearRegression(features, labels, { learningRate, iterations, batchSize });
            if (state.options.splitTest) {
                const trainSize = _.isNumber(state.options.splitTest)
                    ? state.options.splitTest
                    : Math.floor(features.length / 2);
                features = features.slice(trainSize);
                labels = labels.slice(trainSize);
                testFeatures = features.slice(0, trainSize);
                testLabels = labels.slice(0, trainSize);
                dispatch({ type: "setR2", payload: regression.test(testFeatures, testLabels) });
            }

            regression.train();

            const predictedValue = regression.predict([reducerState.featureInputs]).arraySync()[0][0];
            dispatch({ type: "setLabelPrediction", payload: predictedValue });
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }, [reducerState.featureInputs, initialFeatures, initialLabels, state.options]);

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
                                            onChange={onChange.bind(this, i)}
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
                <>
                    <Alert className={classes.alert} severity="info">
                        <strong>
                            Your R2 value is:&nbsp;
                            <span className={classes.highlight}>{reducerState.r2.toFixed(2)}</span>
                        </strong>
                    </Alert>
                    <Alert className={classes.alert} severity="success">
                        <strong>
                            Your predicted value for&nbsp;
                            <span className={classes.capitalize}>{state.options.labels.join(", ")}</span> is:&nbsp;
                            <span className={classes.highlight}>{reducerState.labelPrediction.toFixed(2)}</span>
                        </strong>
                    </Alert>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export { ProcessData };
