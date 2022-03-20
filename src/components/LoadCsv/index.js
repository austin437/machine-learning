import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import classes from "./styles.module.css";
import { loadCSV as LoadCsvHelper } from "../../helpers";

const LoadCsv = (props) => {
    const [fileInput, setfileInput] = useState(null);
    const [fileData, setFileData] = useState("{}");

    const readDataFromFile = () => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const str = event.target.result;
            const rows = str.split("\n", 15);
            setFileData(rows.join("\n") + "\n...");
        };
        reader.readAsText(fileInput);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        readDataFromFile();
    };

    const handleChange = (event) => {
        setfileInput(event.target.files[0]);
    };
    return (
        <>
            <div className={classes.callout}>
                <p>Please select a CSV file</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload CSV:
                    <Input className={classes.fileInput} type="file" onChange={handleChange} name="csvFile" />
                </label>
                <Button disabled={fileInput === null} variant="contained" type="submit">
                    Submit
                </Button>
            </form>
            <pre className={classes.pre}>{fileData}</pre>
        </>
    );
};

export { LoadCsv };
