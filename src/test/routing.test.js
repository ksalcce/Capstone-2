import Routing from "../routing/routing";
import React from "react";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";

describe("Routing Page test", () => {
    it("renders landing page text without crashing", () => {
        const app = mount(
          <Router>
              <Routing />
          </Router>
        );
        expect(app.find('.info').first().exists).toBeTruthy();
        app.unmount()
    });
});
