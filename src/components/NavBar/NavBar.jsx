import React, { Component } from 'react';

import LeftNavbar from './LeftNavbar.jsx';
// import TopNavbar from './TopNavbar.jsx';

import './navbar.css'

class NavBar extends Component {

    render() {
        return (
            <div className="container">
                <LeftNavbar />
                {/*<TopNavbar />*/}
            </div>
        );
    }

}

export default NavBar;
