import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import App from "./App";

test("renders App on load", () => {
    render(
        <HashRouter>
            <App />
        </HashRouter>
    );
    const linkElement = screen.getByText(/linear regression/i);
    expect(linkElement).toBeInTheDocument();
});
