import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import classes from "./styles.module.css";
import shuffleSeed from "shuffle-seed";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, speedDialActionClasses } from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";

import { LinearRegression, useActions } from "./lib";

const ProcessData = () => {
    const { state } = useLocation();
    const [output, setOutput] = useState("{}");
    const { initialFeatures, initialLabels, featureHeaders } = useActions(state);

    console.log(state);
    console.log("features", initialFeatures);
    console.log("labels", initialLabels);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        let features, labels, testFeatures, testLabels;
        // const { learningRate, iterations, batchSize } = state.options;
        // if (state.options.shuffle) {
        //     features = shuffleSeed.shuffle(features, "phrase");
        //     labels = shuffleSeed.shuffle(labels, "phrase");
        // }
        // const regression = new LinearRegression(features, labels, { learningRate, iterations, batchSize }, setOutput);
        // if (state.options.splitTest) {
        //     const trainSize = _.isNumber(state.options.splitTest)
        //         ? state.options.splitTest
        //         : Math.floor(features.length / 2);
        //     features = features.slice(trainSize);
        //     labels = labels.slice(trainSize);
        //     testFeatures = features.slice(0, trainSize);
        //     testLabels = labels.slice(0, trainSize);
        // }
        // regression.train();
        // regression.test(testFeatures, testLabels);
        // regression
        //     .predict([
        //         [120, 2, 380],
        //         [135, 2.18, 420],
        //     ])
        //     .print();
    }, [state]);

    return (
        <>
            <h1>Process data</h1>
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
                            {featureHeaders.map((row, i) => (
                                <TableRow
                                    key={row.fieldName}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell sx={{ textTransform: "uppercase" }}>{row.fieldName}</TableCell>
                                    <TableCell align="right">
                                        {_.mean(initialFeatures.map((v) => v[i])).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Input
                                            type="number"
                                            inputProps={{
                                                step: "0.1",
                                                min: 0,
                                            }}
                                            placeholder="Enter Number"
                                            required
                                            onChange={(e) => console.log("onChange")}
                                            aria-describedby="feature-value"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button type="submit" variant="contained">
                    Submit*
                </Button>
            </form>

            <p>
                *clicking submit will calculate the predicted value for&nbsp;
                <span className={classes.capitalize}>{state.options.labels.join(", ")}</span>
            </p>

            <pre className={classes.pre}>{output}</pre>
            <Link to={`/`}>Back</Link>
        </>
    );
};

export { ProcessData };
