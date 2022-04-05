const initialState = (options) => {
    return {
        featureInputs: options.data.headers.filter((x) => x.isFeature).map((x) => 0),
        r2: null,
        labelPrediction: null,
        loading: false,
    };
};

export { initialState };
