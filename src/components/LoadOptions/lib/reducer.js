function reducer(state, action) {     
    switch (action.type) {
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
            throw new Error();
    }
}

export { reducer };
