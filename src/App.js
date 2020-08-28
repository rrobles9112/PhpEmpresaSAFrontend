import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CrudProduct from "./views/CrudProduct";
import EditProduct from "./views/EditProduct";
import logo from "./logo.svg";
import "./App.css";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function RouterApp() {
    return (
        <Router>

            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <Switch>
                    <Route exact path="/">
                        <CrudProduct/>
                    </Route>
                    <Route exact path="/edit/:id">
                        <EditProduct />
                    </Route>
                </Switch>

            </div>
        </Router>

    );
}



