import React from "react";
import Contents from "../pdm/AsmContents";
import { shallow } from "enzyme";
import waitForExpect from 'wait-for-expect';


describe("Asm Table test", () => {
    it("Test component renders with assembly data", () => {

        const mockAssemblies = [
            { id: 1, description: "Test Assembly 1" },
            { id: 2, description: "Test Assembly 2" },
            { id: 3, description: "Test Assembly 3" },
            { id: 4, description: "Test Assembly 4" },
            { id: 5, description: "Test Assembly 5" }
        ];
        const mockJsonPromise = Promise.resolve(mockAssemblies); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const mockid = 5;
        const app = shallow(
            <Contents
                id={mockid}
            />
        );
        expect(app.find('h2').first().text()).toEqual(`Asm #${mockid} Contents`);
        return waitForExpect(() => {
            app.update();
            expect(app.find('.assembly-content').length).toBe(mockAssemblies.length);
            global.fetch.mockClear();
            app.unmount()
        })

    });
});
