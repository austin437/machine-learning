import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const FeatureSelector = ({ data, ...props }) => {
    const [checked, setChecked] = React.useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements);
    };

    const handleInputChange = (event) => {};

    const rows = [
        { fieldName: "MPG", dataType: "number" },
        { fieldName: "HorsePower", dataType: "number" },
        { fieldName: "Weight", dataType: "string" },
        { fieldName: "Acceleration", dataType: "number" },
    ];

    return (
        <>
            <pre>{data.headers.map((v) => v + "\n")}</pre>

            <form className={classes.form} onSubmit={handleSubmit}>
                <TableContainer sx={{ marginBottom: 2 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Feature</TableCell>
                                <TableCell>Data type</TableCell>
                                <TableCell align="center">Use</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.fieldName}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>{row.fieldName}</TableCell>
                                    <TableCell sx={{ textTransform: "capitalize" }}>{row.dataType}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox onChange={handleInputChange} />
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
    data: PropTypes.shape({
        headers: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }),
};

export { FeatureSelector };
