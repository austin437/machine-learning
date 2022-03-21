import { render, screen, waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useParseCsvFile } from "../index";

describe("useParseCsvFile", () => {
    let CSV, blob;

    beforeEach(() => {
        CSV = ["MPG,HorsePower,Weight", "30,150,20", "45,180,15"].join("\n");
        blob = new Blob([CSV], { type: "text/csv" });
    });

    it("returns the correct headers for a CSV file on load", () => {
        const { result } = renderHook(() => useParseCsvFile(null));
        expect(result.current.headers).toStrictEqual([]);
    });

    it("returns the correct headers", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useParseCsvFile(blob));
        await waitForNextUpdate();
        expect(result.current.headers).toStrictEqual(["MPG", "HorsePower", "Weight"]);
    });

    it("returns the correct rows", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useParseCsvFile(blob));
        await waitForNextUpdate();
        expect(result.current.rows).toStrictEqual([
            ["30", "150", "20"],
            ["45", "180", "15"],
        ]);
    });
});
