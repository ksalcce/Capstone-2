import React, { Component } from "react";
import "./pdm.css";
import ApiContext from "../ApiContext";
import config from "../config";

const Required = () => <span className="asm_required">*</span>;

export default class AsmForm extends Component {
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
        contents: "",
        popup: "",
    };

    // grabs the latest assembly id for use in the "success" popup
	componentDidMount() {
        let loc = this.context.assemblies.length - 1;
        if (loc !== -1) {
            this.setState({
                popup: this.context.assemblies[
                    loc
                ].id,
            });
        }
    }

    // checks the part number exists
	testContents = () => {
        let truthiness = false;
        const partIds = this.context.parts.map((val) => {
            return val.id;
        });
        this.state.contents.split(",").forEach((elem) => {
            if (!partIds.includes(Number(elem))) {
                truthiness = true;
            }
        });
        return truthiness;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // verification, sends new assembly, returns new asm. info
		if (/[^a-zA-Z\d\s,]/.test(this.state.description)) {
            alert(
                "The description must contain only alphanumeric characters, spaces, or commas"
            );
        } else if (/[^\d,]/.test(this.state.contents)) {
            alert(
                "The contents must be a comma separated list containing only digits and commas without spaces"
            );
        } else if (this.testContents()) {
            alert("One of the part numbers does not exist");
        } else {
            fetch(`${config.API_ENDPOINT}/assemblies/`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: this.state.description,
                    contents: this.state.contents.split(","),
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((e) => Promise.reject(e));
                    }
                    return res.json();
                })
                .then((resJSON) => {
                    const { description, id } = resJSON;
                    this.setState({ popup: id });
                    this.context.addAssembly({ description, id });
                })
                .then(() => {
                    this.popup();
                })
                .catch((error) => {
                    console.error({ error });
                });
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    popup = () => {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    };

    render() {
        const { error } = this.state;
        return (
            <section className="asm_form">
                <h2>New Assembly</h2>
                <span>Please input all available information</span>
                <form className="asm_form" onSubmit={this.handleSubmit}>
                    <div className="asm_error" role="alert">
                        {error && <p>{error.message}</p>}
                    </div>
                    <br />
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
                        <label htmlFor="contents">
                            Contents (cs) <Required />
                        </label>
                        <textarea
                            className="new-inputs"
                            name="contents"
                            id="contents"
                            cols="7"
                            rows="1"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div className="Button__Array popup">
                        <button type="submit">Submit</button>
                        <span className="popuptext" id="myPopup">
                            Assembly id {this.state.popup} created!
                        </span>
                    </div>
                </form>
                <div className="instructions">
                    <span className="info">
                        Description is a component definition. Contents is a
                        comma-separated list of six-digit part numbers.
                    </span>
                </div>
            </section>
        );
    }
}
