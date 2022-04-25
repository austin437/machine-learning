import React from "react";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

const Instructions = ({ type }) => {
    let component;

    switch (type) {
        case "linear-regression":
            component = (
                <>
                    <Typography variant="h3" component="div" gutterBottom>
                        Linear Regression
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Step 1: Load Csv
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Step 2: Load Options
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Step 3: Process Data
                    </Typography>
                </>
            );
            break;
        default:
            throw new Error("Please provide a type prop");
    }

    return component;
};

Instructions.propTypes = {
    type: PropTypes.string.isRequired,
};

export { Instructions };
