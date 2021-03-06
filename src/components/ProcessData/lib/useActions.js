import { useCallback, useMemo } from "react";
import _ from "lodash";

const useActions = (state) => {
    const extractColumnValues = useCallback(
        (indexes) => {
            return state.csvData.map((arr) => {
                return arr.filter((v, i) => indexes.includes(i)).map(parseFloat);
            });
        },
        [state.csvData]
    );

    const indexedHeaders = useMemo(() => {
        return state.featureSelectorHeaders.map((v, i) => ({ ...v, index: i }));
    }, [state.featureSelectorHeaders]);

    const featureIndexes = useMemo(() => {
        return indexedHeaders.filter((x) => x.isFeature).map((v) => v.index);
    }, [indexedHeaders]);

    const initialFeatures = useMemo(() => {
        return extractColumnValues(featureIndexes);
    }, [extractColumnValues, featureIndexes]);

    const labelIndexes = useMemo(() => {
        return indexedHeaders.filter((x) => state.options.labels.includes(x.fieldName)).map((v) => v.index);
    }, [indexedHeaders, state.options.labels]);

    const initialLabels = useMemo(() => {
        return extractColumnValues(labelIndexes);
    }, [extractColumnValues, labelIndexes]);

    const featurePredictionData = useMemo(() => {
        return indexedHeaders
            .filter((v) => v.isFeature)
            .map((v, i) => ({ ...v, average: parseFloat(_.mean(initialFeatures.map((w) => w[i])).toFixed(2)) }));
    }, [indexedHeaders, initialFeatures]);

    return { initialFeatures, initialLabels, featurePredictionData };
};

export { useActions };
