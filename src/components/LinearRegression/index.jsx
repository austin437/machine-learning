import React, { useState } from "react";
import { CustomStepper } from "../Stepper";

const LinearRegression = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <>
            <CustomStepper activeStep={activeStep} setActiveStep={setActiveStep} />
            <p>Active Step: {activeStep}</p>
        </>
    );
};

export { LinearRegression };
