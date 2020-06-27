import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Dropdown,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import RInput from "../../../reusable-component/input";
import {
  getPaymentMethod,
  createCampaign,
  useCampaign,
  getCampaigns
} from "../../../actions/campaigns/create-campaign-action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RButton from "../../../reusable-component/button";
import * as _ from "underscore";
import { CAMPAIGNS } from '../../../lib/constant';
// import RTimeline from '../../../reusable-component/timeline';
import RDropdown from '../../../reusable-component/dropdown';
import FormComponent from '../../../reusable-component/form';

import "./style.scss";

class CreateCampaignComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedState: false,
      selectedBillingAcc: "Select dropdown menu",
      billingAccountList: ["No billing account is found"],
      optimizationCheck: false,
      selectedBudget: "Daily Budget",
      campaignType: 'new',
      campaignsList: [],
      selectedCampaign: null,
      budget: null,
      ids: {
        specialAdCategory: null,
        objective: {
          row: null,
          col: null
        },
      },
      currentAdAccount: {
        id: "",
        name: "Select ad account"
      },
      obj: {
        campaignName: null,
        marketObjective: null,
        specialAdCategory: null,
        userId: null,
        adAccountId: null
      }
    };
  }

  selectbillingAccount = value => {
    this.setState({
      selectedBillingAcc: value
    });
  };

  selectedAdAccount = (adAccountId, name, userId) => {
    this.setState({
      currentAdAccount: {
        id: adAccountId,
        name
      }
    });
    getPaymentMethod({
      userId,
      adAccountId
    }).then(res => {
      let list = this.state.billingAccountList;
      if (res && res.funding_source_details) {
        list.push(res.funding_source_details.display_string);
        this.setState({
          selectedBillingAcc: res.funding_source_details.display_string,
          billingAccountList: list
        });
      } else {
        list = ["No billing account found"];
        this.setState({
          selectedBillingAcc: "No billing account found",
          billingAccountList: list
        });
      }
    });
  };

  handleChange = e => {
    let obj = this.state.obj;
    obj[e.target.id] = e.target.value;
    this.setState({
      obj
    });
  };

  handleSpecialAdCheck = e => {
    this.setState({
      checkedState: e.target.checked
    });
  };

  handleSpecialAdCategory(idx, value) {
    console.log(idx);
    let obj = this.state.obj;
    let ids = this.state.ids;
    ids.specialAdCategory = idx;
    obj.specialAdCategory = value;
    this.setState({
      obj,
      ids
    });
  };

  handleOptimizationCheck = e => {
    this.setState({
      optimizationCheck: e.target.checked
    });
  };

  handleBudgetClick = value => {
    this.setState({
      selectedBudget: value
    });
  };

  handleCampaignType = value => {
    if(value === 'existing'){
      getCampaigns({userId: this.props.signIn.data.userId, adAccountId: 'act_2711494898882012'}).then(res => {
        this.setState({campaignsList: res});
      })
    }
    this.setState({
      campaignType: value
    });
  };

  handleSelectedCampaign = (campaign) => {
    this.setState({selectedCampaign: campaign});
  }

  handleMarketObjective(value, rowId, colId){
    let obj = this.state.obj;
    let ids = this.state.ids;
    ids.objective.row = rowId;
    ids.objective.col = colId;
    obj.marketObjective = value;
    this.setState({
      obj,
      ids
    });
  };

  handleBudgetValue = e => {
    this.setState({
      budget: e.target.value
    });
  };

  createCampaign = () => {
    let {
      currentAdAccount,
      selectedBillingAcc,
      campaignType,
      checkedState,
      obj,
      selectedBudget,
      budget
    } = this.state;
    let dataObj = this.state.obj;
    dataObj.userId = this.props.signIn.data.userId;
    dataObj.adAccountId = currentAdAccount.id;
    dataObj.campaignType = campaignType;
    dataObj.specialAdCategory = checkedState ? obj.specialAdCategory : "NONE";
    dataObj.optimizationBudget = selectedBudget
      ? { budget: budget, budgetType: selectedBudget }
      : null;
    if (
      selectedBillingAcc !== "No billing account found" &&
      !!dataObj.marketObjective &&
      !!campaignType &&
      !!dataObj.campaignName
    ) {
      console.log(dataObj);
      this.props.createCampaign(obj);
    } else {
      console.log("Nope");
    }
  };

  useExistingCampaign = () => {
    if(this.state.selectedCampaign){
      this.props.useCampaign(this.state.selectedCampaign);
    }else{
      console.log('Nope');
    }
  }

  render() {

    //TODO signIn,
    const {  campaignsData } = this.props;
    if(campaignsData && campaignsData.success){
      this.props.history.push('/adsets');
    }
    return (


<div className="" style={{background:'#f5f5fb'}}>

      <div className="campaign" style={{width:'90%',marginLeft:'55px'}}>
        
        <div id='campaignType col-10'/>
        <div className='container-fluid row camp-block' >
        {/* <RTimeline timelines={CAMPAIGNS.timeline} /> */}
        <div className="col-10 mx-auto content-block">
        
        <div className="campaign-type">
          <Row>
            <h2 style={{color:'#0080ff',marginTop:'50px',marginLeft:'-30px'}}>A</h2>
          <h2 className="header" style={{marginTop:'50px',marginLeft:'60px'}}>Select Ad Account</h2>
          <Link><i class="fa fa-chevron-down fa-2x" style={{color:'#0080ff',marginTop:'55px',marginLeft:'480px'}} aria-hidden="true"></i></Link>
          </Row>
          <br />
          <Dropdown as={ButtonGroup} style={{marginLeft:'36px'}}>
            <Button variant="success" className="btn-1">
              {this.state.currentAdAccount.name}
            </Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-basic"
              className="btn-toggle-1"
            />
            <Dropdown.Menu >
              {/* {_.map(signIn.data.adAccountList, (data, idx) => (
                <Dropdown.Item
                  key={idx}
                  href="#/action-1"
                  onClick={() =>
                    this.selectedAdAccount(
                      data.id,
                      data.name,
                      signIn.data.userId
                    )  
                  }
                >
                  {data.name}
                </Dropdown.Item>
              ))} */}
            </Dropdown.Menu>
          </Dropdown>
          <p id='selectCampaignType' />
          <Row>
          <h2 style={{color:'#0080ff',marginTop:'40px',marginLeft:'-30px'}}>B</h2>
          <h2 class="header" style={{marginTop:'40px',marginLeft:'60px'}}>Campaign Setup</h2>
          <Link><i class="fa fa-chevron-down fa-2x" style={{color:'#0080ff',marginTop:'45px',marginLeft:'510px'}} aria-hidden="true"></i></Link>
          </Row>
          <Row style={{marginLeft:'30px'}}>
            <Col >
              <div
                className={
                  this.state.campaignType === "new"
                    ? "create-campaign campaign-active text-center"
                    : "create-campaign text-center"
                }
                onClick={() => this.handleCampaignType("new")}
                style={{width:'300px',height:'100px',marginTop:'40px',borderRadius:"0px"}}
              >
                <FormComponent
                
                  formData={[
                    {
                      tag: 'radio',
                      type: 'radio',
                      
                      class: 'inp-checkbox',
                      align: 'col-2',
                    },
                  ]}
                />
                <i className="biz-icon biz-icon-folder" style={{marginLeft:'50px',marginTop:'-45px'}}></i>
                <p style={{marginLeft:'70px',marginTop:'-40px'}}>Create new campaign</p>
              </div>
            </Col>
            <Col>
              <div
                className={
                  this.state.campaignType === "existing"
                    ? "existing-campaign campaign-active text-center"
                    : "existing-campaign text-center"
                }
                onClick={() => this.handleCampaignType("existing")}
                style={{width:'300px',height:'100px',marginTop:'40px',borderRadius:"0px"}}
              >
                <FormComponent
                  formData={[
                    {
                      tag: 'radio',
                      type: 'radio',
                      
                      class: 'inp-checkbox mb-3',
                      align: 'col-2',
                    },
                  ]}
                />
                <i className="biz-icon biz-icon-folder_existing" style={{marginLeft:'50px',marginTop:'-55px'}}></i>
                <p style={{marginLeft:'70px',marginTop:'-40px'}}>Use existing campaign</p>
              </div>
            </Col>
            <Col />
            <Col />
            <Col />
          </Row>
        </div>
        <div id='specialAdCategory'/>
        <p />
        {this.state.campaignType === "new" ? (
          <>
            <RInput
              id="campaignName"
              // label="Campaign Name"
              type="input"
              placeholder="Untitled Campaign"
              handleChange={this.handleChange}
            />
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id={`tooltip-right`}>
                  Campaign name is mandatory field
                </Tooltip>
              }
            >
              <i className="biz-icon biz-icon-information-_1_ info-icon"></i>

            </OverlayTrigger>
            <br />
            <p />
            {/* <span style={{fontSize:'12px',color:'#333333'}}>Billing Account</span>
            <br />
            <div id='marketingObjective'/> */}
            <div style={{marginLeft:'380px',width:'300px',marginTop:'-100px'}}>
            <span style={{fontSize:'12px',color:'#333333'}}>Billing Account</span>
            <br />
            <div id='marketingObjective'/>
            <Dropdown as={ButtonGroup} style={{marginLeft:'0px'}}>
              <Button variant="success" className="btn-1" style={{width:'280px'}}>
                {this.state.selectedBillingAcc}
              </Button>
              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-basic"
                className="btn-toggle-1"
                
              />
              <Dropdown.Menu alignRight>
                {_.map(this.state.billingAccountList, (data, idx) => (
                  <Dropdown.Item
                    key={idx}
                    href="#/action-1"
                    onClick={() => this.selectbillingAccount(data)}
                  >
                    {data}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            </div>
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id={`tooltip-right`}>
                  Please setup your billing method to proceed further.
                </Tooltip>
              }
            >
              <i className="biz-icon biz-icon-information-_1_ info-icon"></i>

            </OverlayTrigger>
            <br />
            
            
            <p />



<Row>
<h2 style={{color:'#0080ff',marginTop:'30px',marginLeft:'-30px'}}>C</h2>
  <span style={{marginLeft:'60px'}}>
<h2 class="header" style={{marginTop:'30px'}}>Select Special Ad Category</h2>
<span>
                Check mark if the ads are related to housing,
                Employment, Credit or Business
              </span>
              </span>


<Link style={{marginTop:'45px',marginLeft:'187px',color:'black'}}><u>Need help for this?</u></Link>
<Link><i class="fa fa-chevron-down fa-2x" style={{color:'#0080ff',marginTop:'40px',marginLeft:'25px'}} aria-hidden="true"></i></Link>
</Row>
            
              
              
            <br />
            <div className="checkbox" style={{marginLeft:'-210px'}}>
              <div >
              <input
                id="specialAdCategoryCheck"
                type="checkbox"
                className="custom-control-input"
                onChange={this.handleSpecialAdCheck}
                defaultChecked={this.state.checkedState}
                

              />
              
              </div>
              <label
                htmlFor="specialAdCategoryCheck"
                className="custom-control-label account-label"
                
              >
               <label style={{marginLeft:'280px'}}>I'm creating a campaign for ads in a Special Ad Category.</label>
                
               
                <br />
                <span style={{marginLeft:'280px'}}>Ads related to credit, employment or housing.</span>
              </label>
            </div>
            {this.state.checkedState ? <Row className="ad-category">
              <p className="col-12">
                Ad category
                <i className="biz-icon biz-icon-information-_1_ info-icon"></i>
              </p>
              {_.map(CAMPAIGNS.AD_CATEGORY, (data, idx) =>
                data.col !== "col-2" ? (
                  <div
                    key={idx}
                    id={idx}
                    className={data.col}
                    onClick={() => this.handleSpecialAdCategory(idx, data.title)}
                    style={{margin:'1%'}}
                  >
                      <div className={`ad-type row ${idx === this.state.ids.specialAdCategory ? 'active' : null}`}>
                      <div className="col-2 icon-block">
                        <i className={data.img}></i>
                      </div>
                      <div className="col-10 content-block">
                        <span className="title">{data.title}</span>
                        <br />
                        <br />
                        <span className="sub-title">{data.subTitle}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={idx}>
                    <div className={data.col}></div>
                    <p className="col-12"></p>
                  </div>
                )
              )}
              <p className="col-12">
                To help you comply with our Advertising Policies, some audience
                selection options are unavailable or limited for ads in special
                categories. <a href="#abc">Click here to see details.</a>
              </p>
            </Row>:null}
            <p />











            <Row>
            <h2 style={{color:'#0080ff',marginTop:'30px',marginLeft:'-30px'}}>D</h2>
  <span style={{marginLeft:'60px'}}>
  
<h2 class="header" style={{marginTop:'30px'}}>What's your marketing objective?</h2>
<span>
                Check mark any one of the below option follows your objective
              </span>
              </span>


<Link style={{marginTop:'45px',marginLeft:'127px',color:'black'}}><u>Need help for this?</u></Link>
<Link><i class="fa fa-chevron-down fa-2x" style={{color:'#0080ff',marginTop:'40px',marginLeft:'25px'}} aria-hidden="true"></i></Link>
</Row>
           




            
            <br />
            <div style={{ margin: "0px 15px" }}>
              <Row className="objective">
                {_.map(CAMPAIGNS.OBJECTIVES, (data, id) => 
                <Col key={id} className="text-center">
                  <div className="headers">{data.title}</div>
                  {_.map(data.menu, (menu, idx) => (
                    <div
                      key={idx}
                      id={idx}
                      className={`row blocks ${this.state.ids.objective.row === idx && this.state.ids.objective.col === id ? 'active' : null}`}
                      onClick={(e) => this.handleMarketObjective(menu, idx, id)}
                    >
                      <div className="col-2">
                        <i className='biz-icon biz-icon-portfolio' />
                      </div>
                      <div className="col-10 title">{menu}</div>
                    </div>
                  ))}
                </Col>)}
              </Row>
            </div>
            <p />
            <div id='budgetOptimization'/>
            <Row>
            <h2 style={{color:'#0080ff',marginTop:'30px',marginLeft:'-30px'}}>E</h2>
  
  <span style={{marginLeft:'60px'}}>
<h2 class="header" style={{marginTop:'30px'}}>Campaign Budget Optimization</h2>
<span>
                Let us setup your budget
              </span>
              </span>


<Link style={{marginTop:'45px',marginLeft:'160px',color:'black'}}><u>Need help for this?</u></Link>
<Link><i class="fa fa-chevron-down fa-2x" style={{color:'#0080ff',marginTop:'40px',marginLeft:'25px'}} aria-hidden="true"></i></Link>
</Row>
            
            <br />
            <div className="checkbox" style={{marginLeft:'-215px'}}>
              <input
                id="optimizationCheck"
                type="checkbox"
                className="custom-control-input"
                onChange={this.handleOptimizationCheck}
                defaultChecked={this.state.optimizationCheck}
              />
              <label
                htmlFor="optimizationCheck"
                className="custom-control-label account-label"
              >
                <label style={{marginLeft:'265px'}}>Optimize Budget across ad sets</label>
                
              </label>
            </div>
            {this.state.optimizationCheck ? (
              <Row className="ad-category">
                <p className="col-6" style={{marginLeft:'-18px'}}>
                  Campaign Budget
                  <i className="biz-icon biz-icon-information-_1_ info-icon"></i>

                </p>
                <p className="col-6" style={{marginLeft:'-18px'}}>
                  Amount
                  <i className="biz-icon biz-icon-information-_1_ info-icon"></i>

                </p>
                <Dropdown as={ButtonGroup} style={{ marginLeft: "0px" }}>
                  <Button variant="success" className="btn-1">
                    {this.state.selectedBudget}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-basic"
                    className="btn-toggle-1"
                  />
                  <Dropdown.Menu alignRight>
                    {_.map(
                      ["Daily Budget", "Life time Budget"],
                      (data, idx) => (
                        <Dropdown.Item
                          key={idx}
                          href="#/action-1"
                          onClick={() => this.handleBudgetClick(data)}
                        >
                          {data}
                        </Dropdown.Item>
                      )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                &nbsp;
                <div className="budget"> 
                <RInput
                  id="budget"
                  type="input"
                  placeholder="Enter Budget"
                  handleChange={this.handleBudgetValue}
                /></div>

                <p className="col-12" />
                <p className="col-12">
                  Actual amount spent daily may vary.
                  <a href="#abc">Click here to see details.</a>
                </p>
              </Row>
            ) : null}
            <br />
            <div style={{textAlign:'center'}}>
            
      
        {/* <RButton className="continue-btn"
        click={this.useExistingCampaign}
        text="Continue"
        /> */}
        
        </div>
            {/* <div style={{ textAlign: "center" }}>
              <RButton
                className="button"
                click={this.createCampaign}
                text="Continue"
              />
            </div> */}
          </>
        ) : (
          <>
            <RDropdown 
              label="Existing Campaigns"
              dataArr={this.state.campaignsList}
              styles="dropdown-style"
              action={this.handleSelectedCampaign}
            />
            <p />
            {/* <div style={{ textAlign: "center" }}>
              <RButton
                className="button"
                click={this.useExistingCampaign}
                text="Continue"
              />
            </div> */}
            
          </>
        )}
      </div>
      </div>
      {/* </Col> */}
      </div>
      <div style={{backgroundColor:"#f5f5fb",height:'150px',width:"100%",marginTop:'50px'}}>
       <Row >
       <Col className="col-6"> </Col>
        <Link className="col-2"><button className="save-btn">SAVE DRAFT</button></Link>
        <Link className="col-2"><button className="continue-btn"><label style={{color:'white'}}>CONTINUE</label></button></Link>
        </Row>
        </div>
   </div>
   
      
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  let data = { signIn: state.signIn, error: state.error, campaignsData: state.campaigns };
  if(state.campaigns && state.campaigns.campaignsData){
    data.campaignsData = state.campaigns.campaignsData;
  }
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { createCampaign, useCampaign };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateCampaignComponent));
