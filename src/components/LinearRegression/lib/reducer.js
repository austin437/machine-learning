import _ from "lodash";

function reducer(state, action) {
    const returnState = _.cloneDeep(state);

    switch (action.type) {
        case "resetState":
            return { ...action.payload };
        case "incrementActiveStep":
            returnState.stepper.activeStep++;
            return { ...returnState, stepper: returnState.stepper };
        case "decrementActiveStep":
            returnState.stepper.activeStep--;
            return { ...returnState, stepper: returnState.stepper };
        case "resetActiveStep":
            returnState.stepper.activeStep = 0;
            return { ...returnState, stepper: returnState.stepper };
        case "setFileInput":
            return { ...returnState, fileInput: action.payload };
        case "setCsvHeaders":
            return { ...returnState, csvHeaders: action.payload };
        case "setFeatureSelectorHeaders":
            return { ...returnState, featureSelectorHeaders: action.payload };
        case "setCsvData":
            return { ...returnState, csvData: action.payload };
        case "setPredictionLabel":
            returnState.options.labels = [action.payload];
            return { ...returnState, options: returnState.options };
        case "setSplitTest":
            returnState.options.splitTest = action.payload;
            return { ...returnState, options: returnState.options };
        case "setShuffle":
            returnState.options.shuffle = action.payload;
            return { ...returnState, options: returnState.options };
        case "setLearningRate":
            returnState.options.learningRate = action.payload;
            return { ...returnState, options: returnState.options };
        case "setIterations":
            returnState.options.iterations = action.payload;
            return { ...returnState, options: returnState.options };
        case "setBatchSize":
            returnState.options.batchSize = action.payload;
            return { ...returnState, options: returnState.options };
        case "setFeatureInputs":
            return { ...returnState, featureInputs: action.payload };
        case "setR2":
            return { ...returnState, r2: action.payload };
        case "setLabelPrediction":
            return { ...returnState, labelPrediction: action.payload };
        case "setLoading":
            return { ...returnState, loading: action.payload };
        default:
            return new Error();
    }
}

export { reducer };
