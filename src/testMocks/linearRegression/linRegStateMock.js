const linRegStateMock = {
    featureSelectorHeaders: [
        {
            fieldName: "passedemissions",
            isNumeric: false,
            isFeature: false,
        },
        {
            fieldName: "mpg",
            isNumeric: true,
            isFeature: false,
        },
        {
            fieldName: "cylinders",
            isNumeric: true,
            isFeature: true,
        },
        {
            fieldName: "displacement",
            isNumeric: true,
            isFeature: false,
        },
        {
            fieldName: "horsepower",
            isNumeric: true,
            isFeature: true,
        },
        {
            fieldName: "weight",
            isNumeric: true,
            isFeature: false,
        },
        {
            fieldName: "acceleration",
            isNumeric: true,
            isFeature: false,
        },
        {
            fieldName: "modelyear",
            isNumeric: true,
            isFeature: true,
        },
        {
            fieldName: "carname\r",
            isNumeric: false,
            isFeature: false,
        },
    ],
    csvHeaders: [
        "passedemissions",
        "mpg",
        "cylinders",
        "displacement",
        "horsepower",
        "weight",
        "acceleration",
        "modelyear",
        "carname",
    ],
    csvData: [
        ["FALSE", "18", "8", "307", "130", "1.752", "12", "70", "chevrolet chevelle malibu\r"],
        ["FALSE", "15", "8", "350", "165", "1.8465", "11.5", "70", "buick skylark 320\r"],
        ["FALSE", "18", "8", "318", "150", "1.718", "11", "70", "plymouth satellite\r"],
        ["FALSE", "16", "8", "304", "150", "1.7165", "12", "70", "amc rebel sst\r"],
        ["FALSE", "17", "8", "302", "140", "1.7245", "10.5", "70", "ford torino\r"],
        ["FALSE", "15", "8", "429", "198", "2.1705", "10", "70", "ford galaxie 500\r"],
        ["FALSE", "14", "8", "454", "220", "2.177", "9", "70", "chevrolet impala\r"],
    ],
    options: {
        labels: ["weight"],
        batchSize: 1,
        iterations: 10,
        learningRate: 0.1,
        shuffle: true,
        splitTest: 3,
    },
};

export { linRegStateMock };
