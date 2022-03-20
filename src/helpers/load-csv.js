import { first, map, pullAt, dropRightWhile, isEqual, isNaN, isNumber } from "lodash";
import { shuffle as _shuffle } from "shuffle-seed";

function extractColumns(data, columnNames) {
    const headers = first(data);

    const indexes = map(columnNames, (column) => headers.indexOf(column));
    const extracted = map(data, (row) => pullAt(row, indexes));

    return extracted;
}

function readDataFromFile(fileInput) {
    const reader = new FileReader();
    reader.onload = function (event) {
        return event.target.result;
    };
    reader.readAsText(fileInput);
}

export default function loadCSV(
    fileInput,
    { dataColumns = [], labelColumns = [], converters = {}, shuffle = false, splitTest = false }
) {
    let data = readDataFromFile(fileInput);
    data = map(data.split("\n"), (d) => d.split(","));
    data = dropRightWhile(data, (val) => isEqual(val, [""]));
    const headers = first(data);

    data = map(data, (row, index) => {
        if (index === 0) {
            return row;
        }
        return map(row, (element, index) => {
            if (converters[headers[index]]) {
                const converted = converters[headers[index]](element);
                return isNaN(converted) ? element : converted;
            }

            const result = parseFloat(element.replace('"', ""));
            return isNaN(result) ? element : result;
        });
    });

    let labels = extractColumns(data, labelColumns);
    data = extractColumns(data, dataColumns);

    data.shift();
    labels.shift();

    if (shuffle) {
        data = _shuffle(data, "phrase");
        labels = _shuffle(labels, "phrase");
    }

    if (splitTest) {
        const trainSize = isNumber(splitTest) ? splitTest : Math.floor(data.length / 2);

        return {
            features: data.slice(trainSize),
            labels: labels.slice(trainSize),
            testFeatures: data.slice(0, trainSize),
            testLabels: labels.slice(0, trainSize),
        };
    } else {
        return { features: data, labels };
    }
}
