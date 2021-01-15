import React from "react";

export default React.createContext({
    parts: [],
    assemblies: [],
    machines: [],
    tests: [],
    addPart: () => {},
    addAssembly: () => {},
    addMachine: () => {},
    addTest: () => {},
    updatePart: () => {},
    updateAssembly: () => {},
    updateMachine: () => {},
    deletePart: () => {},
    deleteAssembly: () => {},
    deleteMachine: () => {},

});
