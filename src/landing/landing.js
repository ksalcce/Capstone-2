import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default class Landing extends React.Component {
    // The load-in page
	
	render() {
        return (
            <div className="nav_link">
                <ul>
                    <li className="top-link data-tab">
                        <Link to={`/pdm`}>Data</Link>
                    </li>
                    <li className="top-link mfg-tab">
                        <Link to={`/mfg`}>Manufacturing</Link>
                    </li>
                    <li className="top-link tst-tab">
                        <Link to={`/routing`}>Testing</Link>
                    </li>
                </ul>

                <p className="landing">
                    Streamline is a tool designed to simulate a manufacturing
                    process, so a factory can properly allocate resources.
                    <br />
                    <br />
                    The Data tab shows all the components that can be tested.
                    The Manufacturing tab is where users determine how many
                    resources are available to process components. The Testing
                    tab is were users select the parts they wish to simulate
                    processing. <br /> <br /> Please select a tab for further
                    instruction.
                </p>
            </div>
        );
    }
}
