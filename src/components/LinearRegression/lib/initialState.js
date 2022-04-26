const initialState = {
    steps: ["Instructions", "Load CSV", "Load Options", "Process Data"],
    activeStep: 0,
    stepsToDisableNextOn: [1, 2],
    fileInput: null,
    csvHeaders: [],
    featureSelectorHeaders: [],
    csvData: [],
    options: {
        labels: [""],
        splitTest: 50,
        shuffle: true,
        learningRate: 0.1,
        iterations: 10,
        batchSize: 10,
    },
    featureInputs: [],
    r2: null,
    labelPrediction: null,
    loading: false,
};

export { initialState };
