import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";

export default class AsmContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asmId: props.id,
            asmContents: [],
        };
    }
    static contextType = ApiContext;

    // grabs the contents of the assemblies
	componentDidMount() {
        fetch(`${config.API_ENDPOINT}/assemblies/${this.props.id}`)
            .then((data) => {
				if (!data.ok) return data.json().then((e) => Promise.reject(e));
                return data.json();
            })
            .then((asmContents) => {
                this.setState({ asmContents });
            });
    }

    render() {
        return (
            <>
                <h2>Asm #{this.props.id} Contents</h2>
                <table className="PDM_Table">
                    <thead>
                        <tr>
                            <th>Part #</th>
                            <th>Desc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.asmContents.map((val, ind) => {
                            return (
                                <tr key={ind} className='assembly-content'>
                                    <td>{val.partid}</td>
                                    <td>{val.description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}
