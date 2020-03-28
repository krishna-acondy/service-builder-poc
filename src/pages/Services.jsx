import React, { useContext, useState } from "react";
import {
  Header,
  Segment,
  Icon,
  Message,
  Card,
  Button,
  Confirm
} from "semantic-ui-react";
import "./Services.scss";
import { AppContext } from "../context/appContext";

const Services = () => {
  const { masterJson, setMasterJson } = useContext(AppContext);
  const folders = masterJson && masterJson.folders ? masterJson.folders : [];
  const [currentFolder, setCurrentFolder] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const deleteFolder = folder => {
    const newFolders = folders.filter(f => f.name !== folder.name);
    setMasterJson({ ...masterJson, folders: newFolders });
    setCurrentFolder(null);
  };

  return (
    <div className="services-container">
      <Header as="h1">Services</Header>
      <div className="main-content">
        <Segment raised size="huge" className="folders">
          <Header as="h3">Folders</Header>
          <Button icon>
            <Icon name="add" />
            Add folder
          </Button>
          <div className="folder-list">
            {folders.map((folder, index) => {
              return (
                <div key={index} className="folder-container">
                  <div
                    className={
                      currentFolder === folder
                        ? "folder folder-selected"
                        : "folder"
                    }
                    onClick={() => setCurrentFolder(folder)}
                  >
                    <Icon name="folder"></Icon> {folder.name}
                  </div>
                  <Icon
                    name="trash alternate outline"
                    color="red"
                    onClick={() => {
                      setShowConfirmDelete(true);
                      setCurrentFolder(folder);
                    }}
                  />
                </div>
              );
            })}
            {currentFolder && (
              <Confirm
                open={showConfirmDelete}
                header={`Delete Folder ${currentFolder.name}`}
                content="Are you sure you want to delete this folder?"
                confirmButton="Yes"
                onCancel={() => setShowConfirmDelete(false)}
                onConfirm={() => deleteFolder(currentFolder)}
              />
            )}
          </div>
        </Segment>
        <Segment raised size="large" className="services">
          <Header as="h3">Services</Header>
          {!currentFolder && (
            <Message info>
              <Message.Header>No folder selected</Message.Header>
              Please select a folder from the sidebar to display services here.
            </Message>
          )}
          {currentFolder && (
            <Card.Group>
              {currentFolder.services.map((service, index) => {
                return (
                  <Card key={index}>
                    <Card.Header>{service.name}</Card.Header>
                    <Card.Description>{service.description}</Card.Description>
                  </Card>
                );
              })}
            </Card.Group>
          )}
        </Segment>
      </div>
    </div>
  );
};

export default Services;
