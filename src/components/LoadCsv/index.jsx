import React, { useReducer } from "react";
import { Input } from "@mui/material";
import { reducer, useSideEffects, initialState } from "./lib/reducer";
import { FeatureSelector } from "../";
import classes from "./styles.module.css";

const LoadCsv = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useSideEffects(state, dispatch);

    return (
        <>
            <div className={classes.callout}>
                <p>Please select a CSV file</p>
            </div>
            <form>
                <label>
                    Upload CSV:
                    <Input
                        className={classes.fileInput}
                        type="file"
                        onChange={(event) => dispatch({ type: "setFileInput", payload: event.target.files[0] })}
                        name="csvFile"
                    />
                </label>
            </form>
            {state.fileInput ? <FeatureSelector data={{ headers: state.csvHeaders, rows: state.csvData }} /> : ""}
        </>
    );
};

export { LoadCsv };
