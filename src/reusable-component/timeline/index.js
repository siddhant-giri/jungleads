import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import * as _ from "underscore";
import './style.scss';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimeline: null
    };
  }

  handleTimeline = e => {
    this.setState({
      selectedTimeline: e.target.name
    });
  };

  render() {
    return (
      <div className="col-3 timeline">
        <p className="header">Campaign Timeline</p>
        <ListGroup>
          {_.map(this.props.timelines, (data, idx) => (
            <ListGroup.Item
              key={idx}
              name={idx}
              onClick={this.handleTimeline}
              className={
                this.state.selectedTimeline === idx.toString()
                  ? "lists selected"
                  : "lists"
              }
              action
              href={data.href}
            >
              {data.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default TimeLine;
