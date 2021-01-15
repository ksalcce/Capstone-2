import React, { Component } from "react";
import "./mfg.css";
import ApiContext from "../ApiContext";
import config from "../config";

const Required = () => <span className="machine_required">*</span>;

export default class MachineForm extends Component {
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
        name: "",
        type: "M",
        popup: "",
    };

    componentDidMount() {
        let loc = this.context.machines.length - 1;
        if (loc !== -1) {
            this.setState({
                popup: this.context.machines[loc].id,
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (/[^a-zA-Z\d\s]/.test(this.state.name)) {
            alert("The machine name must be alphanumeric");
        } else {
            // posting the new machine data, and returns the new data in the .thens
			fetch(`${config.API_ENDPOINT}/machines/`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: this.state.name,
                    type: this.state.type,
                    cellid: 0,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((e) => Promise.reject(e));
                    }
                    return res.json();
                })
                .then((resJSON) => {
                    const { id, name, type } = resJSON;
                    this.context.addMachine({ id, name, type });
                })
                .then(() => {
                    this.popup();
                })
                .catch((error) => {
                    console.error({ error });
                });
        }
    };

    // shows the alert for successful return
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
            <section className="machine_form">
                <h2>New Machine</h2>
                <span>Please input all available information</span>
                <form className="machine_form" onSubmit={this.handleSubmit}>
                    <div className="machine_error" role="alert">
                        {error && <p>{error.message}</p>}
                    </div>
                    <br />
                    <div>
                        <label htmlFor="name">Machine Name</label>
                        <input
                            className="new-inputs"
                            type="text"
                            name="name"
                            id="name"
                            onChange={this.handleChange}
                            placeholder="e.g. Okuma"
                            autoComplete="off"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="type">
                            Machine Type <Required />
                        </label>
                        <select
                            className="new-inputs"
                            id="type"
                            onChange={this.handleChange}
                            autoComplete="off"
                        >
                            <option value="M">Mill</option>
                            <option value="T">Lathe</option>
                        </select>
                    </div>
                    <br />
                    <div className="Button__Array popup">
                        <button className="submit-machine" type="submit">Submit</button>
                        <span className="popuptext" id="myPopup">
                            Machine id {this.state.popup} created!
                        </span>
                    </div>
                </form>
                <div className="instructions">
                    <br />
                    <span className="info">
                        The machine name is used to identify the various
                        machines. Machine Type determines what type of
                        operations the machine performs.
                    </span>
                </div>
            </section>
        );
    }
}
