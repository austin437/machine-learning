import { useCallback } from "react";
import shuffleSeed from "shuffle-seed";
import { LinearRegression } from ".";
import _ from "lodash";

const useLinearRegression = (featureInputs, dispatch, initialFeatures, initialLabels, options) => {
    const calculatePrediction = useCallback(() => {
        let features, labels, testFeatures, testLabels;
        features = initialFeatures;
        labels = initialLabels;
        const { learningRate, iterations, batchSize } = options;

        if (options.shuffle) {
            features = shuffleSeed.shuffle(features, "phrase");
            labels = shuffleSeed.shuffle(labels, "phrase");
        }

        const regression = new LinearRegression(features, labels, { learningRate, iterations, batchSize });

        if (options.splitTest) {
            const trainSize = _.isNumber(options.splitTest) ? options.splitTest : Math.floor(features.length / 2);
            features = features.slice(trainSize);
            labels = labels.slice(trainSize);
            testFeatures = features.slice(0, trainSize);
            testLabels = labels.slice(0, trainSize);
            dispatch({ type: "setR2", payload: regression.test(testFeatures, testLabels) });
        }

        regression.train();
        const predictedValue = regression.predict([featureInputs]).arraySync()[0][0];
        dispatch({ type: "setLabelPrediction", payload: predictedValue });
    }, [featureInputs, initialFeatures, initialLabels, options, dispatch]);

    return { calculatePrediction };
};

export { useLinearRegression };
