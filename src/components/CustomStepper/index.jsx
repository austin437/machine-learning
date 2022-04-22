import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["Instructions", "Load CSV", "Load Options", "Process Data"];

const CustomStepper = ({ linRegState, linRegDispatch, ...props }) => {
    const handleNext = () => {
        linRegDispatch({ type: "incrementActiveStep", payload: linRegState.activeStep + 1 });
    };

    const handleBack = () => {
        linRegDispatch({ type: "decrementActiveStep", payload: linRegState.activeStep - 1 });
    };

    const handleReset = () => {
        linRegDispatch({ type: "resetActiveStep", payload: 0 });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={linRegState.activeStep}>
                {steps.map((step, index) => {
                    return (
                        <Step key={step} completed={linRegState.activeStep > index}>
                            <StepLabel optional={false}>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {linRegState.activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All state completed - you&apos;re finished</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {linRegState.activeStep + 1}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={linRegState.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext}>
                            {linRegState.activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

export { CustomStepper };
