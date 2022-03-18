import React, { useState } from "react";
import "./App.css";
import { Button, Input } from "@mui/material";

const App = () => {
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
        <div className="App">
            <div className="callout">
                <p>Please select a CSV file</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload CSV:
                    <Input className="file-input" type="file" onChange={handleChange} name="csvFile" />
                </label>
                <Button disabled={fileInput === null} variant="contained" type="submit">
                    Submit
                </Button>
            </form>
            <pre>{fileData}</pre>
        </div>
    );
};

export default App;
