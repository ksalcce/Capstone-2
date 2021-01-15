import React from "react";
import Table from "../pdm/AsmTable";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";

describe("Asm Table test", () => {
  it("Test component renders with assembly data", () => {
    const mockValues = {
      assemblies: [
        { id: 1, description: "Test Assembly 1" },
        { id: 2, description: "Test Assembly 2" },
        { id: 3, description: "Test Assembly 3" },
        { id: 4, description: "Test Assembly 4" },
        { id: 5, description: "Test Assembly 5" }
      ]
    };

    const app = mount(
      <Router>
        <ApiContext.Provider value={mockValues}>
          <Table />
        </ApiContext.Provider>
      </Router>
    );
    expect(app.find('.PDM_Table').first().exists).toBeTruthy();
    expect(app.find('.assembly').length).toBe(mockValues.assemblies.length);
    app.unmount()
  });
});
