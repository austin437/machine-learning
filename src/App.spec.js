import { render, screen } from "@testing-library/react";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";

test("renders App on load", () => {
    render(
        <HashRouter>
            <App />
        </HashRouter>
    );
    const linkElement = screen.getByText(/upload csv/i);
    expect(linkElement).toBeInTheDocument();
});
