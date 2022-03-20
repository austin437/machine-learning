import { useCallback } from "react";
import { useParseCsvFile } from "../../../../helpers";

function useActions(state, dispatch) {
    const { headers, rows } = useParseCsvFile(state.fileInput);

    const setCsvHeaders = useCallback(() => {
        dispatch({ type: "setCsvHeaders", payload: headers });
    }, [headers, dispatch]);

    const setCsvData = useCallback(() => {
        dispatch({ type: "setCsvData", payload: rows });
    }, [rows, dispatch]);

    const handleFileChange = useCallback(
        (event) => {
            dispatch({ type: "setFileInput", payload: event.target.files[0] });
        },
        [dispatch]
    );

    return { handleFileChange, setCsvHeaders, setCsvData };
}

export { useActions };
