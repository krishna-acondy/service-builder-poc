import React, { useState } from "react";
import { Button, Header, Message } from "semantic-ui-react";

import "./ImportExport.scss";
import FileUpload from "../components/FileUpload";

const ImportExport = () => {
  const [json, setJson] = useState(null);
  const [isError, setIsError] = useState(false);

  const importJson = () => {};
  const onFileChanged = event => {
    setIsError(false);
    let file = event.target.files[0];
    if (!file) {
      setJson(null);
      return;
    }

    let reader = new FileReader();
    reader.onload = (() => {
      return function(e) {
        let json = null;
        try {
          json = JSON.parse(e.target.result);
        } catch (e) {
          setIsError(true);
        }
        if (json) {
          setJson(json);
        }
      };
    })();
    reader.readAsText(file);
  };
  return (
    <div className="import-export-container">
      <Header as="h1">Import / Export</Header>
      {isError && (
        <Message negative>
          <Message.Header>
            Oops! There was an error parsing your JSON file.
          </Message.Header>
          <p>Please check the file and try again.</p>
        </Message>
      )}
      {!isError && json && (
        <Message positive>
          <Message.Header>Success! Your file has now been read.</Message.Header>
          <p>
            Click the 'Import JSON' button to load the configuration and
            services.
          </p>
        </Message>
      )}
      <div className="file-upload">
        <FileUpload text="Upload JSON file" onFileChange={onFileChanged} />
        {json && (
          <Button secondary onClick={importJson}>
            Import JSON
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImportExport;
