import PrtForm from "../pdm/pdm-prt-form";
import React from "react";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";
import {act} from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

describe("Pdm Prt Form test", () => {
    it("renders without crashing and tests submission of form", () => {
        const mockPart = {
            id: 1, description: 'Test', stock: 'ABC 123'
        };
        const mockJsonPromise = Promise.resolve(mockPart); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddPart = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addPart: mockAddPart, parts: []}}>
                  <PrtForm />
              </ApiContext.Provider>
          </Router>
        );
        expect(app.find('.prt_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: 'Test'}}));
        act(() => app.find('#stock').prop('onChange')({target: {id: 'stock', value: 'ABC 123'}}));
        act(() => app.find('#complexity').prop('onChange')({target: {id: 'complexity', value: '1'}}));
        act(() => app.find('#machine').prop('onChange')({target: {id: 'machine', value: 'M'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        return waitForExpect(() => {
            app.update();
            expect(mockAddPart).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledTimes(1);
            global.fetch.mockClear();
            app.unmount();
        })

    });

    it("Confirms submission does not occur if description is not alphanumeric", () => {
        const mockPart = {
            id: 1, description: 'Test', stock: 'ABC 123'
        };
        const mockJsonPromise = Promise.resolve(mockPart); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddPart = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addPart: mockAddPart, parts: []}}>
                  <PrtForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.prt_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: '&&*'}}));
        act(() => app.find('#stock').prop('onChange')({target: {id: 'stock', value: 'ABC 123'}}));
        act(() => app.find('#complexity').prop('onChange')({target: {id: 'complexity', value: '1'}}));
        act(() => app.find('#machine').prop('onChange')({target: {id: 'machine', value: 'M'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        expect(mockAddPart).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();
    });

    it("Confirms submission does not occur if stock is not alphanumeric", () => {
        const mockPart = {
            id: 1, description: 'Test', stock: 'ABC 123'
        };
        const mockJsonPromise = Promise.resolve(mockPart); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddPart = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addPart: mockAddPart, parts: []}}>
                  <PrtForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.prt_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: 'Test'}}));
        act(() => app.find('#stock').prop('onChange')({target: {id: 'stock', value: '&&*%'}}));
        act(() => app.find('#complexity').prop('onChange')({target: {id: 'complexity', value: '1'}}));
        act(() => app.find('#machine').prop('onChange')({target: {id: 'machine', value: 'M'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        expect(mockAddPart).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();
    });

    it("Confirms submission does not occur if complexity is invalid", () => {
        const mockPart = {
            id: 1, description: 'Test', stock: 'ABC 123'
        };
        const mockJsonPromise = Promise.resolve(mockPart); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddPart = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addPart: mockAddPart, parts: []}}>
                  <PrtForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.prt_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: '&&*'}}));
        act(() => app.find('#stock').prop('onChange')({target: {id: 'stock', value: 'ABC 123'}}));
        act(() => app.find('#complexity').prop('onChange')({target: {id: 'complexity', value: '**'}}));
        act(() => app.find('#machine').prop('onChange')({target: {id: 'machine', value: 'M'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        expect(mockAddPart).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();
    });

    it("Confirms submission does not occur if complexity and machine counts do not add up", () => {
        const mockPart = {
            id: 1, description: 'Test', stock: 'ABC 123'
        };
        const mockJsonPromise = Promise.resolve(mockPart); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockAddPart = jest.fn();

        const app = mount(
          <Router>
              <ApiContext.Provider value={{addPart: mockAddPart, parts: []}}>
                  <PrtForm />
              </ApiContext.Provider>
          </Router>
        );
        window.alert = jest.fn();
        expect(app.find('.prt_form').first().exists()).toBeTruthy();
        act(() => app.find('#description').prop('onChange')({target: {id: 'description', value: '&&*'}}));
        act(() => app.find('#stock').prop('onChange')({target: {id: 'stock', value: 'ABC 123'}}));
        act(() => app.find('#complexity').prop('onChange')({target: {id: 'complexity', value: '1,2,4'}}));
        act(() => app.find('#machine').prop('onChange')({target: {id: 'machine', value: 'M'}}));
        app.find('form').simulate('submit', { preventDefault () {} });
        expect(mockAddPart).toHaveBeenCalledTimes(0);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        global.fetch.mockClear();
        window.alert.mockClear();
        app.unmount();
    });
});
