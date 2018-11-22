import React, { Component } from 'react';

import { Menu, Image, Button, Icon } from 'semantic-ui-react';

import './navbar.css'
import { clearToken } from '../../utils.js';
import { removeLocalToken } from '../../api/auth.js';


class TopStickyNavBar extends Component {

  redirectToHomepage = () => {
    window.location = `${window.location.origin}/homepage/`;
  }

  logout = async () => {
    await clearToken();
    removeLocalToken();
    window.location = `${window.location.origin}/login/`;
  }

  render() {
    const notificationsCount = 1;

    return (
      <div className="top-header">
        <Menu inverted>
          <Menu.Item className="top-bar-logo" onClick={this.redirectToHomepage}>
            <Image src={'/icleanlogo.png'} alt="iclean" size="small" centered />
          </Menu.Item>
          <Menu.Item className="top-bar-right-empty" />
          <Menu.Item className="top-bar-right-welcome">
            <Icon name="user" size="big" />
            <span>Welcome, Administrator</span>
          </Menu.Item>
          <Menu.Item className="top-bar-right-notification">
            <Icon name="bell" size="big">
              <span className="notificationsCount">
                {notificationsCount || 0}
              </span>
            </Icon>
          </Menu.Item>
          <Menu.Item className="top-bar-right-logout" onClick={this.logout}>
            <Icon name="sign-out" size="big" />
            <Button
              content="Logout"
              basic
            />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default TopStickyNavBar;
