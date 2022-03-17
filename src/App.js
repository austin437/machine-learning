import "./App.css";
import React from "react";
import Button from "@mui/material/Button";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="callout">
                    <p>Please select a CSV file</p>
                </div>
                <Button variant="contained">Add CSV File</Button>
            </div>
        );
    }
}

export default App;
