import React, { Component } from "react";
import {
    Route,
    Link,
    Switch,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import MfgMachineForm from "./mfg-machine-form";
import "./mfg.css";
import MfgTable from "./MfgTable";

export default class MFG extends Component {
    // a function to render the various routing options for the manufacturing path

    render() {
        function Links() {
            let { path, url } = useRouteMatch();

            return (
                <>
                    <ul>
                        <li className="top-link">
                            <Link to={`${url}`}>Machines</Link>
                        </li>
                        <li className="top-link">
                            <Link to={`${url}/mfg-machine-form`}>
                                New Mach.
                            </Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route exact path={path}>
                            <h2>Machines</h2>
                            <span className="info">
                                The Manufacturing branch is designed for adding
                                machines and associated data used to process
                                parts.
                                <br />
                                The table below shows available resources for
                                processing.
                                <br />
                                Follow the link above to add new resources.
                            </span>
                            <br />
                            <br />
                            <span>Current Machines:</span>
                            <MfgTable />
                        </Route>
                        <Route path={`${path}/:formType`}>
                            <Forms />
                        </Route>
                    </Switch>
                </>
            );
        }

        function Forms() {
            let { formType } = useParams();

            switch (formType) {
                case "mfg-machine-form":
                    return <MfgMachineForm />;
                default:
                    return <></>;
            }
        }

        return (
            <div className="sub-header">
                <Links />
            </div>
        );
    }
}
