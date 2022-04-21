import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["Load CSV", "Load Options", "Process Data"];

const CustomStepper = ({ parentState, parentDispatch, ...props }) => {
    const handleNext = () => {
        parentDispatch({ type: "incrementActiveStep", payload: parentState.activeStep + 1 });
    };

    const handleBack = () => {
        parentDispatch({ type: "decrementActiveStep", payload: parentState.activeStep - 1 });
    };

    const handleReset = () => {
        parentDispatch({ type: "resetActiveStep", payload: 0 });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={parentState.activeStep}>
                {steps.map((step, index) => {
                    return (
                        <Step key={step} completed={parentState.activeStep > index}>
                            <StepLabel optional={false}>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {parentState.activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All state completed - you&apos;re finished</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {parentState.activeStep + 1}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={parentState.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext}>
                            {parentState.activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

export { CustomStepper };
