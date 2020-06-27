import "./style.scss";

import React, { Component } from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import RInput from "../../../reusable-component/input";
import {
  getFBPages,
  getLocations,
  getLanguages,
  getTargetingList,
  getConnectionList,
  createAdsets,
  saveAdsetAudience,
  getAudience
} from "../../../actions/campaigns/adsets-action";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RButton from "../../../reusable-component/button";
import RDropdown from "../../../reusable-component/dropdown";
import RCheckbox from "../../../reusable-component/checkbox";
import RLabel from "../../../reusable-component/labels";
import RRadiobutton from "../../../reusable-component/radiobutton";
import * as _ from "underscore";
import { ADSETS } from "../../../lib/constant";
import RTimeline from "../../../reusable-component/timeline";
import Chart from 'react-apexcharts';

let locations = null;
let languages = null;
let connectionList = null;
let userData = {
  adAccountId: "act_2711494898882012",
  userId: null,
  data: {
    optimization_goal: null,
    billing_event: "IMPRESSIONS",
    bid_amount: 2,
    start_time: null,
    end_time: null,
    name: null,
    campaign_id: "23844904324790372",
    targeting: {
      facebook_positions: [],
      device_platforms: [],
      genders: [],
      publisher_platforms: [],
      age_min: null,
      age_max: null,
      geo_locations: {
        countries: []
      },
      flexible_spec:[{
        behaviors: [],
        interests: [],
        life_events: [],
      }],
      exclusions:{},
      locales: []
    }
  }
};

let errObj = null;

class AdsetsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audienceState: null,
      adsetsType: null,
      selectedLocation: null,
      selectedLanguages: null,
      placementType: null,
      fbPage: null,
      fbPageArr: null,
      gender: null,
      minAge: null,
      maxAge: null,
      targetingValue: null,
      targetingData: [],
      excludeTargetingValue: null,
      excludeTargetingData:[],
      connections: null,
      connArr: null,
      budgetOpt: null,
      budgetCost: null,
      errors: {
        adsetName: null,
        fbPage: null,
        location: null,
        language: null,
        gender: null,
        minAge: null,
        maxAge: null,
        targeting: null,
        connections: null,
        devices: null,
        platforms: null,
        assetCust: null,
        optAdDelv: null,
        budgetOpt: null,
        budgetCost: null
      },
      series: [10],
      options: {
        chart: {
          type: 'radialBar',
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
              strokeWidth: '97%',
              margin: 10, // margin is in pixels
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#37d251'],
        grid: {
          padding: {
            top: -10
          }
        },
        labels: [],
      },
    };
    userData.userId = this.props.signIn.data.userId;
  }
  componentDidMount() {
    getFBPages({
      adAccountId: "act_2711494898882012",
      userId: userData.userId
    }).then(res => {
      this.setState({
        fbPageArr: res.data
      });
    });
    getLocations({ userId: userData.userId }).then(res => {
      let temp = [];
      locations = res.data;
      _.each(locations, (data, id) => {
        data.label = data.name;
        data.value = data.name.toLowerCase();
        temp.push(_.omit(data, "name"));
      });
      locations = temp;
    });
    getLanguages({ userId: userData.userId }).then(res => {
      let temp = [];
      languages = res.data;
      _.each(languages, (data, id) => {
        data.label = data.name;
        data.value = data.name.toLowerCase();
        temp.push(_.omit(data, "name"));
      });
      languages = temp;
    });
    getConnectionList({ userId: userData.userId }).then(res => {
      let temp = [];
      connectionList = res.data;
      _.each(connectionList, data => {
        data.label = data.name;
        data.value = data.name.toLowerCase();
        temp.push(data);
      });
      this.setState({ connArr: temp });
    });
  }
  handleAdsetName = e => {
    userData.data.name = e.target.value;
  };
  handleFbPageSelect = id => {
    this.setState({
      fbPage: id
    })
  };
  handleAdsetsType = value => {
    this.setState({
      adsetsType: value
    });
  };
  handlePlacementType = value => {
    this.setState({
      placementType: value
    });
  };
  handleLocationChange = option => {
    userData.data.targeting.geo_locations.countries = [];
    this.setState({ selectedLocation: option });
    // console.log(`Location selected:`, option);
    userData.data.targeting.geo_locations.countries.push(option.key);
  };
  handleLanguageChange = option => {
    userData.data.targeting.locales = [];
    // console.log(option)
    _.each(option, data => {
      userData.data.targeting.locales.push(data.key);
    });
    this.setState({ selectedLanguages: option });
    // console.log(`Language selected:`, option);
  };
  handleGenderChange = gender => {
    userData.data.targeting.genders = [];
    this.setState({ gender: gender });
    if (gender.id === 0) {
      userData.data.targeting.genders.push(1);
      userData.data.targeting.genders.push(2);
    } else {
      userData.data.targeting.genders.push(gender.value);
    }
  };
  handleMinAge = minAge => {
    this.setState({ minAge });
    userData.data.targeting.age_min = minAge;
  };
  handleMaxAge = maxAge => {
    this.setState({ maxAge });
    userData.data.targeting.age_max = maxAge;
  };
  handleTargetingSearch = (data, type) => {
    let resultPathTxt = data.path.join(" > ");
    let temp = type === 'include' ? this.state.targetingData : this.state.excludeTargetingData;
    temp.push(resultPathTxt);
    if(type === 'include') {
      this.setState({ targetingValue: data, targetingData: temp })
      if (userData.data.targeting.flexible_spec[0][data.type]) {
        userData.data.targeting.flexible_spec[0][data.type].push({ id: data.id, name: data.name });
      } else {
        userData.data.targeting.flexible_spec[0][data.type] = [];
        userData.data.targeting.flexible_spec[0][data.type].push({ id: data.id, name: data.name });
      }
    }else {
      this.setState({ excludeTargetingValue: data, excludeTargetingData: temp });
      if (userData.data.targeting.exclusions[data.type]) {
        userData.data.targeting.exclusions[data.type].push({ id: data.id, name: data.name });
      } else {
        userData.data.targeting.exclusions[data.type] = [];
        userData.data.targeting.exclusions[data.type].push({ id: data.id, name: data.name });
      }
    }
  };
  promiseOptions = inputValue => {
    return getTargetingList({
      adAccountId: "act_2711494898882012",
      userId: userData.userId,
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
    _.each(option, data => {
      userData.data.targeting[data.type] = [];
    });
    _.each(option, data => {
      userData.data.targeting[data.type].push({ id: data.id, name: data.name });
    });
    this.setState({ connections: option });
    console.log(userData.data);
  };
  handleSaveAudience = () => {
    let obj = {
      userId: userData.userId,
      adAccountId: userData.adAccountId,
      name: userData.data.name,
      campaign_id: userData.data.campaign_id,
      targeting: userData.data.targeting
    };
    if (
      userData.data.name &&
      userData.data.targeting.locales &&
      userData.data.targeting.locales &&
      userData.data.targeting.age_min &&
      userData.data.targeting.age_max &&
      userData.data.targeting.genders
    ){
      saveAdsetAudience(obj).then(res => {
        if (res.success) {
          this.setState({
            audienceState: "Saved successfully!"
          });
        }
      });
    } else {
      this.setState({
        audienceState: 'Please fill up all above fields'
      })
    }
  };
  handleDevices = data => {
    userData.data.targeting.device_platforms = [];
    // console.log(data);
    if (data.value === "all") {
      userData.data.targeting.device_platforms = ["mobile", "desktop"];
    } else {
      userData.data.targeting.device_platforms.push(data.value);
    }
  };
  platforms = data => {
    let value = data.value.replace(/\s+/g, "_").toLowerCase();
    // console.log(value);
    userData.data.targeting.publisher_platforms.push(value);
  };
  handleAssetCustomization = data => {
    let value = data.value.replace(/\s+/g, "_").toLowerCase();
    console.log(value);
    userData.data.targeting.facebook_positions.push(value);
  };
  handleOptimizations = data => {
    // console.log(data);
    userData.data.optimization_goal = data.value;
  };
  handleCost = e => {
    // console.log(e.target.value);
  };
  handleBudgetOpt = option => {
    let value = option.name.replace(/\s+/g, "_").toLowerCase();
    userData.data = _.omit(userData.data, "lifetime_budget", "daily_budget");
    // console.log(value);
    this.setState({ budgetOpt: value });
    userData.data[value] = null;
  };
  handleBudgetCost = e => {
    // console.log(e.target.value);
    userData.data[this.state.budgetOpt] = e.target.value * 100;
    this.setState({ budgetCost: e.target.value });
  };
  checkFields = (value) => {
    if(Array.isArray(value)){
      return value.length > 0 ? null : 'Field required';
    }else {
      return value !== null ? null : 'Field required';
    }
  }

  handleGraph = () => {

    getAudience({
      id: userData.userId,
      ad_account_id: userData.adAccountId,
      optimization_goal: userData.data.optimization_goal,
      targeting_spec: userData.data.targeting
    }).then(res => {
      console.log(res);
    })
  }

  errorCheck() {
    errObj = this.state.errors;
    errObj.adsetName = this.checkFields(userData.data.name);
    errObj.fbPage = this.checkFields(this.state.fbPage);
    errObj.location = this.checkFields(this.state.selectedLocation);
    errObj.language = this.checkFields(this.state.selectedLanguages);
    errObj.gender = this.checkFields(this.state.gender);
    errObj.minAge = this.checkFields(this.state.minAge);
    errObj.maxAge = this.checkFields(this.state.maxAge);
    errObj.targeting = this.checkFields(this.state.targetingValue);
    errObj.connections = this.checkFields(this.state.connections);
    errObj.devices = this.checkFields(userData.data.targeting.device_platforms);
    errObj.platforms = this.checkFields(userData.data.targeting.publisher_platforms);
    errObj.assetCust = this.checkFields(userData.data.targeting.facebook_positions);
    errObj.optAdDelv = this.checkFields(userData.data.optimization_goal);
    errObj.budgetOpt = this.checkFields(this.state.budgetOpt);
    errObj.budgetCost = this.checkFields(this.state.budgetCost);
    return errObj;
  }
  
  submit = () => {
    let props = this.props;
    userData.data.start_time = moment()
      .unix()
      .toString();
    userData.data.end_time = moment()
      .add(29, "days")
      .unix()
      .toString();
    let err = this.errorCheck();
    this.setState({
      errors: err
    });
    let result = _.every(_.values(err), function(v) {return !v;});
    if(result){
      // console.log(userData);
      props.createAdsets(userData);
    }
  };
  render() {
    const { selectedLocation, selectedLanguages, targetingData, gender, errors } = this.state;
    if(this.props.adsets && this.props.adsets.success){
      this.props.handleClick();
    }
    return (
        <div className="adsets">
          <div className="container-fluid row adset-block">
            <RTimeline timelines={ADSETS.timeline} />
            <div className="col-9 content-block">
              <h2 className="header">Create Adset</h2>
              <p className="sub-title">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when a scrambled it to make specimen book.
              </p>
              <hr className="divider" />
              <div className='row'>
                <div className='col-8'>
              <div className="adsets-type">
                <RInput
                  label="Adset name"
                  placeholder="Enter adset name"
                  infoIcon={true}
                  infoMsg="This field is mandatory"
                  handleChange={this.handleAdsetName}
                />
                <span className='error'>{errors.adsetName}</span>
                <p />
                <RDropdown
                  label='Facebook page (Choose the Facebook Page you want to promote.)'
                  dataArr={this.state.fbPageArr}
                  action={this.handleFbPageSelect}
                  error={errors.fbPage}
                />
                <p />
                <div id="audience" />
                <p>Select Adsets Type</p>
                <Row>
                  {_.map(ADSETS.ADSET_TYPE, (data, idx) => (
                    <Col lg={6} key={idx}>
                      <div
                        className={
                          this.state.adsetsType === data.type
                            ? "type adsets-active text-center"
                            : "type text-center"
                        }
                        onClick={() => this.handleAdsetsType(data.type)}
                      >
                        <i className={data.img} />
                        <p>{data.title}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              </div>
              <div className='col-4'>
                <div className="row donut">
                  <div style={{paddingLeft: '10px'}}>
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
                  <div className='col-10 d-flex justify-content-between graph-txt' style={{margin: '0 auto'}}>
                    <div className=''>Specific</div>
                    <div className=''>Broad</div>
                  </div>
                  <hr className='col-10' style={{border: '1px thin #cccccc'}} />
                  <div className='col-12 text-center'>
                    Potential Reach: 12000 People
                  </div>
                </div>
                </div>
              </div>
              <p />
              <Row>
                <Col lg={4}>
                  <RLabel
                    label="Location"
                    infoIcon={true}
                    toolTip="Select locations"
                    error={errors.location}
                  />
                  <Select
                    value={selectedLocation}
                    onChange={this.handleLocationChange}
                    options={locations}
                    className="select-dropdown"
                  />
                </Col>
                <Col lg={4}>
                  <RLabel
                    label="Language"
                    infoIcon={true}
                    toolTip="Select languages"
                    error={errors.language}
                  />
                  <Select
                    value={selectedLanguages}
                    onChange={this.handleLanguageChange}
                    options={languages}
                    isMulti={true}
                    className="select-dropdown"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={5}>
                  {/* <RDropdown
                    dataArr={ADSETS.gender}
                    label="Gender"
                    infoIcon={true}
                    styles="dropdown-style"
                    action={this.handleGenderChange}
                    error={errors.gender}
                  /> */}
                  <RDropdown 
                    newDropdown={true}
                    label='Gender'
                    infoIcon={true}
                    toolTip='Select gender'
                    async={false}
                    onChange={option => this.handleGenderChange(option)}
                    value={gender}
                    isMulti={false}
                    options={ADSETS.gender}
                    styles='dropdown-style'
                    error={errors.gender}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <RDropdown
                    arr={ADSETS.age}
                    label="Min Age"
                    infoIcon={true}
                    styles="dropdown-style"
                    action={this.handleMinAge}
                    error={errors.minAge}
                  />
                </Col>
                <Col lg={4}>
                  <RDropdown
                    dataArr={ADSETS.age}
                    label="Max Age"
                    infoIcon={true}
                    styles="dropdown-style"
                    action={this.handleMaxAge}
                    error={errors.maxAge}
                  />
                </Col>
              </Row>
              <p />
              <Row>
                <Col lg={7}>
                  <RLabel
                    label="Detailed Targeting (Include people who match)"
                    infoIcon={true}
                    toolTip="Select target details"
                    error={errors.targeting}
                  />
                  <AsyncSelect
                    onChange={(data) => this.handleTargetingSearch(data, 'include')}
                    cacheOptions
                    defaultOptions
                    loadOptions={this.promiseOptions}
                  />
                </Col>
                <Col lg={12}>
                  {targetingData
                    ? _.map(targetingData, (data, idx) => {
                        return <p key={idx}>{data}</p>;
                      })
                    : null}
                </Col>

                {/* <Col lg={7}>
                  <RLabel
                    label="Detailed Targeting (Exclude people who match)"
                    infoIcon={true}
                    toolTip="Select target details"
                    error={errors.targeting}
                  />
                  <AsyncSelect
                    onChange={(data) => this.handleTargetingSearch(data, 'exclude')}
                    cacheOptions
                    defaultOptions
                    loadOptions={this.promiseOptions}
                  />
                </Col>
                <Col lg={12}>
                  {excludeTargetingData
                    ? _.map(excludeTargetingData, (data, idx) => {
                        return <p key={idx}>{data}</p>;
                      })
                    : null}
                </Col> */}
              </Row>
              <div id="placements" />
              <span>
                <a href="#bac">Exclude People</a> or{" "}
                <a href="#bac">Narrow Further</a> (<a href="#bac">Learn more</a>{" "}
                about detailed targeting expansion.)
              </span>
              <RLabel 
                label="Connections"
                infoIcon={true}
                toolTip="Select minimum 3 connections"
                error={errors.connections}
              />
              <Row>
                <Col lg={3}>
                  <Select
                    value={this.state.connections}
                    onChange={this.handleConnection}
                    options={this.state.connArr}
                    isMulti={true}
                    className="select-dropdown"
                  />
                </Col>
              </Row>
              <div id="devicesSystems" />
              <Row>
                <Col lg={3}>
                  <RButton
                    text="SAVE THE AUDIENCE"
                    class="button"
                    click={this.handleSaveAudience}
                  />
                </Col>
              </Row>
              <p className="audience-msg">{this.state.audienceState}</p>
              <div className="adsets-type">
                <p>
                  Placements{" "}
                  <span>
                    (Show your ads to the right people in the right places.)
                  </span>
                </p>
                <Row>
                  {_.map(ADSETS.PLACEMENT_TYPE, (data, idx) => (
                    <Col lg={3} key={idx}>
                      <div
                        className={
                          this.state.placementType === data.type
                            ? "placement-types placement-active text-center"
                            : "placement-types text-center"
                        }
                        onClick={() => this.handlePlacementType(data.type)}
                      >
                        <p>{data.title}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div id="adDelivery" />
              <RDropdown
                dataArr={ADSETS.DEVICES}
                label="Devices"
                infoIcon={true}
                infoMsg="Select"
                action={this.handleDevices}
                error={errors.devices}
              />
              <br />
              <RLabel
                label="Platforms"
                infoIcon={true}
                toolTip="Select platforms"
                error={errors.platforms}
              />
              <Row className="platforms">
                {_.map(ADSETS.PLATFORMS, (data, idx) => (
                  <Col lg={6} key={idx}>
                    <RCheckbox label={data} handleCheck={this.platforms} />
                  </Col>
                ))}
              </Row>
              <span>
                Asset Customization. (15 / 15 placements that support asset
                customization)
              </span>
              <span className='error'>{errors.assetCust}</span>
              <Row className="platforms">
                {_.map(ADSETS.PLACEMENTS, (data, idx) => (
                  <Col lg={12} key={idx}>
                    <RCheckbox
                      label={data.label}
                      subLabel={data.subLabel}
                      handleCheck={this.handleAssetCustomization}
                    />
                  </Col>
                ))}
              </Row>
              <div id="schedule" />
              <p className="budget-txt">
                Budget and Schedule{" "}
                <span>
                  (Define how much you'd like to spend, and when you'd like your
                  ads to appear.)
                </span>
              </p>
              <RDropdown
                dataArr={[{ name: "Link clicks", value: "LINK_CLICKS" }]}
                label="Optimization for Ad Delivery"
                infoIcon={true}
                infoMsg="Select optimization option"
                action={this.handleOptimizations}
                error={errors.optAdDelv}
              />
              <br />
              <RInput
                label="Cost Control (optional)"
                placeholder="XXX"
                infoIcon={true}
                handleChange={this.handleCost}
              />
              &nbsp;<span>average cost per link click</span>
              <br />
              <p />
              <span>
                Facebook will aim to spend your entire budget and get the most
                link clicks using
                <br />
                the lowest cost bid strategy. If you want to set a cost control,
                enter an amount.
              </span>
              <Row>
                <Col lg={5}>
                  <RDropdown
                    label="Budget and Schedule"
                    infoIcon={true}
                    toolTip="Select Budget and Schedule"
                    dataArr={[
                      { name: "Daily budget" },
                      { name: "LifeTime Budget" }
                    ]}
                    styles="dropdown-style"
                    action={this.handleBudgetOpt}
                    error={errors.budgetCost}
                  />
                </Col>
                <Col lg={4}>
                  <RInput
                    placeholder="XXX"
                    class="dropdown-style inp"
                    handleChange={this.handleBudgetCost}
                  />
                </Col>
                <Col lg={12}>
                  <span className="txt-2">
                    Actual amount spent daily may vary. - (Your ads will run for
                    29 days. You'll spend no more than ₹23,200.00.)
                  </span>
                </Col>
                <Col lg={12}>
                  <RRadiobutton
                    formData={[
                      {
                        labelName: "Run my ad set continuously starting today",
                        type: "radio"
                      },
                      { labelName: "Set a start and end date", type: "radio" }
                    ]}
                  />
                </Col>
                <Col lg={12}>
                  <RLabel
                    label="Payments"
                    infoIcon={true}
                    toolTip="view the payments"
                  />
                </Col>
                <Col lg={12}>
                  <span>Total Amount: {this.state.budgetCost} INR</span>
                </Col>
                <Col lg={6}>
                  <RButton text="BACK" class="button back" />
                </Col>
                <Col lg={6}>
                  <RButton
                    text="CONTINUE"
                    class="button continue"
                    click={this.submit}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  let data = { signIn: state.signIn, error: state.error, adsets: state.campaigns };
  if(state.campaigns && state.campaigns.adsetsData){
    data.adsets = state.campaigns.adsetsData;
  }
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { createAdsets };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdsetsComponent));
