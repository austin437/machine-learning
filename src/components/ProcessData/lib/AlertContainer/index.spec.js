import { render } from "@testing-library/react";
import { AlertContainer } from "./index";

describe("AlertContainer", () => {
    it("renders data on load", () => {
        const { getByText } = render(<AlertContainer r2={10} labelPrediction={5} labels="Some Label" />);
        expect(getByText(/your r2 value is:/i)).not.toBeNull();
        expect(getByText(/your predicted value for/i)).not.toBeNull();
    });

    it("displays the R2 value to 2 decimal places", () => {
        const { getByText } = render(<AlertContainer r2={-7.16587} labelPrediction={5} labels="Some Label" />);
        expect(getByText(/your r2 value is:/i)).not.toBeNull();
        expect(getByText("-7.17")).not.toBeNull();
    });

    it("displays the labelPrediction value to 2 decimal places", () => {
        const { getByText } = render(<AlertContainer r2={10} labelPrediction={5.18655} labels="Some Label" />);
        expect(getByText(/your predicted value for/i)).not.toBeNull();
        expect(getByText("5.19")).not.toBeNull();
    });

    it("displays the labels prop", () => {
        const { getByText } = render(<AlertContainer r2={10} labelPrediction={5} labels="A linear gradient label" />);
        expect(getByText(/a linear gradient label/i)).not.toBeNull();
    });
});
