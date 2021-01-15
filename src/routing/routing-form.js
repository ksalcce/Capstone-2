import React, { Component } from "react";

import ApiContext from "../ApiContext";
import config from "../config";

const Required = () => <span className="routing_required">*</span>;

export default class RoutingForm extends Component {
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
        contents: "",
		popup: ""
    };

	// grabs the latest test id for success popup
	componentDidMount() {
        let loc = this.context.tests.length - 1;
        if (loc !== -1) {
            this.setState({
                popup: this.context.tests[
                    loc
                ].id,
            });
        }
    }

    // checks the assemblies exist
	testContents = () => {
        let truthiness = false;
        const asmIds = this.context.assemblies.map((val) => {
            return val.id;
        });
        this.state.contents.split(",").forEach((elem) => {
            if (!asmIds.includes(Number(elem))) {
                truthiness = true;
            }
        });
        return truthiness;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // verification, sends new test, returns test id
		if (/[^\d,]/.test(this.state.contents)) {
            alert(
                "The contents must contain only digits and commas without spacing"
            );
        } else if (this.testContents()) {
            alert("One of the assembly numbers does not exist");
        } else {
            fetch(`${config.API_ENDPOINT}/tests/`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
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
                    const { batchtime, rundate, id } = resJSON;
                    this.context.addTest({ batchtime, rundate, id });
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
            <>
                <section className="routing_form">
                    <h2>New Test</h2>
                    <form className="routing_form" onSubmit={this.handleSubmit}>
                        <div className="routing_error" role="alert">
                            {error && <p>{error.message}</p>}
                        </div>
                        <br />
                        <div>
                            <label htmlFor="content">
                                Asm. Numbers <Required />
                            </label>
                            <textarea
                                className="new-inputs"
                                name="contents"
                                id="contents"
                                cols="7"
                                rows="1"
                                autoComplete="off"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <br />
                        <div className="Button__Array popup">
                        <button type="submit">Submit</button>
                        <span className="popuptext" id="myPopup">
                            Test id {this.state.popup} created!
                        </span>
                    </div>
                    </form>
                </section>
                <div className="instructions">
                    <p>
                        Assembly number is a comma-separated list of assemblies.
                        The test will use all available machines without
                        preference.
                    </p>
                </div>
            </>
        );
    }
}
