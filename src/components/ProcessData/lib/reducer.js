function reducer(state, action) {
    switch (action.type) {
        case "setFeatureInputs":
            return { ...state, featureInputs: action.payload };
        case "setR2":
            return { ...state, r2: action.payload };
        case "setLabelPrediction":
            return { ...state, labelPrediction: action.payload };
        case "setLoading":
            return { ...state, loading: action.payload };
        default:
            throw new Error();
    }
}

export { reducer };
