import React from "react";
import { Link } from "react-router-dom";
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
    FormControl,
} from "@mui/material";

import classes from "./styles.module.css";

const LoadOptions = ({ linRegState, linRegDispatch, ...props }) => {
    const handleSubmit = () => {
        linRegDispatch({
            type: "setFeatureInputs",
            payload: linRegState.featureSelectorHeaders.filter((x) => x.isFeature).map((x) => 0),
        });
        linRegDispatch({ type: "incrementActiveStep" });
    };

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
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Select
                                            required
                                            sx={{ minWidth: 300 }}
                                            value={linRegState.options.labels[0]}
                                            onChange={(e) => {
                                                linRegDispatch({ type: "setPredictionLabel", payload: e.target.value });
                                            }}
                                        >
                                            {linRegState.featureSelectorHeaders
                                                .filter((x) => !x.isFeature && x.isNumeric)
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
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Split Test</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Input
                                            sx={{ minWidth: 300 }}
                                            type="number"
                                            inputProps={{
                                                step: "1",
                                                min: 0,
                                                max: 1000,
                                            }}
                                            required
                                            onChange={(e) =>
                                                linRegDispatch({ type: "setSplitTest", payload: e.target.value })
                                            }
                                            value={linRegState.options.splitTest}
                                            aria-describedby="split test"
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Shuffle</TableCell>
                                <TableCell>
                                    <Checkbox
                                        onChange={(e) =>
                                            linRegDispatch({ type: "setShuffle", payload: e.target.checked })
                                        }
                                        checked={linRegState.options.shuffle}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Learning Rate</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Input
                                            sx={{ minWidth: 300 }}
                                            type="number"
                                            inputProps={{
                                                step: "0.1",
                                                min: 0.1,
                                                max: 3,
                                            }}
                                            required
                                            onChange={(e) =>
                                                linRegDispatch({ type: "setLearningRate", payload: e.target.value })
                                            }
                                            value={linRegState.options.learningRate}
                                            aria-describedby="learning rate"
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Iterations</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Input
                                            sx={{ minWidth: 300 }}
                                            type="number"
                                            inputProps={{
                                                min: 1,
                                                max: 1000,
                                            }}
                                            required
                                            onChange={(e) =>
                                                linRegDispatch({ type: "setIterations", payload: e.target.value })
                                            }
                                            value={linRegState.options.iterations}
                                            aria-describedby="iterations"
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>Batch Size</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Input
                                            sx={{ minWidth: 300 }}
                                            type="number"
                                            inputProps={{
                                                min: 1,
                                                max: 1000,
                                            }}
                                            required
                                            onChange={(e) =>
                                                linRegDispatch({ type: "setBatchSize", payload: e.target.value })
                                            }
                                            value={linRegState.options.batchSize}
                                            aria-describedby="batch size"
                                        />
                                    </FormControl>
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
