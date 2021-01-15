import TestCon from "../routing/TestContents";
import React from "react";
import { shallow } from "enzyme";
import waitForExpect from 'wait-for-expect';

describe("Test contents", () => {
  it("Test component renders with test / machine data", () => {
    const mockData =
      {
          testAsm: [
              {id: 1, description: "Test", cycleTime: 1.0},
              {id: 2, description: "Test 2", cycleTime: 2.0}
          ],
          testMach: [{id: 1, name: "Test", utilizationtime: 2.0}]
      };
    const mockJsonPromise = Promise.resolve(mockData); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockJsonPromise,
      ok: true
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const mockid = 5;
    const app = shallow(<TestCon id={mockid} />);
    expect(
      app
        .find("h2")
        .first()
        .text()
    ).toEqual(`Test #${mockid} Results`);
    return waitForExpect(() => {
      app.update();
      expect(app.find(".test").length).toBe(mockData.testAsm.length);
      expect(app.find(".test-machine").length).toBe(mockData.testMach.length);
      global.fetch.mockClear();
      app.unmount()
    });
  });
});
