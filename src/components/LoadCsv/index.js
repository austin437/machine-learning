import React, { useReducer, useEffect, useCallback } from "react";
import { Button, Input } from "@mui/material";
import classes from "./styles.module.css";
import { loadCSV as LoadCsvHelper } from "../../helpers";

const initialState = { fileInput: null, fileData: "{}" };

function reducer(state, action) {
    switch (action.type) {
        case "setFileInput":
            return { ...state, fileInput: action.payload };
        case "setFileData":
            return { ...state, fileData: action.payload };
        default:
            throw new Error();
    }
}

function useActions(state, dispatch) {
    const readDataFromFile = useCallback(() => {
        if (state.fileInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const str = event.target.result;
                const rows = str.split("\n", 15);
                dispatch({ type: "setFileData", payload: rows.join("\n") + "\n..." });
            };
            reader.readAsText(state.fileInput);
        }
    }, [state.fileInput]);

    useEffect(() => {
        readDataFromFile();
    }, [readDataFromFile]);

    const handleFileChange = (event) => {
        dispatch({ type: "setFileInput", payload: event.target.files[0] });
    };

    return { handleFileChange };
}

const LoadCsv = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { handleFileChange } = useActions(state, dispatch);

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
            <pre className={classes.pre}>{state.fileData}</pre>
        </>
    );
};

export { LoadCsv };
