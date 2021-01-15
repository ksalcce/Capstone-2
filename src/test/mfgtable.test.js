import React from "react";
import Table from "../mfg/MfgTable";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";

describe("Mfg Table test", () => {
    it("Test component renders with machine data", () => {
        const mockValues = {
            machines: [
                { id: 1, name: "Test Machine1", type: 'M' },
                { id: 2, name: "Test Machine2", type: 'L' },
                { id: 3, name: "Test Machine3", type: 'M' },
                { id: 4, name: "Test Machine4", type: 'L' },
                { id: 5, name: "Test Machine5", type: 'M' }
            ]
        };

        const app = mount(
          <Router>
              <ApiContext.Provider value={mockValues}>
                  <Table />
              </ApiContext.Provider>
          </Router>
        );
        expect(app.find('.MFG_Table').first().exists).toBeTruthy();
        expect(app.find('.machine').length).toBe(mockValues.machines.length);
        app.unmount()
    });
});
