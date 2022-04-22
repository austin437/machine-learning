import _ from "lodash";

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    const newOptions = newState.options;

    switch (action.type) {
        case "resetState": 
            return {...action.payload};
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
            newOptions.labels = [action.payload];
            return { ...newState, options: newOptions };
        case "setSplitTest":
            newOptions.splitTest = action.payload;
            return { ...newState, options: newOptions };
        case "setShuffle":
            newOptions.shuffle = action.payload;
            return { ...newState, options: newOptions };
        case "setLearningRate":
            newOptions.learningRate = action.payload;
            return { ...newState, options: newOptions };
        case "setIterations":
            newOptions.iterations = action.payload;
            return { ...newState, options: newOptions };
        case "setBatchSize":
            newOptions.batchSize = action.payload;
            return { ...newState, options: newOptions };
        case "setFeatureInputs":
            return { ...newState, featureInputs: action.payload };
        case "setR2":
            return { ...newState, r2: action.payload };
        case "setLabelPrediction":
            return { ...newState, labelPrediction: action.payload };
        case "setLoading":
            return { ...newState, loading: action.payload };
        default:
            return new Error();
    }
}

export { reducer };
