import TestForm from "../routing/routing-form";
import React from "react";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";
import {act} from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

describe("Mfg TestForm test", () => {
    it("renders without crashing and tests submission of form", () => {
        const mockTest = {
            batchtime: 2.7, rundate: '2020-01-01', id: 1
        };
        const mockJsonPromise = Promise.resolve(mockTest); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddTest = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addTest: mockAddTest, tests: [], assemblies: [{id: 1}, {id: 2}]}}>
                  <TestForm />
              </ApiContext.Provider>
          </Router>
        );
        expect(app.find('.routing_form').first().exists()).toBeTruthy();
        act(() => app.find('#contents').prop('onChange')({target: {id: 'contents', value: '1,2'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        return waitForExpect(() => {
            app.update();
            expect(mockAddTest).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledTimes(1);
            global.fetch.mockClear();
            app.unmount();
        })
    });
    it("Confirms submission does not occur if contents are invalid", () => {
        const mockTest = {
            id: '2020-07-12T04:00:00.000Z', name: 'Test', type: 'M'
        };
        const mockJsonPromise = Promise.resolve(mockTest); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddTest = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addTest: mockAddTest, tests: [], assemblies: [{id: 1}, {id: 2}]}}>
                  <TestForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.routing_form').first().exists()).toBeTruthy();
        act(() => app.find('#contents').prop('onChange')({target: {id: 'contents', value: '&^*'}}));
        expect(mockAddTest).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();
    });

    it("Confirms submission does not occur if contents does not match with existing assemblies", () => {
        const mockTest = {
            id: '2020-07-12T04:00:00.000Z', name: 'Test', type: 'M'
        };
        const mockJsonPromise = Promise.resolve(mockTest); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddTest = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addTest: mockAddTest, tests: [], assemblies: [{id: 1}, {id: 2}]}}>
                  <TestForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.routing_form').first().exists()).toBeTruthy();
        act(() => app.find('#contents').prop('onChange')({target: {id: 'contents', value: '4'}}));
        expect(mockAddTest).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount()
    });
});
