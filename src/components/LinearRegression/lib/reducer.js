import _ from "lodash";

function reducer(state, action) {

    const newState = _.cloneDeep(state);

    switch (action.type) {
        case "incrementActiveStep":
            return { ...newState, activeStep: state.activeStep + 1 };
        case "decrementActiveStep":
            return { ...newState, activeStep: state.activeStep - 1 };
        case "resetActiveStep":
            return { ...newState, activeStep: 0 };
        case "setFileInput":
            return { ...newState, fileInput: action.payload };
        case "setCsvHeaders":
            return { ...newState, csvHeaders: action.payload };
        case "setFeatureSelectorHeaders":
            return { ...newState, featureSelectorHeaders: action.payload };
        case "setCsvData":
            return { ...newState, csvData: action.payload };
        default:
            return new Error();
    }
}

export { reducer };
