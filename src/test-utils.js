import React from "react";
import { render } from "@testing-library/react";
import { HashRouter, Routes, Route } from "react-router-dom";

const AllTheProviders = ({ children }) => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={children} />
            </Routes>
        </HashRouter>
    );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
