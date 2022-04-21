function reducer(state, action) {
    switch (action.type) {       
        case "incrementActiveStep":
            return { ...state, activeStep: state.activeStep + 1 };
        case "decrementActiveStep":
            return { ...state, activeStep: state.activeStep - 1 };
        case "resetActiveStep":
            return {...state, activeStep: 0};
        default:
            return new Error();
    }
}

export { reducer };
