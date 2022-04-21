import React, { useReducer } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { reducer, initialState } from "./lib";

//const state = ["Load CSV", "Load Options", "Process Data"];

const CustomStepper = ({activeStep, setActiveStep, ...props}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleNext = () => {        
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch({ type: "goToNext", payload: activeStep + 1 });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {state.map((step, index) => {
                    // stepProps to make active, inactive
                    // maybe turn into step object...
                    // add reducer...
                    const stepProps = { completed: false };
                    const labelProps = { optional: false };

                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === state.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All state completed - you&apos;re finished</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext}>{activeStep === state.length - 1 ? "Finish" : "Next"}</Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

export { CustomStepper };
