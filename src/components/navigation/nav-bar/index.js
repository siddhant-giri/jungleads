import "./style.scss";

import React, { Component } from "react";

class NavBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
       <header id="header" className="header">
          <div className="top-left">
            <div className="navbar-header">
              <a id="menuToggle" className="menutoggle" href="#abc">
                <i className="fa fa-bars"></i>
              </a>
              <a className="navbar-brand" href="index.html">
                <img src="images/jungleads_logo.png" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="top-right">
            <div className="header-menu">
              <div className="header-left">
                <div className="dropdown for-notification">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="notification"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        id="Support_Iocn"
                        d="M8 0a8 8 0 1 0 8 8 8.024 8.024 0 0 0-8-8zm0 10a2 2 0 1 1 2-2 2.006 2.006 0 0 1-2 2zm0-8a5.834 5.834 0 0 1 2.6.6L9.044 4.156a3.591 3.591 0 0 0-2.089 0L5.4 2.6A5.834 5.834 0 0 1 8 2zM2 8a5.834 5.834 0 0 1 .6-2.6l1.556 1.556a3.591 3.591 0 0 0 0 2.089L2.6 10.6A5.834 5.834 0 0 1 2 8zm6 6a5.834 5.834 0 0 1-2.6-.6l1.556-1.556a3.591 3.591 0 0 0 2.089 0L10.6 13.4A5.834 5.834 0 0 1 8 14zm5.4-3.4l-1.556-1.556a3.591 3.591 0 0 0 0-2.089L13.4 5.4a5.933 5.933 0 0 1 0 5.2z"
                        className="cls-1"
                        data-name="Support Iocn"
                      />
                    </svg>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="notification">
                    <p className="red">You have 3 Notification</p>
                  </div>
                </div>
                <div className="dropdown for-message">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="message"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15.999"
                      height="15.999"
                      viewBox="0 0 15.999 15.999"
                    >
                      <path
                        id="Chat_Icon"
                        d="M-1234.693.89A7.944 7.944 0 0 1-1236 1a7.286 7.286 0 0 1-3.8-1.021c.1 0 .2.021.305.021 4.16 0 7.624-2.652 8.353-6.139A3.788 3.788 0 0 1-1230-3.5a3.739 3.739 0 0 1-1.012 2.5h.012v4zM-1245-4.578a4.872 4.872 0 0 1-1-2.921c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5-2.91 5.5-6.5 5.5a7.454 7.454 0 0 1-2.8-.542L-1245-1z"
                        className="cls-1"
                        data-name="Chat Icon"
                        transform="translate(1246 13)"
                      />
                    </svg>
                    <span className="bg-primary"></span>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="message">
                    <p className="red">You have 4 Mails</p>
                  </div>
                </div>
                <div className="dropdown for-notification">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="notification"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell"></i>
                    <span className="count-notify"></span>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="notification">
                    <p className="red">You have 3 Notification</p>
                  </div>
                </div>
              </div>
              <div className="user-area dropdown float-right">
                <a
                  href="#abc"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="user-avatar rounded-circle"
                    src="images/admin.jpg"
                    alt="User Avatar"
                  />
                  <span>Steve Smith</span>
                </a>
                <div className="user-menu dropdown-menu">
                  <a href="#abc" className="nav-link">
                    <i className="fa fa-user"></i>My Profile
                  </a>
                  <a href="#abc" className="nav-link">
                    <i className="fa fa-cog"></i>Settings
                  </a>
                  <a href="#abc" className="nav-link">
                    <i className="fa fa-power-off"></i>Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
    );
  }
}

export default NavBarComponent;
