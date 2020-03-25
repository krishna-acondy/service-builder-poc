import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Menu, Sidebar } from "semantic-ui-react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import ImportExport from "./pages/ImportExport";
import Configuration from "./pages/Configuration";
import Services from "./pages/Services";
import SidebarItem from "./components/SidebarItem";

export default (
  <div className="root">
    <HashRouter>
      <div className="sidebar">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <SidebarItem
            icon="file"
            link="/import-export"
            text="Import / Export"
          />
          <SidebarItem
            icon="settings"
            link="/configuration"
            text="Configuration"
          />
          <SidebarItem icon="server" link="/services" text="Services" />
        </Sidebar>
      </div>
      <div className="main">
        <Switch>
          <Route exact path="/import-export" component={ImportExport} />
          <Route exact path="/configuration" component={Configuration} />
          <Route exact path="/services" component={Services} />
        </Switch>
        <Redirect from="/" to="/import-export" />
      </div>
    </HashRouter>
  </div>
);
