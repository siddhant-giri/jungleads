import "./style.scss";
import React, { Component } from "react";
import RButton from "../../../reusable-component/button";
import RRangeSlider from "../../../reusable-component/rangeslider";
import RInput from "../../../reusable-component/input"
import { calcKPIAndOutcome } from "../../../lib/calculation";
import { Bar } from 'react-chartjs-2';
import {
  Row,
  Col,
  Collapse,
  Spinner,
  Dropdown,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Chart from 'react-apexcharts';
import RLabel from "../../../reusable-component/labels";
import { kpiChartOptions, kpiChartData, outcomeChartOptions, outcomeChartData, series, options } from "./analysis-charts.js";
import SideBarComponent from "../../navigation/side-nav";
import Modal from 'react-bootstrap/Modal'
import FunnelAnalysisComponent from "../kpi-landing/funnel-analysis"
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import LoadingOverlay from "react-loading-overlay"
import {
  getCampaigns,
  getCampaignData
} from "../../../actions/campaigns/create-campaign-action";
import * as _ from "underscore";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class KPIAnalysisComponent extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {

      cartValue: null,
      checkoutValue: null,
      purchasedValue: null,
      feesValue: null,
      profitTargetValue: null,
      avgOrderValue: null,
      cogsValue: null,

      kpiChartOptions: kpiChartOptions,
      kpiChartData: kpiChartData,
      outcomeChartOptions: outcomeChartOptions,
      outcomeChartData: outcomeChartData,
      series: series,
      options: options,

      errors: null,
      showChart: [true, false],
      open: false,
      rotate: false,
      variableMessage: `Analyse your KPI by Filling below variables`,
      showSpinner: false,
      show: false,
      campaignsList: [],
      currentCampaign: {
        id: null,
        name: 'Select Campaign'
      },
      insights: {
        purchaseInsight: null,
        initiate_checkoutInsight: null,
        add_to_cartInsight: null,
        view_contentInsight: null
      },
      roasInsight: {
        existingRoas: null
      },
      dataReceived: false
    };
  };
  componentDidMount() {
    getCampaigns({ userId: this.props.signIn.data.userId, adAccountId: 'act_2711494898882012' }).then(res => {
      let temp = [];
      _.each(res, campaign => {
        temp.push({ name: campaign.name, id: campaign.id })
      });
      this.setState({ campaignsList: temp });
    });
  }
  getInsightsData = (campaignId) => {
    getCampaignData({
      userId: this.props.signIn.data.userId,
      campaignId: campaignId,
    }).then((data) => {
      if (data[0] && data[0].cost_per_action_type) {
        let cppInsightObj = data[0].cost_per_action_type.find((insight) => insight.action_type === "purchase");
        let cpicInsightObj = data[0].cost_per_action_type.find((insight) => insight.action_type === "initiate_checkout");
        let cpatcInsightObj = data[0].cost_per_action_type.find((insight) => insight.action_type === "add_to_cart");
        let cpvcInsightObj = data[0].cost_per_action_type.find((insight) => insight.action_type === "view_content");
        let roasInsightObj = data[0].cost_per_action_type.find((insight) => insight.action_type === "purchase_roas");
        let insights = { ...this.state.insights }
        let roasInsight = { ...this.state.roasInsight }
        //TODO: remove dummy values
        if (cppInsightObj) {
          insights.purchaseInsight = cppInsightObj.value
        }
        else {
          insights.purchaseInsight = "559.63"
        }
        if (cpicInsightObj) {
          insights.initiate_checkoutInsight = cpicInsightObj.value
        }
        else {
          insights.initiate_checkoutInsight = "369.45"
        }
        if (cpatcInsightObj) {
          insights.add_to_cartInsight = cpatcInsightObj.value
        }
        else {
          insights.add_to_cartInsight = "800.962"
        }
        if (cpvcInsightObj) {
          insights.view_contentInsight = cpvcInsightObj.value
        }
        else {
          insights.view_contentInsight = "264.7945"
        }
        if (roasInsightObj) {
          roasInsight.existingRoas = roasInsightObj.value
        }
        else {
          roasInsight.existingRoas = "1.45"
        }
        this.setState({
          insights, roasInsight
        });
      }
      else {
        this.setState({
          insights: {
            purchaseInsight: null,
            initiate_checkoutInsight: null,
            add_to_cartInsight: null,
            view_contentInsight: null
          },
          roasInsight: {
            existingRoas: null
          }
        });
      }
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  calculate = () => {
    let {
      cartValue,
      checkoutValue,
      purchasedValue,
      feesValue,
      profitTargetValue,
      avgOrderValue,
      cogsValue
    } = this.state;
    this.setState({
      showSpinner: true
    });
    let arrData = calcKPIAndOutcome(avgOrderValue, feesValue, cogsValue, purchasedValue, checkoutValue, cartValue, profitTargetValue);
    let arrBreakevenKpi = arrData.arrBreakevenKpi;
    let arrProfitTargetKpi = arrData.arrProfitTargetKpi;
    let arrBeROAS = arrData.arrBeROAS;

    let err = this.errorCheck(arrBreakevenKpi[0], arrProfitTargetKpi[0], arrBeROAS[0])

    if (!err) {

      let arrPtROAS = arrData.arrPtROAS;
      let arrBaselinePURValue = arrData.arrBPUR;

      let insightsData = { ...this.state.insights }
      let arrExistingKpi = Object.keys(insightsData).map(i => insightsData[i]);

      let roasInsight = { ...this.state.roasInsight }
      let arrExistingRoas = Object.keys(roasInsight).map(i => roasInsight[i]);

      let outcomeChartData = { ...this.state.outcomeChartData }
      let outDatasetArr = outcomeChartData.datasets;

      outDatasetArr[0].data = arrBeROAS;
      outDatasetArr[1].data = arrExistingRoas;
      outDatasetArr[2].data = arrPtROAS;

      let kpiChartData = { ...this.state.kpiChartData }
      let kpidatasetArr = kpiChartData.datasets;

      kpidatasetArr[0].data = arrBreakevenKpi;
      kpidatasetArr[1].data = arrExistingKpi;
      kpidatasetArr[2].data = arrProfitTargetKpi;

      this.setState(
        {
          outcomeChartData, kpiChartData, series: arrBaselinePURValue, showChart: [false, true],
          variableMessage: `Change Variables below and reload`
        }
      );

    }
    this.setState({
      showSpinner: false
    });
  };
  errorCheck(beCpp, ptCpp, beROAS) {
    if (beCpp <= 0 || ptCpp <= 0 || beROAS < 0) {
      this.setState({
        errors: ` The output is zero or negative. Please enter correct variable values!`
      });
      this.handleShow()
      return true
    }
    else {
      return false
    }
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  toggle() {
    this.setState(prevState => ({
      open: !prevState.open,
      rotate: !prevState.rotate
    }));
  }
  selectedCampaign = (campaignId, name) => {
    this.setState({
      currentCampaign: {
        id: campaignId,
        name
      },
      dataReceived: true
    });

    this.getInsightsData(campaignId);
    setTimeout(function () {
      this.setState({ dataReceived: false })
    }.bind(this), 250)
  }
  render() {
    return (
      <div>
        <SideBarComponent />
        <div className="kpi-analysis">
          <div id="page"></div>
          <div className="container-fluid row kpi-block">
            <div className="col-12 content-block">
              <h2 className="header-analysis">KPI Analysis</h2>
              <hr className="divider"></hr>
              <LoadingOverlay
                active={this.state.showSpinner}
                spinner={<Spinner animation="border" variant="primary" />}
                classNamePrefix="loader_"
              >
                <div>
                  {this.state.showChart[0] &&
                    <div>
                      <span className="sp-title1"><b>How it Works?</b></span>
                      <FunnelAnalysisComponent></FunnelAnalysisComponent>
                    </div>
                  }
                  {this.state.showChart[1] &&
                    <div className="chart-section">
                      <span className="sp-title2"><b>Profit Target KPIs v/s Breakeven KPIs (No Profit, No Loss)</b></span>

                      <Row>
                        <Col md={5} sm={12} className='kpi-chart col'>
                          <div className="chart-title-kpi row justify-content-between">
                            <Col md={4} sm={4}><span><b>KPIs Graph</b></span></Col>
                            <Col md={6} sm={6}>
                              <ul>
                                <li type="disc" className="be-legend">Breakeven KPIs (No Profit, No Loss)</li>
                                <li type="disc" className="ex-legend">Existing KPIs</li>
                                <li type="disc" className="pt-legend">Profit Target KPIs</li>
                              </ul>
                            </Col>
                          </div>
                          <Bar
                            data={this.state.kpiChartData}
                            options={this.state.kpiChartOptions}
                          />
                        </Col>
                        <Col md={3} sm={5} className='outcome-chart'>
                          <div className="chart-title row">
                            <Col md={12} sm={12}><span><b>Outcomes</b></span></Col>
                          </div>
                          <Bar
                            data={this.state.outcomeChartData}
                            options={this.state.outcomeChartOptions}

                          />
                        </Col>
                        <Col md={3} sm={5} className='outcome-radial'>
                          <div className="row donut">
                            <div className="chart-title row">
                              <Col md={12} sm={12}>
                                <ul>
                                  <li type="disc" className="be-legend">Breakeven KPIs (No Profit, No Loss)</li>
                                  <li type="disc" className="ex-legend">Existing KPIs</li>
                                  <li type="disc" className="pt-legend">Profit Target KPIs</li>
                                </ul>
                              </Col>
                            </div>
                            <Chart
                              options={this.state.options}
                              series={this.state.series}
                              type="radialBar"
                              width="220"
                            />
                            <RLabel
                              label="Baseline PUR Conversion Rate"
                            />
                          </div>
                          <div className='text-center bpur'>
                            Calculated using 1:1 ratio of earnings to sessions
                  </div>
                        </Col>
                      </Row>
                    </div>
                  }
                </div>
              </LoadingOverlay>
              <hr className="divider"></hr>
              <div className="kpi-variables">
                <span className="sp-title2"><b>{this.state.variableMessage}</b></span>

                <Row className="align-items-center display-flex">
                  <Col md={3} sm={12} >
                    <RInput
                      id="avg-order-val"
                      label="Average Order Value"
                      type="input"
                      placeholder=""
                      infoIcon={false}
                      infoMsg="Average order value is a mandatory field"
                      handleChange={this.handleChange}
                      name="avgOrderValue"
                    />
                  </Col>

                  <Col md={3} sm={12} >
                    <RRangeSlider
                      sliderLabel="Average Fees"
                      metric="%"
                      min="0"
                      max="100"
                      defaultValue="0"
                      infoMsg="Average fees is a mandatory field"
                      onChange={this.handleChange}
                      name="feesValue"
                    />
                  </Col>
                  <Col md={3} sm={12}>
                    <RInput
                      id="avg-cogs"
                      label="Average COGS (inc. shipping)"
                      type="input"
                      placeholder=""
                      infoIcon={false}
                      infoMsg="Average COGS value is a mandatory field"
                      handleChange={this.handleChange}
                      name="cogsValue"
                    />
                  </Col>
                  <Col md={3} sm={12}>
                    <RRangeSlider
                      sliderLabel="Profit Target"
                      metric="%"
                      min="0"
                      max="100"
                      defaultValue="0"
                      infoMsg="Profit Target is a mandatory field"
                      onChange={this.handleChange}
                      name="profitTargetValue"
                    />
                  </Col>
                </Row>
                <span className="collapse-icon" >
                  <b>Advanced Variables</b> <i onClick={() => this.toggle()}
                    className={this.state.rotate ? "fa fa-chevron-circle-down rotate-down" : "fa fa-chevron-circle-down rotate"}></i></span>

                <div className="collapse-area">
                  <Collapse in={this.state.open}>
                    <Row className="align-items-center">
                      <Col md={3} sm={12}>
                        <RRangeSlider
                          sliderLabel="Add to cart"
                          metric="%"
                          min="0"
                          max="100"
                          defaultValue="0"
                          infoMsg="Add to cart is a mandatory field"
                          onChange={this.handleChange}
                          name="cartValue"
                        />

                      </Col>
                      <Col md={3} sm={12}>
                        <RRangeSlider
                          sliderLabel="Reached checkout"
                          metric="%"
                          min="0"
                          max="100"
                          defaultValue="0"
                          infoMsg="Reached checkout is a mandatory field"
                          onChange={this.handleChange}
                          name="checkoutValue"
                        />
                      </Col>
                      <Col md={3} sm={12}>
                        <RRangeSlider
                          sliderLabel="Purchased"
                          metric="%"
                          min="0"
                          max="100"
                          defaultValue="0"
                          infoMsg="Purchased is a mandatory field"
                          onChange={this.handleChange}
                          name="purchasedValue"
                        />
                      </Col>
                    </Row>
                  </Collapse>

                </div>
              </div>
              <LoadingOverlay
                active={this.state.dataReceived}
                spinner={<Spinner animation="border" variant="primary" />}
                classNamePrefix="loader_"
              >
                <div className="kpi-campaign">
                  <span className="sp-title3"><b>Select the campaign to see existing KPIs</b></span>
                  <Row>
                    <Col md={6} sm={6}>
                      <Dropdown as={ButtonGroup}>
                        <Button variant="success" className="btn-1">
                          {this.state.currentCampaign.name}
                        </Button>
                        <Dropdown.Toggle
                          split
                          variant="success"
                          id="dropdown-basic"
                          className="btn-toggle-1"
                        />
                        <Dropdown.Menu >
                          {_.map(this.state.campaignsList, (data, idx) => (
                            <Dropdown.Item
                              key={idx}
                              //href="#/action-1"
                              onClick={() =>
                                this.selectedCampaign(
                                  data.id,
                                  data.name
                                )
                              }
                            >
                              {data.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} sm={12} >
                      <RButton
                        class="button"
                        text="CALCULATE"
                        click={this.calculate}
                      />
                    </Col>
                  </Row>
                </div>
              </LoadingOverlay>
            </div>
          </div>

          <div>
            <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="custDialog" className='modal' centered>
              <Modal.Header className='header' closeButton>
                <Modal.Title className='title'>Error in input</Modal.Title>
              </Modal.Header>
              <Modal.Body className="body">{this.state.errors}</Modal.Body>
              <Modal.Footer className="footer">
                <RButton class='button' text="OK" click={() => this.handleClose()} />
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let data = { signIn: state.signIn, error: state.error, campaignsData: state.campaigns };
  if (state.campaigns && state.campaigns.campaignsData) {
    data.campaignsData = state.campaigns.campaignsData;
  }
  return data;
};

export default connect(
  mapStateToProps
)(withRouter(KPIAnalysisComponent));
