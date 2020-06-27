import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './style.scss';
class RLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { infoIcon, toolTip, label, styles, error } = this.props;
    return (
      <div className='reusable-label'>
        <span className="label" style={styles}>{label}</span>
        {infoIcon ? (
          <OverlayTrigger
            placement={"right"}
            overlay={<Tooltip id={`tooltip-right`}>{toolTip}</Tooltip>}
          >
            <i className="info-icon biz-icon biz-icon-information-_1_"></i>

          </OverlayTrigger>
        ) : null}
        <span className='error'>{error}</span>
        <br />
      </div>
    );
  }
}

export default RLabel;
