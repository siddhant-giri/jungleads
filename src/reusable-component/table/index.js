import React, { Component } from "react";
import { Table, Row, Col } from "react-bootstrap";
import RCheckbox from "../checkbox";
import Switch from "react-switch";
import * as _ from "underscore";
import isObject from "isobject";
import "./style.scss";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.setState(this.props.states)
  }
  handleChange = (checked, e, id) => {
    console.log(id)
    this.setState({ [id]: checked });
  };
  handleChecks = (e, data) => {
    if(this.props.checkbox.render){
      this.props.checkbox.method({checkbox: e, data});
    }
  }
  render() {
    const { tableHead, lists, checkbox } = this.props;
    return (
      <Table className="reusable-table" bordered>
        <thead>
          <tr>
            {checkbox.render ? <th className="first-col">
              <RCheckbox id='all' handleCheck={this.handleChecks} />
            </th> : null}
            {_.map(tableHead, (head, idx) => (
              <th key={idx}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_.map(lists, (data, idx) => (
            <tr key={idx}>
              <td className={`first-col ${idx % 2 === 1 ? 'stripped' : null}`}>
                <RCheckbox  id={checkbox.id+'list'+idx} handleCheck={(e) => this.handleChecks(e, data)}/>
              </td>
              {_.map(data, (value, ids) =>
                isObject(value)? (
                  <td key={ids} className={idx % 2 === 1 ? 'stripped' : ''}>
                    <Row>
                      {/* {console.log(typeof ids)} */}
                      <Col lg={12} className="row-one campaign-name">
                        {value.campaignName}
                      </Col>
                      <Col lg={6} className="row-two">
                        <span>Delivery: </span>{value.delivery}
                      </Col>
                      <Col lg={4}>
                        <Switch
                          id={`${value.campaignName}${idx}`}
                          onChange={this.handleChange}
                          checked={this.state[`${value.campaignName}${idx}`] || false}
                          offColor="#9ebed9"
                          onColor="#2699fb"
                          width={50}
                          height={18}
                          uncheckedIcon={<div className="switch-off">OFF</div>}
                          checkedIcon={<div className="switch-on">ON</div>}
                        />
                      </Col>
                      <Col className="col-lg-12 row-three">
                        <span>
                          <i className="biz-icon biz-1x biz-icon-analytics_3x"></i>
                        </span>
                        <span className="view-chart">View chart</span>
                        <span>
                          <i className="biz-icon biz-2x biz-icon-pencil_2x"></i>
                          Edit
                        </span>
                        <span>
                          <i className="biz-icon biz-1x biz-icon-duplicated_3x"></i>
                          Duplicate
                        </span>
                      </Col>
                    </Row>
                  </td>
                ) : (
                  <td key={ids} className={`row-one ${idx % 2 === 1 ? 'stripped' : null}`}>{Array.isArray(value) ? <span>{value[0]}<br/>{value[1]}</span> : value}</td>
                )
              )}
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Table>
    );
  }
}

export default TableComponent;
