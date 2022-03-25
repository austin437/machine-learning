import React, { useReducer } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    Select,
    MenuItem,
    Checkbox,
    Input,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@mui/material";

import { initialState, reducer } from "./lib";
import classes from "./styles.module.css";

const LoadOptions = (props) => {
    const { state: data } = useLocation();
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();   

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/process-data", { state: { options: state, data: data } });
    };

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    return (
        <>
            <h2>Choose Options</h2>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TableContainer sx={{ marginBottom: 2 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Feature table">
                        <TableBody>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Prediction</TableCell>
                                <TableCell>
                                    <Select
                                        required
                                        sx={{ minWidth: 300 }}
                                        value={state.labels[0]}
                                        onChange={(e) =>
                                            dispatch({ type: "setPredictionLabel", payload: e.target.value })
                                        }
                                    >
                                        {data.headers
                                            .filter((x) => !x.isFeature)
                                            .map((v) => (
                                                <MenuItem
                                                    key={v.fieldName}
                                                    sx={{ textTransform: "capitalize" }}
                                                    value={v.fieldName}
                                                >
                                                    {v.fieldName}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Split Test</TableCell>
                                <TableCell>
                                    <Input
                                        sx={{ minWidth: 300 }}
                                        type="number"
                                        inputProps={{
                                            min: 1,
                                        }}
                                        required
                                        onChange={(e) => dispatch({ type: "setSplitTest", payload: e.target.value })}
                                        value={state.splitTest}
                                        aria-describedby="split test"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Shuffle</TableCell>
                                <TableCell>
                                    <Checkbox
                                        {...label}
                                        onChange={(e) => dispatch({ type: "setShuffle", payload: e.target.checked })}
                                        checked={state.shuffle}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Learning Rate</TableCell>
                                <TableCell>
                                    <Input
                                        sx={{ minWidth: 300 }}
                                        type="number"
                                        inputProps={{
                                            step: "0.1",
                                            min: 0.1,
                                            max: 3,
                                        }}
                                        required
                                        onChange={(e) => dispatch({ type: "setLearningRate", payload: e.target.value })}
                                        value={state.learningRate}
                                        aria-describedby="learning rate"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Iterations</TableCell>
                                <TableCell>
                                    <Input
                                        sx={{ minWidth: 300 }}
                                        type="number"
                                        inputProps={{
                                            min: 1,
                                            max: 1000,
                                        }}
                                        required
                                        onChange={(e) => dispatch({ type: "setIterations", payload: e.target.value })}
                                        value={state.iterations}
                                        aria-describedby="iterations"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Batch Size</TableCell>
                                <TableCell>
                                    <Input
                                        sx={{ minWidth: 300 }}
                                        type="number"
                                        inputProps={{
                                            min: 1,
                                            max: 1000,
                                        }}
                                        required
                                        onChange={(e) => dispatch({ type: "setBatchSize", payload: e.target.value })}
                                        value={state.batchSize}
                                        aria-describedby="batch size"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button sx={{ display: "block", marginTop: 2, marginBottom: 2 }} type="submit" variant="contained">
                    Submit
                </Button>
            </form>
            <Link to={`/`}>Back</Link>
        </>
    );
};

export { LoadOptions };
