import React, { useReducer } from "react";
import { CustomStepper } from "../CustomStepper";
import { initialState, reducer } from "./lib";
import { LoadCsv, Instructions } from "../../components";


const LinearRegression = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let component;

    switch (state.activeStep) {        
        case 1:
            component = <LoadCsv linRegState={state} linRegDispatch={dispatch} />;
            break;
        case 0:
        default:
            component = <Instructions type="linear-regression" />;
    }

    return (
        <>
            <CustomStepper linRegState={state} linRegDispatch={dispatch} />
            <p>Active Step: {state.activeStep}</p>
            <br/>
            {component}
        </>
    );
};

export { LinearRegression };
