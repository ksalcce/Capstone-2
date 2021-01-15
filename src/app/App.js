import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import config from "../config";
import "./App.css";
import Landing from "../landing/landing";
import PDM from "../pdm/pdm";
import MFG from "../mfg/mfg";
import Routing from "../routing/routing";
import ApiContext from "../ApiContext";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            assemblies: [],
            machines: [],
            tests: [],
        };
    }

    componentDidMount() {
        // grabs all notes and folders from the local JSON server
        Promise.all([
            fetch(`${config.API_ENDPOINT}/parts/all`),
            fetch(`${config.API_ENDPOINT}/assemblies/all`),
            fetch(`${config.API_ENDPOINT}/machines/all`),
            fetch(`${config.API_ENDPOINT}/tests/all`),
        ])
            .then(([prtRes, asmRes, macRes, tstRes]) => {
                // if parts break, reject
                if (!prtRes.ok)
                    return prtRes.json().then((e) => Promise.reject(e));
                // if assemblies break reject
                if (!asmRes.ok)
                    return asmRes.json().then((e) => Promise.reject(e));
                if (!macRes.ok)
                    return macRes.json().then((e) => Promise.reject(e));
                if (!tstRes.ok)
                    return tstRes.json().then((e) => Promise.reject(e));

                return Promise.all([
                    prtRes.json(),
                    asmRes.json(),
                    macRes.json(),
                    tstRes.json(),
                ]);
            })
            .then(([parts, assemblies, machines, tests]) => {
                //setting the initial data 
				this.setState({ parts, assemblies, machines, tests });
            })
            .catch((error) => {
                console.error({ error });
            });
    }

	// The main branches of the app
    renderMainRoutes() {
        return (
            <>
                <Route exact path="/" component={Landing} />
                <Route path="/pdm" component={PDM} />
                <Route path="/mfg" component={MFG} />
                <Route path="/routing" component={Routing} />
            </>
        );
    }

	// the handles, to be passed to the context
    handleAddPart = (part) => {
        this.setState({
            parts: [...this.state.parts, part],
        });
    };

    handleAddAssembly = (assembly) => {
        this.setState({
            assemblies: [...this.state.assemblies, assembly],
        });
    };

    handleAddMachine = (machine) => {
        this.setState({
            machines: [...this.state.machines, machine],
        });
    };

    handleAddTest = (test) => {
        this.setState({
            tests: [...this.state.tests, test],
        });
    };
	// end handles

    render() {
        const value = {
            parts: this.state.parts,
            assemblies: this.state.assemblies,
            machines: this.state.machines,
            tests: this.state.tests,
            addPart: this.handleAddPart,
            addAssembly: this.handleAddAssembly,
            addMachine: this.handleAddMachine,
            addTest: this.handleAddTest,
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App_nav"></nav>
                    <header className="App_header">
                        <h1>
                            <Link to="/">Streamline</Link>{" "}
                        </h1>
                    </header>
                    <main className="App_main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
