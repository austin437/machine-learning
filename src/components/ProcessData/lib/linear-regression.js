import { tensor, zeros, ones, moments } from "@tensorflow/tfjs";

class LinearRegression {
    constructor(features, labels, options) {
        this.features = this.processFeatures(features);
        this.labels = tensor(labels);
        this.mseHistory = [];

        //modify to use this.options = {learningRate: 0.1, someDefaultVal: 3.4, ...options};
        this.options = Object.assign({ learningRate: 0.1, iterations: 1000, batchSize: 10 }, options);
        this.weights = zeros([this.features.shape[1], 1]);
    }

    gradientDescent(features, labels) {
        const currentGuesses = features.matMul(this.weights);
        const differences = currentGuesses.sub(labels);
        const slopes = features.transpose().matMul(differences).div(features.shape[0]);
        this.weights = this.weights.sub(slopes.mul(this.options.learningRate));
    }

    train() {
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize);

        for (let i = 0; i < this.options.iterations; i++) {
            for (let j = 0; j < batchQuantity; j++) {
                const { batchSize } = this.options;
                const startIndex = j * batchSize;

                const featureSlice = this.features.slice([startIndex, 0], [batchSize, -1]);
                const labelSlice = this.labels.slice([startIndex, 0], [batchSize, -1]);

                this.gradientDescent(featureSlice, labelSlice);
            }

            this.recordCost();
            this.updateLearningRate();
        }
    }

    predict(observations) {
        return this.processFeatures(observations).matMul(this.weights);
    }

    test(testFeatures, testLabels) {
        testFeatures = this.processFeatures(testFeatures);
        testLabels = tensor(testLabels);

        // the m and b variables (weights) have now been tuned to their optimal values
        const predictions = testFeatures.matMul(this.weights);

        const res = testLabels.sub(predictions).pow(2).sum().arraySync();
        const tot = testLabels.sub(testLabels.mean()).pow(2).sum().arraySync();

        const r2 = 1 - res / tot;

        return r2;
    }

    processFeatures(features) {
        features = tensor(features);
        features = this.standardize(features);
        features = ones([features.shape[0], 1]).concat(features, 1);

        return features;
    }

    standardize(features) {
        if (!(this.mean && this.variance)) {
            const { mean, variance } = moments(features, 0);
            this.mean = mean;
            this.variance = variance;
        }
        return features.sub(this.mean).div(this.variance.pow(0.5));
    }

    recordCost() {
        const mse = this.features
            .matMul(this.weights)
            .sub(this.labels)
            .pow(2)
            .sum()
            .div(this.features.shape[0])
            .dataSync()[0];

        this.mseHistory.unshift(mse);
    }

    updateLearningRate() {
        if (this.mseHistory.length < 2) return;

        if (this.mseHistory[0] > this.mseHistory[1]) {
            this.options.learningRate /= 2;
        } else {
            this.options.learningRate *= 1.05;
        }
    }
}

export { LinearRegression };
