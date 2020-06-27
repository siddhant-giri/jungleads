import React, { Component } from 'react';
import {
  Row,
  Col
} from "react-bootstrap";
import "./style.scss";
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import * as _ from "underscore";

class RCards extends Component {
  constructor(props) {
      super(props);
      this.id = _.uniqueId("prefix-");
      this.state = { 
        checked: false
      }
  }
  handleCheck(e, cardData){
    
    this.setState({
      checked: !e.target.checked
  });
 
    this.props.handleCheck(e, cardData);
    // this.props.handleCheck({value, checked: e.target.checked})
}
  render() {
    const { label, subLabel, classname, peoplenumber, readyStatus, cardData} = this.props;
    const id = this.id;
    return (
      <div className="reusable-cards">
        <Row>
          <Col>
          <div className={`checkbox custom-control custom-checkbox`}>
            
              <input  
                id={id}
                type="checkbox"
                className="custom-control-input"
                // onChange={(e) => this.handleCheck(id || label, e)}
                onChange={(e) => this.handleCheck(e, cardData)}
                defaultChecked={this.state.checked}
              />
              
              <label
                htmlFor={id}
                className="custom-control-label account-label"
              >
                <span className="main-label">{label}</span>
                <br />
                <span className="sub-label">{subLabel}</span>
                </label>
             
            </div>
              </Col>
        </Row>
        <Row>
          <Col md={8}>
          <span className="people-icon">
           <i className="fa fa-users"></i>{` ` + peoplenumber}</span>
          </Col>
          <Col md={4}>
          <ul>
           <li type="disc" className={classname}>{readyStatus}</li>
           </ul>
          </Col>
        </Row>
        
      </div>

    );
  }
}

export default RCards