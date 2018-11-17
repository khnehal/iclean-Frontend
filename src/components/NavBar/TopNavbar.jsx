import React, { Component } from 'react';

class TopNavbar extends Component {
  render() {
    return (
      <div className="TopHeader">
        <nav className="navbar sticky-top navbar-light bg-light">
          <a className="navbar-brand" href="/homepage">
            <span className="titleFirst">t</span> <span className="titleSecond">EG</span>
          </a>

          <div className="dropdown navbar-tracking-dropdown">
            <button className="btn dropdown-toggle" type="button" data-toggle="dropdown"> Tracking <span className="caret"> </span> </button>
            <ul className="dropdown-menu">
              <li><a href="/homepage">Order Status</a></li>
              <li><a href="/homepage">Product Details</a></li>
            </ul>
          </div>

          <form className="form-inline navbar-tracking-search">
            <i className="fa fa-search"></i>
            <input className="form-control" type="search" placeholder="Search by docket no., trip no., transporter, driver name" aria-label="Search" />
          </form>

          <div className="navbar-notification">
            <i className="fa fa-bell-o"></i>
          </div>
        </nav>
      </div>
    );
  }
}

export default TopNavbar;
