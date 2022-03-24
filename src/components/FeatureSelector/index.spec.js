import { render } from "@testing-library/react";
import { FeatureSelector } from "../index";

describe("FeatureSelector", () => {
    it("should render on load", () => {
        const data = {
            headers: ["mpg", "horsepower", "weight"],
            rows: [
                ["18", "130", "113"],
                ["17", "150", "340"],
            ],
        };

        const { getByText } = render(<FeatureSelector data={data} />);

        expect(getByText(/mpg/i)).not.toBeNull();
        expect(getByText(/horsepower/i)).not.toBeNull();
        expect(getByText(/weight/i)).not.toBeNull();
    });

    it("should render 3 rows of Data type: Number", () => {
        const data = {
            headers: ["mpg", "horsepower", "weight"],
            rows: [
                ["18", "130", "113"],
                ["17", "150", "340"],
            ],
        };

        const { getAllByText } = render(<FeatureSelector data={data} />);

        expect(getAllByText(/true/i).length).toBe(3);
    });

    it("should render 3 rows of Data type: Number", () => {
        const data = {
            headers: ["mpg", "horsepower", "weight"],
            rows: [
                ["18", "130", "A string value"],
                ["17", "150", "340"],
            ],
        };

        const { getAllByText } = render(<FeatureSelector data={data} />);

        expect(getAllByText(/true/i).length).toBe(2);
        expect(getAllByText(/false/i).length).toBe(1);
    });
});
