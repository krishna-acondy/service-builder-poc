import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import "./SidebarItem.scss";

const SidebarItem = ({ icon, link, text }) => {
  return (
    <Link to={link}>
      <Menu.Item as="span" className="sidebar-item">
        <Icon name={icon} />
        {text}
      </Menu.Item>
    </Link>
  );
};

export default React.memo(SidebarItem);
