import React from "react";
import Pdm from "../pdm/pdm";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from 'enzyme'

describe("Pdm Page test", () => {
    it("renders pdm page text without crashing", () => {
        const app = mount(
          <Router>
              <Pdm />
          </Router>
        );
        expect(app.find('.info').first().exists).toBeTruthy();
        expect(app.find('.top-link').length).toBe(3);
        app.unmount()
    });
});
