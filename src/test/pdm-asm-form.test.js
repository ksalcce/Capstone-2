import AsmForm from "../pdm/pdm-asm-form";

import React from "react";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";
import {act} from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

describe("Pdm Asm Form test", () => {
    it("renders without crashing and tests submission of form", () => {
        const mockAssembly = {
            id: 1, description: 'Test'
        };
        const mockJsonPromise = Promise.resolve(mockAssembly); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddAssembly = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addAssembly: mockAddAssembly, assemblies: [], parts: [{id: 1}]}}>
                  <AsmForm />
              </ApiContext.Provider>
          </Router>
        );
        expect(app.find('.asm_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: 'Test'}}));
        act(() => app.find('#contents').prop('onChange')({target: {id: 'contents', value: '1'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        return waitForExpect(() => {
            app.update();
            expect(mockAddAssembly).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledTimes(1);
            app.unmount();
        })

    });

    it("Confirms submission does not occur if description fails validation", () => {
        const mockAssembly = {
            id: 1, description: 'Test'
        };
        const mockJsonPromise = Promise.resolve(mockAssembly); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddAssembly = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addAssembly: mockAddAssembly, assemblies: [], parts: [{id: 1}]}}>
                  <AsmForm />
              </ApiContext.Provider>
          </Router>
        );
        expect(app.find('.asm_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: '&&&'}}));
        expect(mockAddAssembly).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        app.unmount();

    });

    it("Confirms submission does not occur if contents fails validation", () => {
        const mockAssembly = {
            id: 1, description: 'Test'
        };
        const mockJsonPromise = Promise.resolve(mockAssembly); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddAssembly = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addAssembly: mockAddAssembly, assemblies: [], parts: [{id: 1}]}}>
                  <AsmForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.asm_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'contents', value: '&&&'}}));
        expect(mockAddAssembly).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();

    });

    it("Confirms submission does not occur if selected contents do not match existing parts", () => {
        const mockAssembly = {
            id: 1, description: 'Test'
        };
        const mockJsonPromise = Promise.resolve(mockAssembly); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddAssembly = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addAssembly: mockAddAssembly, assemblies: [], parts: [{id: 1}]}}>
                  <AsmForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.asm_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: 'Test'}}));
        act(() => app.find('#contents').prop('onChange')({target: {id: 'contents', value: '3'}}));
        expect(mockAddAssembly).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();

    });
});
