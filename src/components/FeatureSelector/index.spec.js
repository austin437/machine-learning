import { render, fireEvent } from "../../test-utils";
import { FeatureSelector } from "../index";
import { linRegStateMock, linRegDispatchMock } from "../../testMocks";

describe("FeatureSelector", () => {
    it("should render on load", () => {
        const { getByText } = render(<FeatureSelector linRegState={linRegStateMock} />);

        expect(getByText(/mpg/i)).not.toBeNull();
        expect(getByText(/horsepower/i)).not.toBeNull();
        expect(getByText(/weight/i)).not.toBeNull();
    });

    it("should render 7 rows of truthy values", () => {
        const { getAllByText } = render(<FeatureSelector linRegState={linRegStateMock} />);

        expect(getAllByText(/true/i).length).toBe(7);
    });

    it("should render 7 rows of truthy values, 2 of falsy values", () => {
        const { getAllByText } = render(<FeatureSelector linRegState={linRegStateMock} />);

        expect(getAllByText(/true/i).length).toBe(7);
        expect(getAllByText(/false/i).length).toBe(2);
    });

    it("should...", () => {
        const { getByText } = render(
            <FeatureSelector linRegState={linRegStateMock} linRegDispatch={linRegDispatchMock} />
        );

        fireEvent(
            getByText("Submit"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
        expect(linRegDispatchMock).toHaveBeenCalledTimes(2);
        expect(linRegDispatchMock).toHaveBeenNthCalledWith(1, {
            payload: [
                { fieldName: "passedemissions", isFeature: false, isNumeric: false },
                { fieldName: "mpg", isFeature: false, isNumeric: true },
                { fieldName: "cylinders", isFeature: false, isNumeric: true },
                { fieldName: "displacement", isFeature: false, isNumeric: true },
                { fieldName: "horsepower", isFeature: false, isNumeric: true },
                { fieldName: "weight", isFeature: false, isNumeric: true },
                { fieldName: "acceleration", isFeature: false, isNumeric: true },
                { fieldName: "modelyear", isFeature: false, isNumeric: true },
                { fieldName: "carname", isFeature: false, isNumeric: false },
            ],
            type: "setFeatureSelectorHeaders",
        });
        expect(linRegDispatchMock).toHaveBeenNthCalledWith(2, {
            type: "incrementActiveStep",
        });
    });
});
