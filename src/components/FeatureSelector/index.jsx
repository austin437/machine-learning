import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import _ from "lodash";

import classes from "./styles.module.css";

const FeatureSelector = ({ state, dispatch, ...props }) => {
    const [dataValues, setDataValues] = useState([]);

    const headers = useMemo(
        () =>
            state.csvHeaders.map((v, i) => ({
                fieldName: v,
                isNumeric: !isNaN(parseInt(state.csvData[0][i])),
                isFeature: false,
            })),
        [state.csvHeaders, state.csvData]
    );

    useEffect(() => {
        setDataValues(headers);
    }, [headers]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: "setFeatureSelectorHeaders", payload: dataValues });
        dispatch({ type: "incrementActiveStep" });
    };

    const handleInputChange = (row) => {
        const rowIndex = dataValues.findIndex((v) => v.fieldName === row.fieldName, row.fieldName);
        const updatedRow = { ...dataValues[rowIndex], isFeature: !dataValues[rowIndex].isFeature };
        const newDataValues = _.cloneDeep(dataValues);
        newDataValues[rowIndex] = updatedRow;
        setDataValues(newDataValues);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TableContainer sx={{ marginBottom: 2 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Feature table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Feature</TableCell>
                                <TableCell>Is Numeric?</TableCell>
                                <TableCell align="center">Feature?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataValues.map((row) => (
                                <TableRow
                                    key={row.fieldName}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell sx={{ textTransform: "uppercase" }}>{row.fieldName}</TableCell>
                                    <TableCell sx={{ textTransform: "capitalize" }}>
                                        {row.isNumeric ? "TRUE" : "FALSE"}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            disabled={!row.isNumeric}
                                            disableRipple
                                            onChange={(e) => {
                                                handleInputChange(row);
                                            }}
                                            checked={row.isFeature}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </form>
        </>
    );
};

FeatureSelector.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export { FeatureSelector };
