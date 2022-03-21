import { useState, useCallback, useEffect } from "react";

function useParseCsvFile(fileInput) {
    const [data, setData] = useState({ headers: [], rows: [] });

    const parseCsv = useCallback(() => {
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const str = event.target.result;
                const allRows = str.split("\n");

                const headers = allRows.slice(0, 1)[0].split(",");
                const rows = allRows.slice(1, allRows.length).map((v) => v.split(","));
                setData({ headers: headers, rows: rows });
            };
            reader.readAsText(fileInput);
        }
    }, [fileInput]);

    useEffect(() => {
        parseCsv();
    }, [parseCsv]);

    return data;
}

export { useParseCsvFile };
