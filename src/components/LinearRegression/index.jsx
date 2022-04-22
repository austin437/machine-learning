import React, { useReducer } from "react";
import { CustomStepper } from "../CustomStepper";
import { initialState, reducer } from "./lib";
import { LoadCsv, Instructions } from "../../components";


const LinearRegression = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let component;

    switch (state.activeStep) {        
        case 1:
            component = <LoadCsv />;
            break;
        case 0:
        default:
            component = <Instructions type="linear-regression" />;
    }

    return (
        <>
            <CustomStepper LRState={state} LRDispatch={dispatch} />
            <p>Active Step: {state.activeStep}</p>
            <br/>
            {component}
        </>
    );
};

export { LinearRegression };
