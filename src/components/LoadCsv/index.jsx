import React, { useReducer, useEffect } from "react";
import { Input } from "@mui/material";
import { reducer, useActions, initialState } from "./lib/reducer";
import { FeatureSelector } from "../";
import classes from "./styles.module.css";

const LoadCsv = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { handleFileChange, setCsvHeaders, setCsvData } = useActions(state, dispatch);

    useEffect(() => {
        setCsvHeaders();
    }, [setCsvHeaders]);

    useEffect(() => {
        setCsvData();
    }, [setCsvData]);

    return (
        <>
            <div className={classes.callout}>
                <p>Please select a CSV file</p>
            </div>
            <form>
                <label>
                    Upload CSV:
                    <Input className={classes.fileInput} type="file" onChange={handleFileChange} name="csvFile" />
                </label>
            </form>
            {state.fileInput ? <FeatureSelector data={{ headers: state.csvHeaders, rows: state.csvData }} /> : ""}
        </>
    );
};

export { LoadCsv };
