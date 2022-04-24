import { render } from "../../test-utils";
import { FeatureSelector } from "../index";
import { linRegStateMock } from "../../testMocks";

describe("FeatureSelector", () => {
    it("should render on load", () => {
        const { getByText } = render(<FeatureSelector linRegState={linRegStateMock} />);

        expect(getByText(/mpg/i)).not.toBeNull();
        expect(getByText(/horsepower/i)).not.toBeNull();
        expect(getByText(/weight/i)).not.toBeNull();
    });

    it("should render 7 rows of Data type: Number", () => {
        const { getAllByText } = render(<FeatureSelector linRegState={linRegStateMock} />);

        expect(getAllByText(/true/i).length).toBe(7);
    });

    it("should render 3 rows of Data type: Number", () => {
        const { getAllByText } = render(<FeatureSelector linRegState={linRegStateMock} />);

        expect(getAllByText(/true/i).length).toBe(7);
        expect(getAllByText(/false/i).length).toBe(2);
    });
});
