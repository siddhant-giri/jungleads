import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./style.scss";
class RInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { infoIcon, infoMsg, error, label, handleChange, min, max } = this.props;
    return (
      <div className="input">
        {label ? <span className="label">{label}</span> : null}
        {infoIcon ? (
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id={`tooltip-right`}>
                {infoMsg}
              </Tooltip>
            }
          >
            <i
              className="biz-icon biz-icon-information-_1_ info-icon"
            />
          </OverlayTrigger>
        ) : null}
        {error ? <span className='error'>{error}</span> : null}
        <input
          name={this.props.name}
          id={this.props.id}
          className={`input-field ${this.props.class}`}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={e => handleChange(e)}
          min={min}
          max={max}
          style= {this.props.style}
        />
      </div>
    );
  }
}

export default RInputComponent;
