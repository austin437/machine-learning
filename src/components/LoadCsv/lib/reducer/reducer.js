function reducer(state, action) {
    switch (action.type) {
        case "setFileInput":
            return { ...state, fileInput: action.payload };
        case "setCsvHeaders":
            return { ...state, csvHeaders: action.payload };
        case "setCsvData":
            return { ...state, csvData: action.payload };
        default:
            throw new Error();
    }
}

export { reducer };
