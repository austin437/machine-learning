import React, { useReducer } from "react";
import { CustomStepper } from "../CustomStepper";
import { initialState, reducer } from "./lib";

const LinearRegression = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <CustomStepper parentState={state} parentDispatch={dispatch} />
            <p>Active Step: {state.activeStep}</p>
        </>
    );
};

export { LinearRegression };
