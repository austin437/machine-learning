import { useCallback, useEffect, useMemo } from "react";

const useSideEffects = (state) => {
    const extractColumnValues = useCallback(
        (indexes) => {
            return state.data.rows.map((arr) => {
                return arr.filter((v, i) => indexes.includes(i)).map(parseFloat);
            });
        },
        [state.data.rows]
    );

    const indexedHeaders = useMemo(() => {
        return state.data.headers.map((v, i) => ({ ...v, index: i }));
    }, [state.data.headers]);

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

    return { initialFeatures, initialLabels };
};

export { useSideEffects };
