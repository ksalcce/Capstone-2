import React from "react";
import Form from "../mfg/mfg-machine-form";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";
import {act} from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import AsmForm from "../pdm/pdm-asm-form";

describe("Mfg Form test", () => {
    it("renders without crashing and tests submission of form", () => {
        const mockMachine = {
            id: 1, name: 'Test', type: 'M'
        };
        const mockJsonPromise = Promise.resolve(mockMachine); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddMachine = jest.fn();

        const app = mount(
            <Router>
                <ApiContext.Provider value={{addMachine: mockAddMachine, machines: []}}>
                    <Form />
                </ApiContext.Provider>
            </Router>
        );
        expect(app.find('.machine_form').first().exists()).toBeTruthy();
        act(() => app.find('#name').prop('onChange')({target: {id: 'name', value: 'Test'}}));
        act(() => app.find('#type').prop('onChange')({target: {id: 'type', value: 'M'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        return waitForExpect(() => {
            app.update();
            expect(mockAddMachine).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledTimes(1);
            global.fetch.mockClear();
            app.unmount();
        })
    });
    it("Confirms submission does not occur name is not alphanumeric", () => {
        const mockMachine = {
            id: 1, name: 'Test', type: 'M'
        };
        const mockJsonPromise = Promise.resolve(mockMachine); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddMachine = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addMachine: mockAddMachine, machines: []}}>
                  <Form />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.machine_form').first().exists()).toBeTruthy();
        act(() => app.find('#name').prop('onChange')({target: {id: 'name', value: '&^*'}}));
        act(() => app.find('#type').prop('onChange')({target: {id: 'type', value: 'M'}}));
        expect(mockAddMachine).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount()
    });
});
