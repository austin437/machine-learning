import { render, screen, waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useParseCsvFile } from "../index";

describe("useParseCsvFile", () => {
    it("returns the correct headers for a CSV file on load", () => {
        const { result } = renderHook(() => useParseCsvFile(null));
        expect(result.current.headers).toStrictEqual([]);
    });

    it("...", async () => {
        const CSV = ["MPG,HorsePower,Weight", "2,val1,val2", "3,val1,val2"].join("\n");
        const blob = new Blob([CSV], { type: "text/csv" });

        const { result, waitForNextUpdate } = renderHook(() => useParseCsvFile(blob));
        await waitForNextUpdate();
        expect(result.current.headers).toStrictEqual(["MPG", "HorsePower", "Weight"]);
    });
});
