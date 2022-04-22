import React, { useReducer, useEffect, useCallback } from "react";
import { CustomStepper } from "../CustomStepper";
import { initialState, reducer } from "./lib";
import { Instructions, LoadCsv, LoadOptions, ProcessData } from "../../components";

const LinearRegression = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let component;

    switch (state.activeStep) {
        case 1:
            component = <LoadCsv linRegState={state} linRegDispatch={dispatch} />;
            break;
        case 2:
            component = <LoadOptions linRegState={state} linRegDispatch={dispatch} />;
            break;
        case 3:
            component = <ProcessData linRegState={state} linRegDispatch={dispatch} />;
            break;
        case 0:
        default:
            component = <Instructions type="linear-regression" />;
    }

    const resetState = useCallback(() => {
        if (state.activeStep === 0) {
            dispatch({ type: "resetState", payload: initialState });
        }
    }, [state.activeStep]);

    useEffect(() => {
        resetState();
    }, [resetState]);

    return (
        <>
            <CustomStepper linRegState={state} linRegDispatch={dispatch} />
            <p>Active Step: {state.activeStep}</p>
            <br />
            {component}
        </>
    );
};

export { LinearRegression };
