import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { Route, Link, useRouteMatch } from "react-router-dom";
import AsmContents from "./AsmContents";
import PropTypes from "prop-types";

export default class AsmTable extends Component {
    static defaultProps = {};
    static contextType = ApiContext;

    // generates the table visible on the "Data" tab, with links to contents provided by AsmContents
    render() {
        const { assemblies } = this.context;
        const Contents = (props) => {
            let { path, url } = useRouteMatch();
            return (
                <>
                    <Link to={`${url}/${props.id}`}>{props.id}</Link>
                    <Route path={`${path}/:asmId`}>
                        <AsmContents />
                    </Route>
                </>
            );
        };

        return (
            <table className="PDM_Table">
                <thead>
                    <tr>
                        <th>Asm. #</th>
                        <th>Desc</th>
                    </tr>
                </thead>
                <tbody>
                    {assemblies.map((val, ind) => {
                        return (
                            <tr key={ind} className="assembly">
                                <td>
                                    <Contents id={val.id} />
                                </td>
                                <td>{val.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}


