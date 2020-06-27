import "./style.scss";

import React, { Component } from "react";

import * as _ from "underscore";
import { SIDE_BAR_MENU } from "../../../lib/constant";

class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (v) => {
    this.props.handleNavigate(v);
  }

  render() {
    return (
      <>
        <aside id="left-panel" className="left-panel">
          <nav className="navbar navbar-expand-sm navbar-default">
            <div id="main-menu" className="main-menu collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {_.map(SIDE_BAR_MENU, (data, idx) => (
                  <div key={idx}>
                    <li className="menu-title" key={idx}>
                      {data.title}
                    </li>
                    <li>
                      {_.map(data.menu, (menu, idx) => (
                        <a href={menu.path} key={idx} onClick={() => this.handleClick(menu.step)}>
                          <img src={menu.icon} alt="" /> {menu.title}
                        </a>
                      ))}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </nav>
        </aside>
      </>
    );
  }
}

export default SideBarComponent;
