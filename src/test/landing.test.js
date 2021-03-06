import React from "react";
import Landing from "../landing/landing";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";

describe("Landing Page test", () => {
    it("renders landing page text without crashing", () => {
        const app = mount(
            <Router>
                <Landing />
            </Router>
        );
        expect(app.find('.landing').first().exists).toBeTruthy();
        expect(app.find('.top-link').length).toBe(3);
        app.unmount()
    });
});
