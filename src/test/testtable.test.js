import React from "react";
import TestTable from "../routing/TestTable";

import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";

describe("Mfg Table test", () => {
    it("Test component renders with machine data", () => {
        const mockValues = {
            tests: [
                { id: 1, batch: 1.0 },
                { id: 2, batch: 2.0 },
                { id: 3, batch: 3.0 },
                { id: 4, batch: 4.0 },
                { id: 5, batch: 5.0 }
            ]
        };

        const app = mount(
          <Router>
              <ApiContext.Provider value={mockValues}>
                  <TestTable />
              </ApiContext.Provider>
          </Router>
        );
        expect(app.find('.test_table').first().exists).toBeTruthy();
        expect(app.find('.test-row').length).toBe(mockValues.tests.length);
        app.unmount()
    });
});
