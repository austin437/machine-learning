import _ from "lodash";

function reducer(state, action) {     
    switch (action.type) {
        case "setPredictionLabel":
            return { ...state, labels: [action.payload] };
        case "setSplitTest":
            return { ...state, splitTest: action.payload };
        default:
            throw new Error();
    }
}

export { reducer };
