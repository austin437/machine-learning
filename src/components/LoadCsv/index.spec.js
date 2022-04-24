import React from "react";
import { render, screen } from "../../test-utils";
import { LoadCsv } from "../../components";
import { linRegStateMock, linRegDispatchMock } from "../../testMocks";

describe("LoadCsv", () => {
    it("renders data on load", () => {
        render(<LoadCsv linRegState={linRegStateMock} linRegDispatch={linRegDispatchMock} />);

        expect(screen.getByText(/upload csv/i)).not.toBeNull();
        expect(linRegDispatchMock).toHaveBeenCalledTimes(2);
        expect(linRegDispatchMock).toHaveBeenNthCalledWith(1, { payload: [], type: "setCsvHeaders" });
        expect(linRegDispatchMock).toHaveBeenNthCalledWith(2, { payload: [], type: "setCsvData" });
    });
});
