import "./style.scss";
import React, { Component } from "react";
import {
  Row,
  Col
} from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import AsyncSelect from "react-select/async";

import SideBarComponent from "../navigation/side-nav";
import RCards from "../../reusable-component/cards";
import RLabel from '../../reusable-component/labels';

import * as _ from "underscore";

import { getTargetingList } from '../../actions/campaigns/adsets-action';


class AudienceFinderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetingValue: [],
      targetingData: []
    }
  }

  handleChecks = (e, data) => {
    let targetingValue = this.state.targetingValue;
    if(e.currentTarget.checked){
      targetingValue.push(data);
      this.handleTargetingSearch(data);
      // this.setState({targetingValue});
    }
  };

  handleTargetingSearch = data => {
    this.setState({ targetingValue: data });
  };

  promiseOptions = inputValue => {
    const { signIn } = this.props;
    return getTargetingList({
      adAccountId: 'act_2711494898882012',
      userId: signIn.userId,
      keyword: inputValue
    }).then(res => {
      _.each(res.data, value => {
        value.label = value.name;
        value.value = value.name.toLowerCase();
      });
      this.setState({targetingData: res.data});
      return res.data;
    });
  };

  render() {
    const { targetingData, targetingValue } = this.state;
    console.log(targetingValue);
    return (
      <div>
        <SideBarComponent />
        <div className="audience">
          <div id="page"></div>
          <div className="container-fluid row audience-block">
            <div className="col-12 content-block">
              <h2 className="header-audience">Audience Finder</h2>
              <AsyncSelect
                onChange={this.handleTargetingSearch}
                cacheOptions
                defaultOptions
                loadOptions={this.promiseOptions}
                menuIsOpen={false}
                isMulti
                value={targetingValue}
              />
              <hr className="divider"></hr>
              <Row>
                {_.map(targetingData, (data, idx) => (
                  <Col md={4} sm={12} key={idx}>
                    <RCards
                      cardData={data}
                      label={data.label}
                      // subLabel="Hospitals, Doctors, Patients, Medicals, Staff, Godsons, Drugs, Pharmacists,..."
                      handleCheck={this.handleChecks}
                      peoplenumber = {data.audience_size}
                      // readyStatus = "Ready"
                      classname ="ready-status-1"
                    />
                  </Col>
                ))}
              </Row>

              {/* <Row>
                <Col md={4} sm={12}>
                <RCards
                      label="Patients & Doctors"
                      subLabel="Hospitals, Doctors, Patients, Medicals, Staff, Godsons, Drugs, Pharmacists,..."
                      handleCheck={this.handleChecks}
                      peoplenumber = "1,26,113"
                      readyStatus = "Ready"
                      classname ="ready-status-1"
                    />
                </Col>

                <Col md={4} sm={12}>
                <RCards
                      label="Management Freek"
                      subLabel="Hospitals, Doctors, Patients, Medicals, Staff, Godsons, Drugs, Pharmacists,..."
                      handleCheck={this.handleChecks}
                      peoplenumber = "1,26,113"
                      readyStatus = "Ready"
                      classname ="ready-status-1"
                    />
                </Col>

                <Col md={4} sm={12}>
                <RCards
                      label="Secular Parties"
                      subLabel="Hospitals, Doctors, Patients, Medicals, Staff, Godsons, Drugs, Pharmacists,..."
                      handleCheck={this.handleChecks}
                      peoplenumber = "1,26,113"
                      readyStatus = "Ready"
                      classname ="ready-status-1"
                    />
                </Col>
              </Row>
  */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({signIn}) => ({
  signIn: signIn.data,
});

const mapDispatchToProps = (dispatch) => {
  const actions = {  };
  return bindActionCreators(actions, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudienceFinderComponent);
