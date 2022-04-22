import React from "react";
import Typography from "@mui/material/Typography";

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
                        Step 1: body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                        suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Step 2: 
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                        suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                </>
            );
            break;
        default:
            throw new Error("Please provide a type prop");
    }

    return component;
};

export { Instructions };
