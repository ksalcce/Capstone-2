import React, { Component } from "react";

const Required = () => <span className="cell_required">*</span>;

export default class CellForm extends React.Component {
    state = {
        error: null,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // get the form fields from the event
        // fetch post data
        alert("Submitted");
    };

    render() {
        const { error } = this.state;
        return (
            <section className="asm_form">
                <h2>Add a New Machining Cell</h2>
                {/* <form
                    className="asm_form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="asm_error" role="alert">
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="an">
                            Assembly Number <Required />
                        </label>
                        <input
                            type="number"
                            name="an"
                            id="an"
                            placeholder="123456"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="desc">
                            Description <Required />
                        </label>
                        <input
                            type="text"
                            name="desc"
                            id="desc"
                            placeholder="999 30mm Gland 316"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">
							Contents <Required />
						</label>
                        <textarea
                            name="content"
                            id="content"
                            required
                        />
                    </div>
                    <div className="Button__Array">
                        <button type="button" onClick={this.handleClickCancel}>
                            Cancel
                        </button>{" "}
                        <button type="submit">Submit</button>
                    </div>
                </form> */}
				Currently under development
            </section>
        );
    }
}
