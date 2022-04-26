import React from "react";
import { Input } from "@mui/material";
import { useActions } from "./lib/useActions";
import { FeatureSelector } from "../";
import classes from "./styles.module.css";
import PropTypes from "prop-types";

const LoadCsv = ({ state, dispatch, ...props }) => {
    useActions(state, dispatch);

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
            {state.fileInput ? <FeatureSelector state={state} dispatch={dispatch} /> : ""}
        </>
    );
};

LoadCsv.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export { LoadCsv };
