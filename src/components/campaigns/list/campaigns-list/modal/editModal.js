import React, { Component } from "react";
import { Modal, Row, Col, Accordion, Card } from "react-bootstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import * as _ from "underscore";

import RLabel from "../../../../../reusable-component/labels";
import RButton from '../../../../../reusable-component/button';
import RDropdown from "../../../../../reusable-component/dropdown";
import RCheckbox from "../../../../../reusable-component/checkbox";
import RRadiobutton from '../../../../../reusable-component/radiobutton';
import RInput from '../../../../../reusable-component/input';
import { ADSETS } from "../../../../../lib/constant";
import Chart from "react-apexcharts";

import {
  getLocations,
  getLanguages,
  getTargetingList,
  getConnectionList
} from "../../../../../actions/campaigns/adsets-action";

class EdtiModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: null,
      selectedGender: null,
      location: [],
      selectedLanguages: null,
      languages: [],
      detailTargeting: {},
      targetingData: [],
      targetingValue: null,
      connections: null,
      connArr: null,
      series: [10],
      options: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#d8deef",
              strokeWidth: "97%",
              margin: 10 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        colors: ["#37d251"],
        grid: {
          padding: {
            top: -10
          }
        },
        labels: []
      },
      radioState: 'existing-ad',
      selectedAccordian: 'set-audience-accordion',
    };
  }

  componentDidMount() {
    const { userObj } = this.props;
    getLocations({ userId: userObj.userId }).then(res => {
      let temp = [];
      // locations = res.data;
      _.each(res.data, (data, id) => {
        data.label = data.name;
        data.value = data.name.toLowerCase();
        temp.push(_.omit(data, "name"));
      });
      this.setState({ locations: temp });
    });
    getLanguages({ userId: userObj.userId }).then(res => {
      let temp = [];
      // languages = res.data;
      _.each(res.data, (data, id) => {
        data.label = data.name;
        data.value = data.name.toLowerCase();
        temp.push(_.omit(data, "name"));
      });
      this.setState({ languages: temp });
    });
    getConnectionList({ userId: userObj.userId }).then(res => {
      let temp = [];
      // connectionList = res.data;
      _.each(res.data, data => {
        data.label = data.name;
        data.value = data.name.toLowerCase();
        temp.push(data);
      });
      this.setState({ connArr: temp });
    });
  }

  handleDropdownChange = (option, type) => {
    switch (type) {
      case "location":
        this.setState({ selectedLocation: option });
        break;
      case "language":
        this.setState({ selectedLanguages: option });
        break;
      case "gender":
        this.setState({ selectedGender: option });
        break;
      default:
        break;
    }
  };

  handleChange = option => {
    console.log(option);
  };

  handleTargetingSearch = data => {
    let userData = this.state.detailTargeting;
    let resultPathTxt = data.path.join(" > ");
    let temp = this.state.targetingData;
    temp.push(resultPathTxt);
    this.setState({ targetingValue: data, targetingData: temp });
    if (userData[data.type]) {
      userData[data.type].push({ id: data.id, name: data.name });
    } else {
      userData[data.type] = [];
      userData[data.type].push({ id: data.id, name: data.name });
    }

    this.setState({ detailTargeting: userData });
  };

  promiseOptions = inputValue => {
    const { userObj } = this.props;
    return getTargetingList({
      adAccountId: userObj.adAccountId,
      userId: userObj.userId,
      keyword: inputValue
    }).then(res => {
      _.each(res.data, value => {
        value.label = value.name;
        value.value = value.name.toLowerCase();
      });
      return res.data;
    });
  };

  handleConnection = option => {
    let userData = this.state.detailTargeting;
    _.each(option, data => {
      userData[data.type] = [];
    });
    _.each(option, data => {
      userData[data.type].push({ id: data.id, name: data.name });
    });
    this.setState({ connections: option });
    console.log(userData);
  };

  handleCheck = data => {
    console.log(data);
  };

  handleRadioBtn = (e) => {
    this.setState({radioState: e.target.value});
  }

  delete = (value) => {
    console.log(value);
  }

  edit = (value) => {
    console.log(value);
  }

  toggleAccordian = (type) => {
    if(type !== this.state.selectedAccordian){
      this.setState({selectedAccordian: type})
    }else{
      this.setState({selectedAccordian: null});
    }
  }

  deleteSelectedTargetingData = (value) => {
    this.setState({targetingData: _.without(this.state.targetingData, value)});
  }

  render() {
    const {
      selectedLocation,
      locations,
      selectedLanguages,
      selectedGender,
      languages,
      targetingData,
      connections,
      radioState,
      selectedAccordian,
    } = this.state;
    const { show, toggleEditModal, selectedListData } = this.props;
    const radioFormData = [
        {
          type: "radio",
          name: "radio",
          value: "existing-ad",
          selected: true,
          class: "input",
          id: "existing-ad",
          labelName: "Use existing AD",
          align: "col-4",
          sublabel: '(Post ID will be same)',
          handleChange: this.handleRadioBtn
        },
        {
          type: "radio",
          name: "radio",
          value: "new-ad",
          class: "input",
          id: "new-ad",
          labelName: "Create New AD",
          align: "col-4",
          sublabel: '(Post ID will be generated)',
          handleChange: this.handleRadioBtn
        },
        {
            type: "radio",
            name: "radio",
            value: "enter-post-id",
            class: "input",
            id: "enter-post-id",
            labelName: "or enter Post ID",
            align: "col-4",
            handleChange: this.handleRadioBtn
        },
    ];
    const name = selectedListData ? selectedListData.col1.campaignName : null;

    return (
      <Modal
        show={show}
        onHide={() => toggleEditModal()}
        dialogClassName="edit-modal"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" className='edit-modal-header'>
            <div className='row'>
              <Col lg={9} className='header-title-txt'>{ name }</Col>
              <Col lg={3} className='header-buttons'>
                <RButton
                  icon='biz-icon biz-icon-trash delete-icn'
                  icnPosition='right'
                  class='button delete'
                  text='Delete'
                  click={() => this.delete(selectedListData)}
                />
                <RButton
                  class='button edit'
                  text='Edit'
                  click={() => this.edit(selectedListData)}
                />
              </Col>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="set-audience-accordion">
            <Card className="accordion-body">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="set-audience-accordion"
                className="accordion-header"
                onClick={() => this.toggleAccordian("set-audience-accordion")}
              >
                Set Audience <span className={`material-icons down-arrow ${selectedAccordian === "set-audience-accordion" && 'close-acc'}`}>expand_more</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="set-audience-accordion">
                <Card.Body>
                  <Row>
                    <Col lg={10}>
                      <Row>
                        <Col lg={6}>
                        <RDropdown 
                          newDropdown={true}
                          label='Language'
                          infoIcon={true}
                          toolTip='Select languages'
                          // error='Nothing testing'
                          async={false}
                          onChange={option => this.handleDropdownChange(option, 'language')}
                          value={selectedLanguages}
                          isMulti={true}
                          options={languages}
                          styles='dropdown-style'
                        />
                        </Col>
                        <Col lg={6}>
                          <Row>
                            <Col lg={6}>
                            <RDropdown 
                              newDropdown={true}
                              label='Location'
                              infoIcon={true}
                              toolTip='Select location'
                              // error='Nothing testing'
                              async={false}
                              onChange={option => this.handleDropdownChange(option, 'location')}
                              value={selectedLocation}
                              isMulti={false}
                              options={locations}
                              styles='dropdown-style'
                            />
                            </Col>
                            <Col lg={6}>
                              <RDropdown 
                                newDropdown={true}
                                label='Gender'
                                infoIcon={true}
                                toolTip='Select gender'
                                // error='Nothing testing'
                                async={false}
                                onChange={option => this.handleDropdownChange(option, 'gender')}
                                value={selectedGender}
                                isMulti={false}
                                options={ADSETS.gender}
                                styles='dropdown-style'
                              />
                            </Col>
                            <Col lg={12} style={{ height: 20 }} />
                            <Col lg={6}>
                              <RDropdown
                                dataArr={ADSETS.age}
                                label="Min Age"
                                infoIcon={true}
                                styles="dropdown-style"
                                action={this.handleChange}
                                // error={errors.maxAge}
                              />
                            </Col>
                            <Col lg={6}>
                              <RDropdown
                                dataArr={ADSETS.age}
                                label="Max Age"
                                infoIcon={true}
                                styles="dropdown-style"
                                action={this.handleChange}
                                // error={errors.maxAge}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6} className='detailed-targeting-section'>
                          <RLabel
                            label="Detailed Targeting (Include people who match)"
                            infoIcon={true}
                            toolTip="Select target details"
                            // error={errors.targeting}
                          />
                          <AsyncSelect
                            onChange={this.handleTargetingSearch}
                            cacheOptions
                            defaultOptions
                            loadOptions={this.promiseOptions}
                          />
                          {targetingData
                            ? _.map(targetingData, (data, idx) => {
                                return <p key={idx} style={{marginTop: '10px'}}>{data} <i onClick={() => this.deleteSelectedTargetingData(data)} className='biz-icon biz-icon-remove cross-icn' /> <i className='biz-icon biz-icon-pencil edit-icn' /> </p>;
                              })
                            : null}
                        </Col>
                        <Col lg={6}>
                          <div className='targeting-expansion-txt'>
                            <a href="#bac">Exclude People</a> or{" "}
                            <a href="#bac">Narrow Further</a> ( 
                            <a href="#bac"> Learn more</a> about detailed
                            targeting expansion.)
                          </div>
                          <RLabel
                            label="Connections"
                            infoIcon={true}
                            toolTip="Select minimum 3 connections"
                            // error={errors.connections}
                          />
                          <Select
                            value={connections}
                            onChange={this.handleConnection}
                            options={this.state.connArr}
                            isMulti={true}
                            className="select-dropdown"
                          />
                        </Col>
                        <Col lg={12}>
                          <RCheckbox
                            id="expand-intrest"
                            label="Expand Intrest"
                            handleCheck={this.handleCheck}
                            classname="expand-interest"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={2}>
                      <div className="row donut">
                        <div style={{ paddingLeft: "17px", paddingTop: '10px' }}>
                          <RLabel
                            label="Audience Size"
                            infoIcon={true}
                            toolTip="Info about audience size"
                          />
                        </div>
                        <Chart
                          options={this.state.options}
                          series={this.state.series}
                          type="radialBar"
                          width="280"
                        />
                        <div
                          className="col-12 d-flex justify-content-between graph-txt"
                          style={{ margin: "0 auto" }}
                        >
                          <div className="">Specific</div>
                          <div className="">Broad</div>
                        </div>
                        <hr
                          className="col-10"
                          style={{ border: "1px thin #cccccc" }}
                        />
                        <div className="col-12 text-center">
                          Potential Reach: 12000 People
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-body">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="device-and-placement-accordion"
                className="accordion-header"
                onClick={() => this.toggleAccordian("device-and-placement-accordion")}
              >
                Device {"&"} Placements <span className={`material-icons down-arrow ${selectedAccordian === "device-and-placement-accordion" && 'close-acc'}`}>expand_more</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="device-and-placement-accordion">
                <Card.Body>
                  <Row>
                    <Col lg={10}>
                      <Row>
                        <Col lg={12}>
                          <RDropdown
                            dataArr={ADSETS.DEVICES}
                            label="Devices"
                            infoIcon={true}
                            infoMsg="Select device"
                            action={this.handleChange}
                            styles="devices"
                            // error={errors.devices}
                          />
                        </Col>
                        <Col lg={12}>
                          <RLabel
                            label="Platforms"
                            infoIcon={true}
                            toolTip="Select platforms"
                            // error={errors.platforms}
                          />
                          <Row className="platforms">
                            {_.map(ADSETS.PLATFORMS, (data, idx) => (
                              <Col lg={3} key={idx}>
                                <RCheckbox
                                  id={data.label}
                                  label={data}
                                  handleCheck={this.handleChange}
                                />
                              </Col>
                            ))}
                          </Row>
                          <span className='asset-customization-txt'>
                            Asset Customization. (15 / 15 placements that
                            support asset customization)
                          </span>
                        </Col>
                        <Col lg={12} style={{marginTop: '16px'}}>
                        <RLabel
                            label="Placements"
                            infoIcon={true}
                            toolTip="Select placements"
                            // error={errors.platforms}
                          />
                          <Row className="platforms">
                            {_.map(ADSETS.PLACEMENTS, (data, idx) => (
                              <Col lg={6} key={idx}>
                                <RCheckbox
                                  id={data.label}
                                  label={data.label}
                                  subLabel={data.subLabel}
                                  handleCheck={this.handleChange}
                                />
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={2}></Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Modal.Footer>
              <Row className='footer-body'>
                <RRadiobutton formData={radioFormData} />
                <Col lg={10}/>
                {radioState === 'enter-post-id' ? 
                    <Col lg={2}>
                        <RInput
                            label='Enter post id'
                            type='text'
                            handleChange={this.handleChange}
                            class='post-id-input'
                        />
                    </Col>: null
                }
              </Row>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EdtiModalComponent;
