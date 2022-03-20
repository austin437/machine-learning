import React, { useReducer, useEffect } from "react";
import { Input } from "@mui/material";
import classes from "./styles.module.css";

import { reducer, useActions, initialState } from "./lib/reducer";

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
            <pre>{state.csvHeaders.map((v) => v + "\n")}</pre>
        </>
    );
};

export { LoadCsv };
