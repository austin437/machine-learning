import { useCallback, useEffect } from "react";
import { useParseCsvFile } from "../../../../helpers";

function useActions(state, dispatch) {
    const { headers, rows } = useParseCsvFile(state.fileInput);

    const setCsvHeaders = useCallback(() => {
        dispatch({ type: "setCsvHeaders", payload: headers });
    }, [headers, dispatch]);

    useEffect(() => {
        setCsvHeaders();
    }, [setCsvHeaders]);

    const setCsvData = useCallback(() => {
        dispatch({ type: "setCsvData", payload: rows });
    }, [rows, dispatch]);

    useEffect(() => {
        setCsvData();
    }, [setCsvData]);
}

export { useActions };
