import React, { useState, createRef } from "react";
import "./App.css";
import { Button, Input } from "@mui/material";

const App = () => {

    const fileInput = createRef();
    const [filePath, setFilePath] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(filePath);
    };

    const handleChange = (event) => {
        setFilePath(event.target.files[0]);
    }

    return (
        <div className="App">
            <div className="callout">
                <p>Please select a CSV file</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload CSV:
                    <Input type="file" onChange={handleChange} ref={fileInput} name="csvFile" />
                </label>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default App;
