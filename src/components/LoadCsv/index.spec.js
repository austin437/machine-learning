import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadCsv } from "../../components";

describe("LoadCsv", () => {
    it("renders data on load", () => {
        render(<LoadCsv />);

        expect(screen.getByText(/upload csv/i)).not.toBeNull();
    });
});
