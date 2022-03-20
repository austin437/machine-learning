import { useState, useCallback, useEffect } from "react";
import { shuffle as _shuffle } from "shuffle-seed";

function useParseCsvFile(fileInput) {
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
    }, [parseCsv]);

    return { headers, rows };
}

export { useParseCsvFile };
