import { renderHook } from "@testing-library/react-hooks";
import { useActions } from "./useActions";
import { linRegStateMock } from "../../../testMocks";

describe("ProcessData: useActions", () => {
    let state;

    beforeAll(() => {
        state = linRegStateMock;
    });

    it(`returns the correct initialFeatures array based upon 
        the isFeature attribute of the state.data.headers array`, () => {
        const { result } = renderHook(() => useActions(state));
        const expectedResult = [
            [8, 130, 70],
            [8, 165, 70],
            [8, 150, 70],
            [8, 150, 70],
            [8, 140, 70],
            [8, 198, 70],
            [8, 220, 70],
        ];
        expect(result.current.initialFeatures).toStrictEqual(expectedResult);
    });

    it(`returns the correct initialLabels array based upon
        the state.options.labels array`, () => {
        const { result } = renderHook(() => useActions(state));
        const expectedResult = [[1.752], [1.8465], [1.718], [1.7165], [1.7245], [2.1705], [2.177]];
        expect(result.current.initialLabels).toStrictEqual(expectedResult);
    });
});
