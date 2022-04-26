import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { CustomStepper } from "../CustomStepper";
import { initialState, reducer } from "./lib";
import { Instructions, LoadCsv, LoadOptions, ProcessData, Finish } from "../../components";

const LinearRegression = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const disableNext = useMemo(() => {
        return state.stepper.stepsToDisableNextOn.filter((x) => x === state.stepper.activeStep).length > 0;
    }, [state.stepper.stepsToDisableNextOn, state.stepper.activeStep]);

    let component;

    switch (state.stepper.activeStep) {
        case 1:
            component = <LoadCsv state={state} dispatch={dispatch} />;
            break;
        case 2:
            component = <LoadOptions state={state} dispatch={dispatch} />;
            break;
        case 3:
            component = <ProcessData state={state} dispatch={dispatch} />;
            break;
        case 4:
            component = <Finish name="Linear Regression" />;
            break;
        case 0:
        default:
            component = <Instructions type="linear-regression" />;
    }

    const resetState = useCallback(() => {
        if (state.stepper.activeStep === 0) {
            dispatch({ type: "resetState", payload: initialState });
        }
    }, [state.stepper.activeStep]);

    useEffect(() => {
        resetState();
    }, [resetState]);

    return (
        <>
            <CustomStepper state={state} dispatch={dispatch} disableNext={disableNext} />
            <br />
            {component}
        </>
    );
};

export { LinearRegression };
