import React from "react";
import Mfg from "../mfg/mfg";
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router';

describe("Mfg home page test", () => {
    it("renders without crashing", () => {
        const app = mount(
            <Router initialEntries={['/mfg']}>
                <Mfg />
            </Router>
        );
        expect(app.find('.info').first().exists).toBeTruthy();
        expect(app.find('.top-link').length).toBe(2);
        app.unmount()
    });
});
