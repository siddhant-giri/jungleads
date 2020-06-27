import React, { Component } from "react";
import {
  Row,
  Col
} from "react-bootstrap";
import "./style.scss";

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  //handleOnChange function: sets latest value in state, moves the bubble, passes back the
  //new value to parent component
  handleOnChange = (e) => {
    this.setState({ value: e.target.value })

    const INPUT_RANGE = this.rangeid;
    const BUBBLE = this.rangeV;
    const NEW_LEFT_POSITION = INPUT_RANGE.clientWidth / INPUT_RANGE.max * INPUT_RANGE.value;
    const OFFSET = 20;
    BUBBLE.innerHTML = `<span>${INPUT_RANGE.value}</span>`;
    BUBBLE.style.left = NEW_LEFT_POSITION + OFFSET + 'px';
    this.props.onChange(e);

  }

  render() {

    return (
      <div id="outer-block">
        <Row>
          <Col md={8}><span>{this.props.sliderLabel}</span>
            {/* <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id={'tooltip-right'}>
                  {this.props.infoMsg}
                </Tooltip>
              }
            >
              <img
                className="info-icon"
                src="/assets/icons/info/information (1).png"
                alt=""
              />
            </OverlayTrigger> */}
          </Col>
          <Col md={4}><output>{this.state.value}{this.props.metric}</output></Col>
        </Row>
        <Row className="range-wrap">
          <Col md={12}>
            <div className="range-value" ref={d => { this.rangeV = d; }}>  </div>

            <input ref={i => { this.rangeid = i; }}
              type="range" defaultValue={this.props.defaultValue} min={this.props.min} max={this.props.max} className="slider"
              onChange={(e) => this.handleOnChange(e)} name={this.props.name} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default RangeSlider;