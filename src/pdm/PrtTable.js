import React, { Component } from "react";
import ApiContext from "../ApiContext";

export default class PrtTable extends Component {
    static defaultProps = {};
    static contextType = ApiContext;

    render() {
        const { parts } = this.context;

        return (
            <table className="PDM_Table">
                <thead>
                    <tr>
                        <th>Part #</th>
                        <th>Desc</th>
                    </tr>
                </thead>
                <tbody>
                    {parts.map((val, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{val.id}</td>
                                <td>{val.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}
