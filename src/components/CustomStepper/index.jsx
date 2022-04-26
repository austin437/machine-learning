import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const CustomStepper = ({ state, dispatch, disableNext, ...props }) => {
    const handleNext = () => {
        dispatch({ type: "incrementActiveStep", payload: state.stepper.activeStep + 1 });
    };

    const handleBack = () => {
        dispatch({ type: "decrementActiveStep", payload: state.stepper.activeStep - 1 });
    };

    const handleReset = () => {
        dispatch({ type: "resetActiveStep", payload: 0 });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={state.stepper.activeStep}>
                {state.stepper.steps.map((step, index) => {
                    return (
                        <Step key={step} completed={state.stepper.activeStep > index}>
                            <StepLabel optional={false}>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {state.stepper.activeStep === state.stepper.steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All state completed - you&apos;re finished</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {state.stepper.activeStep + 1}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={state.stepper.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext} disabled={disableNext}>
                            {state.stepper.activeStep === state.stepper.steps.length - 1
                                ? "Finish"
                                : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

CustomStepper.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    disableNext: PropTypes.bool.isRequired,
};

export { CustomStepper };
