import { render, screen, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import carsCsvFile from "./test-assets/cars.csv";
import { useParseCsvFile } from "../index";

describe("useParseCsvFile", () => {
    it("returns the correct headers for a CSV file", async () => {
        const { result } = renderHook(() => useParseCsvFile(null));
        expect(result.current.headers).toStrictEqual([]);
    });

    it("returns the correct headers for a CSV file", async () => {
        const csvFileBlob = new Blob([carsCsvFile], { type: "text/csv" });

        act(() => {
            const { result } = renderHook(() => useParseCsvFile(csvFileBlob));

            console.log('result', result);

            expect(result.current.headers).toBe([
                "passedemissions",
                "mpg",
                "cylinders",
                "displacement",
                "horsepower",
                "weight",
                "acceleration",
                "modelyear",
                "carname",
            ]);
        });
    });
});
