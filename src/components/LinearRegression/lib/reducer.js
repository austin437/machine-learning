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
        case "setPredictionLabel":
            return { ...state, labels: [action.payload] };
        case "setSplitTest":
            return { ...state, splitTest: action.payload };
        case "setShuffle":
            return { ...state, shuffle: action.payload };
        case "setLearningRate":
            return { ...state, learningRate: action.payload };
        case "setIterations":
            return { ...state, iterations: action.payload };
        case "setBatchSize":
            return { ...state, batchSize: action.payload };
        default:
            return new Error();
    }
}

export { reducer };
