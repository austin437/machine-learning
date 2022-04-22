import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["Instructions", "Load CSV", "Load Options", "Process Data"];

const CustomStepper = ({ LRState, LRDispatch, ...props }) => {
    const handleNext = () => {
        LRDispatch({ type: "incrementActiveStep", payload: LRState.activeStep + 1 });
    };

    const handleBack = () => {
        LRDispatch({ type: "decrementActiveStep", payload: LRState.activeStep - 1 });
    };

    const handleReset = () => {
        LRDispatch({ type: "resetActiveStep", payload: 0 });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={LRState.activeStep}>
                {steps.map((step, index) => {
                    return (
                        <Step key={step} completed={LRState.activeStep > index}>
                            <StepLabel optional={false}>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {LRState.activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All state completed - you&apos;re finished</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {LRState.activeStep + 1}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={LRState.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext}>
                            {LRState.activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

export { CustomStepper };
