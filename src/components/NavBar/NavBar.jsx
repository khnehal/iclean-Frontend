import React, { Component } from 'react';

import LeftNavbar from './LeftNavbar.jsx';

import './navbar.css'

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <LeftNavbar />
      </div>
    );
  }
}

export default NavBar;
