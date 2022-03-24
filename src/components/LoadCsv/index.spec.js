import React from "react";
import { render, screen } from "@testing-library/react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LoadCsv } from "../../components";

describe("LoadCsv", () => {
    it("renders data on load", () => {
        render(
            <HashRouter>
                <Routes>
                    <Route path="/" element={<LoadCsv />} />
                </Routes>
            </HashRouter>
        );

        expect(screen.getByText(/upload csv/i)).not.toBeNull();
    });
});
