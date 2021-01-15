import React, { Component } from "react";
import "./pdm.css";
import ApiContext from "../ApiContext";
import config from "../config";

const Required = () => <span className="prt_required">*</span>;

export default class PrtForm extends Component {
    static defaultProps = {
        history: {
            goBack: () => {},
        },
        match: {
            params: {},
        },
    };
    static contextType = ApiContext;
    state = {
        error: null,
        description: "",
        stock: "",
        machine: "M",
        complexity: "",
		popup:""
    };

	// grabs latest part for success popup
	componentDidMount() {
        let loc = this.context.parts.length - 1;
        if (loc !== -1) {
            this.setState({
                popup: this.context.parts[
                    loc
                ].id,
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // verify, post new part, return new part info
		if (/[^a-zA-Z\d\s,]/.test(this.state.description)) {
            alert(
                "The description must contain only alphanumeric characters, spaces, and commas"
            );
        } else if (/[^a-zA-Z\d\s,]/.test(this.state.stock)) {
            alert(
                "The stock must contain only alphanumeric characters, spaces, and commas"
            );
        } else if (/[^\d,.]/.test(this.state.complexity)) {
            alert(
                "The complexity must be a comma separated list containing only digits, decimals, and commas"
            );
        } else if (
            this.state.machine.split("").length !==
            this.state.complexity.split(",").length
        ) {
            alert(
                "The number of machine operations and number of complexity values must be equal"
            );
        } else {
            fetch(`${config.API_ENDPOINT}/parts/`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: this.state.description,
                    stock: this.state.stock,
                    machine: this.state.machine,
                    complexity: this.state.complexity,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((e) => Promise.reject(e));
                    }
                    return res.json();
                })
                .then((resJSON) => {
                    const { description, id, stock } = resJSON;
                    this.context.addPart({ description, id, stock });
                })
				.then(() => {
                    this.popup();
                })
                .catch((error) => {
                    console.error({ error });
                });
        }
    };

	popup = () => {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    render() {
        const { error } = this.state;
        return (
            <section className="prt_form">
                <h2>New Part</h2>
                <span>Please input all available information</span>
                <form className="prt_form" onSubmit={this.handleSubmit}>
                    <div className="prt_error" role="alert">
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="description">
                            Description <Required />
                        </label>
                        <input
                            className="new-inputs"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="999 30mm Gland 316"
                            onChange={this.handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="stock">
                            Stock Origin <Required />
                        </label>
                        <input
                            className="new-inputs"
                            type="text"
                            name="stock"
                            id="stock"
                            placeholder="316 UNS S31600, ASTM A276"
                            onChange={this.handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="machine">
                            Machine Code <Required />
                        </label>
                        <select
                            className="new-inputs"
                            id="machine"
                            onChange={this.handleChange}
                            autoComplete="off"
                        >
                            <option value="M">Mill</option>
                            <option value="T">Lathe</option>
                            <option value="MT">Mill/Lathe</option>
                            <option value="TM">Lathe/Mill</option>
                        </select>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="complexity">
                            Complexity <Required />
                        </label>
                        <input
                            className="new-inputs"
                            type="string"
                            name="complexity"
                            id="complexity"
                            placeholder="1.00,2.50"
                            onChange={this.handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <br />
                    <div className="Button__Array popup">
                        <button type="submit">Submit</button>
                        <span className="popuptext" id="myPopup">
                            Part id {this.state.popup} created!
                        </span>
                    </div>
                </form>
                <div className="instructions">
                    <span className="info">
                        Description is a component definition. Stock Origin is
                        the type of raw material used. Machine Code dictates
                        what machines process the component. Complexity is a
                        comma separated list of how many minutes each operation
                        takes.
                    </span>
                </div>
            </section>
        );
    }
}
