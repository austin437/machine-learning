import { useState, useCallback, useEffect } from "react";

function useParseCsvFile(fileInput) {
    //convert to single state object???
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

    const parseCsv = useCallback(() => {
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const str = event.target.result;
                const allRows = str.split("\n");

                const headers = allRows.slice(0, 1)[0].split(",");
                setHeaders(headers);

                const rows = allRows.slice(1, allRows.length).map((v) => v.split(","));
                setRows(rows);
            };
            reader.readAsText(fileInput);
        }
    }, [fileInput]);

    useEffect(() => {
        parseCsv();
        return () => {
            setHeaders([]); // This worked for me
        };
    }, [parseCsv]);

    return { headers, rows };
}

export { useParseCsvFile };
