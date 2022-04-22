import React, { useReducer } from "react";
import { Input } from "@mui/material";
import { reducer, useActions, initialState } from "./lib/reducer";
import { FeatureSelector } from "../";
import classes from "./styles.module.css";

const LoadCsv = ({ linRegState, linRegDispatch, ...props }) => {
    useActions(linRegState, linRegDispatch);

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
                        onChange={(event) => linRegDispatch({ type: "setFileInput", payload: event.target.files[0] })}
                        name="csvFile"
                    />
                </label>
            </form>
            {/* {linRegState.fileInput ? <FeatureSelector data={{ headers: linRegState.csvHeaders, rows: linRegState.csvData }} /> : ""} */}
            {linRegState.fileInput ? (
                <FeatureSelector linRegState={linRegState} linRegDispatch={linRegDispatch} />
            ) : (
                ""
            )}
        </>
    );
};

export { LoadCsv };
