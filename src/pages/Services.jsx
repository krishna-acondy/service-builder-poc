import React, { useContext, useState } from "react";
import {
  Header,
  Segment,
  Icon,
  Message,
  Card,
  Popup,
  Modal,
  Button,
  Input,
  Form
} from "semantic-ui-react";
import "./Services.scss";
import { AppContext } from "../context/appContext";
import Folder from "../components/Folder";

const Services = () => {
  const { masterJson, setMasterJson } = useContext(AppContext);
  const folders = masterJson && masterJson.folders ? masterJson.folders : [];
  const [currentFolder, setCurrentFolder] = useState(null);
  const [addFolderModalOpen, setaddFolderModalOpen] = useState(false);
  const [showFolderNameError, setShowFolderNameError] = useState(false);

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
          <h3>Folders</h3>
          <Popup
            inverted
            content="Add folder"
            trigger={
              <Icon
                name="add"
                color="blue"
                onClick={() => setaddFolderModalOpen(true)}
              />
            }
          />
          <div className="folder-list">
            {folders.map((folder, index) => {
              return (
                <Folder
                  key={index}
                  folder={folder}
                  selected={currentFolder === folder}
                  onClick={() => setCurrentFolder(folder)}
                  onDelete={deleteFolder}
                />
              );
            })}
          </div>
        </Segment>
        <Segment raised size="large" className="services">
          <h3>Services</h3>
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
      <Modal open={addFolderModalOpen} size="tiny">
        <Header icon="add" content="Add New Folder" />
        <Form
          className="new-folder-form"
          onSubmit={e => {
            const newFolderName = e.target.elements.folderName.value;
            const folderExists = folders.some(f => f.name === newFolderName);
            if (!folderExists) {
              const newFolder = { name: newFolderName, services: [] };
              setMasterJson({
                ...masterJson,
                folders: [...masterJson.folders, newFolder]
              });
              setCurrentFolder(newFolder);
              setaddFolderModalOpen(false);
            } else {
              setShowFolderNameError(true);
            }
          }}
        >
          <Modal.Content>
            {showFolderNameError && (
              <Message negative>
                <Message.Header>
                  A folder with that name already exists
                </Message.Header>
                Please try again with another folder name.
              </Message>
            )}
            <h4>Enter the name for your new folder.</h4>
            <Input
              type="text"
              name="folderName"
              placeholder="Folder Name"
              maxLength="32"
              pattern="[_a-zA-Z][_a-zA-Z0-9]*"
              required
            />
            <div className="naming-conventions">
              Please make sure to follow the SAS naming convention for names:
              <ul>
                <li>Starts with a letter or an underscore.</li>
                <li>Contains only letters, numbers and underscores.</li>
                <li>Has a maximum length of 32.</li>
              </ul>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setaddFolderModalOpen(false)}>Cancel</Button>
            <Button type="submit" color="green">
              Add
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
