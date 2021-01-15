import React, { Component } from "react";
import ApiContext from "../ApiContext";
import {
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";
import TestContents from "./TestContents";

export default class TestTable extends Component {
    static defaultProps = {};
    static contextType = ApiContext;

    // generates the table visible on the "tests" tab, with links to specifics provided by TestContents
	render() {
        const { tests } = this.context;
        const Contents = (props) => {
            let { path, url } = useRouteMatch();
            return (
                <>
                    <Link to={`${url}/${props.id}`}>{props.id}</Link>
                    <Route path={`${path}/:testId`}>
                        <TestContents />
                    </Route>
                </>
            );
        };

        return (
            <table className="test_table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Time (min)</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((val, ind) => {
                        return (
                            <tr key={ind} className="test-row">
                                <td>
                                    <Contents id={val.id} />
                                </td>
                                <td>{val.batchtime}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}


