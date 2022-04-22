const initialState = {
    activeStep: 0,
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
