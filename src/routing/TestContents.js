import React, { Component } from "react";
import ApiContext from "../ApiContext";
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Switch,
//     useParams,
//     useRouteMatch,
// } from "react-router-dom";
import config from "../config";
import "./routing.css"

export default class TestContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testAsm: [],
			testMach: []
        };
    }
    static contextType = ApiContext;

    // grabs the contents of the tests
	componentDidMount() {
        fetch(`${config.API_ENDPOINT}/tests/${this.props.id}`)
            .then((data) => {
                if (!data.ok) return data.json().then((e) => Promise.reject(e));
                return data.json();
            })
            .then((asmContents) => {
				const { testAsm, testMach} = asmContents;
				this.setState({ testAsm, testMach });
            });
    }

    render() {
        return (
            <>
                <h2>Test #{this.props.id} Results</h2>
                <br/>
				<h3>Assembly Timing</h3>
				<table className="test_asm_table">
                    <thead>
                        <tr>
                            <th>Asm. #</th>
                            <th>Desc.</th>
                            <th>Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.testAsm.map((val, ind) => {
                            return (
                                <tr key={ind} className="test">
                                    <td>{val.id}</td>
                                    <td>{val.description}</td>
                                    <td>{val.cycletime}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
				<br/>
				<h3>Machine Utilization</h3>
				<table className="test_machine_table">
                    <thead>
                        <tr>
                            <th>Mach. #</th>
                            <th>Name</th>
                            <th>Util.</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.testMach.map((val, ind) => {
                            return (
                                <tr key={ind} className="test-machine">
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.utilizationtime}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}
