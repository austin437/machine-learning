import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import classes from "./styles.module.css";
import shuffleSeed from "shuffle-seed";
import _ from "lodash";

import LinearRegression from "./lib/linear-regression";

const ProcessData = () => {
    const { state } = useLocation();
    const [output, setOutput] = useState("{}");

    useEffect(() => {
        //Get feature columns using state.data.headers as index
        // const features = state.data.headers.filter((x) => x.isFeature).map((v) => v.fieldName);

        let testFeatures, testLabels;
        let features = state.data.rows.map((v) => [parseFloat(v[3]), parseFloat(v[5])]);
        let labels = state.data.rows.map((v) => [parseFloat(v[1])]);
        const { learningRate, iterations, batchSize } = state.options;

        if (state.options.shuffle) {
            features = shuffleSeed.shuffle(features, "phrase");
            labels = shuffleSeed.shuffle(labels, "phrase");
        }

        const regression = new LinearRegression(features, labels, { learningRate, iterations, batchSize }, setOutput);

        if (state.options.splitTest) {
            const trainSize = _.isNumber(state.options.splitTest)
                ? state.options.splitTest
                : Math.floor(features.length / 2);

            features = features.slice(trainSize);
            labels = labels.slice(trainSize);
            testFeatures = features.slice(0, trainSize);
            testLabels = labels.slice(0, trainSize);
        }

        regression.train();
        regression.test(testFeatures, testLabels);

        // regression
        //     .predict([
        //         [120, 2, 380],
        //         [135, 2.18, 420],
        //     ])
        //     .print();
    }, []);

    return (
        <>
            <h1>Process data</h1>
            <p>
                <b>Features:</b>{" "}
                <span className={classes.capitalize}>
                    {state.data.headers
                        .filter((v) => v.isFeature)
                        .map((v) => v.fieldName)
                        .join(", ")}
                </span>
            </p>
            <p>
                <b>Labels:</b>
                <span className={classes.capitalize}>{state.options.labels.join(", ")}</span>
            </p>
            <pre className={classes.pre}>{output}</pre>
            <Link to={`/`}>Back</Link>
        </>
    );
};

export { ProcessData };
