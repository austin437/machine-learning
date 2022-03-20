import { useCallback } from "react";
import { useParseCsvFile } from "../../../../helpers";

function useActions(state, dispatch) {
    const { headers, rows } = useParseCsvFile(state.fileInput);

    const setCsvHeaders = useCallback(() => {
        dispatch({ type: "setCsvHeaders", payload: headers });
    }, [headers]);

    const setCsvData = useCallback(() => {
        dispatch({ type: "setCsvData", payload: rows });
    }, [rows]);

    const handleFileChange = useCallback((event) => {
        dispatch({ type: "setFileInput", payload: event.target.files[0] });
    });

    return { handleFileChange, setCsvHeaders, setCsvData };
}

export { useActions };
