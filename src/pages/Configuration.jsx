import React, { useContext } from "react";
import { Header, Input, Segment, Select } from "semantic-ui-react";
import { AppContext } from "../context/appContext";
import "./Configuration.scss";

const Configuration = () => {
  const { masterJson, setMasterJson } = useContext(AppContext);
  const appConfig =
    masterJson && masterJson.appconfig ? masterJson.appconfig : {};
  const sasJsConfig =
    masterJson && masterJson.sasjsconfig ? masterJson.sasjsconfig : {};
  return (
    <div className="configuration-container">
      <Header as="h1">Configuration</Header>
      <form className="config-form">
        <Segment size="huge" raised>
          <Header as="h3">App Configuration</Header>
          <div className="row">
            <span>Author</span>
            <Input placeholder="Author" value={appConfig.author} />
          </div>
          <div className="row">
            <span>Name</span>
            <Input placeholder="Name" value={appConfig.name} />
          </div>
          <div className="row">
            <span>Description</span>
            <Input placeholder="Description" value={appConfig.desc} />
          </div>
        </Segment>
        <Segment size="huge" raised>
          <Header as="h3">
            <code>SASjs</code> Configuration
          </Header>
          <div className="row">
            <span>Server URL</span>
            <Input placeholder="Server URL" value={sasJsConfig.serverUrl} />
          </div>
          <div className="row">
            <span>Server Port</span>
            <Input placeholder="Server Port" value={sasJsConfig.port} />
          </div>
          <div className="row">
            <span>App Location</span>
            <Input placeholder="App Location" value={sasJsConfig.appLoc} />
          </div>
          <div className="row">
            <span>SAS9 Path</span>
            <Input placeholder="SAS9 Path" value={sasJsConfig.pathSAS9} />
          </div>
          <div className="row">
            <span>SAS Viya Path</span>
            <Input
              placeholder="SAS Viya Path"
              value={sasJsConfig.pathSASViya}
            />
          </div>
          <div className="row">
            <span>Server Type</span>
            <Select
              value={sasJsConfig.serverType}
              placeholder="Server type"
              options={[
                {
                  key: "SAS9",
                  value: "SAS9",
                  text: "SAS9"
                },
                {
                  key: "SASVIYA",
                  value: "SASVIYA",
                  text: "SASVIYA"
                }
              ]}
            />
          </div>
        </Segment>
      </form>
    </div>
  );
};

export default Configuration;
